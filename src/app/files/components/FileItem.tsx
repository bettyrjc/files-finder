/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import React, { useState } from 'react';
import { ChevronRight, ChevronDown, Folder, FileText, Loader, Trash2Icon } from 'lucide-react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getFilesListKnowledgeBaseService } from '../services/getKnowledgeBase';
type InodePath = {
  path: string;
}

export type FileItemType = {
  knowledge_base_id: string;
  created_at: string;
  modified_at: string;
  indexed_at: string | null;
  inode_type: "file" | "directory";
  resource_id: string;
  inode_path: InodePath;
  inode_id: string;
  content_hash?: string;
  content_mime?: string;
  size?: number;
  status?: string;
  children?: FileItemType[];
}

type FileItemProps = {
  item?: FileItemType;
  level?: number;
  parentId?: string;
  onDelete: (itemId: string) => void;
}

const FileItem = ({ item, level = 0, onDelete }: FileItemProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const isDirectory = item && item.inode_type === "directory";
  const queryClient = useQueryClient();

  const { data: childrenData, isLoading } = useQuery({
    queryKey: ['knowledge_files', item?.inode_id],
    queryFn: async () => {
      if (!isDirectory) return null;
      const children = await getFilesListKnowledgeBaseService(item?.knowledge_base_id, item.inode_id);
      const existingData = queryClient.getQueryData<FileItemType[]>(['knowledge_files']) || [];
      const updatedData = existingData.map(file => {
        if (file.inode_id === item.inode_id) {
          return { ...file, children };
        }
        return file;
      });

      queryClient.setQueryData(['knowledge_files'], updatedData);
      return children;
    },
    enabled: isOpen && isDirectory, // Only fetch when directory is open
  });
  const openFile = (path: string) => {
    console.log(path);
    setIsOpen(!isOpen)

  }

  const formatDate = (dateString?: string) => {
    if (!dateString) return '-';
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    } catch (e) {
      console.error(e);
      return '-';
    }
  };

  const handleSoftDelete = () => {
    if (item?.inode_id) {
      onDelete(item.inode_id);
    }
  };

  //todo:
  // inode_id: "1" if I have files i need to open them
  // but firts I need to get the files
  // and then open them but it would be faster if I have the files
  return (
    <>
      <tr className="hover:bg-gray-50">
        <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">
          <div className="flex items-center" style={{ paddingLeft: `${level * 20}px` }}>
            {isDirectory ? (
              <button
                onClick={() => openFile(item.inode_id)}
                className="p-1 mr-2 rounded hover:bg-gray-100"
              >
                {isLoading ? (
                  <Loader className="w-4 h-4 border-blue-500 animate-spin" size={10} color="#b8b8b8" />
                ) : (
                  isOpen ? <ChevronDown size={16} color="#b8b8b8" /> : <ChevronRight size={16} color="#b8b8b8" />
                )}
              </button>
            ) : (
              <span className="w-8" />
            )}
            {isDirectory ? (
              <Folder size={16} className="mr-2 text-blue-500" />
            ) : (
              <FileText size={16} className="mr-2 text-gray-500" />
            )}
            {item?.inode_path?.path || 'Unnamed'}
          </div>
        </td>
        <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
          {formatDate(item?.modified_at)}
        </td>
        <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
          {item?.inode_type.toLocaleUpperCase()}
        </td>
        <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
          <button
            onClick={handleSoftDelete}
            className="p-1 mr-2 rounded hover:bg-gray-100"
          >
            <Trash2Icon size={16} className="text-red-400" />
          </button>
        </td>
      </tr>
      {isOpen && childrenData && childrenData.map((child: any, index: any) => (
        <FileItem
          key={`${child.inode_id}-${index}`}
          item={child}
          level={level + 1}
          parentId={item?.inode_id}
          onDelete={handleSoftDelete}
        />
      ))}
    </>
  );
};

export default FileItem;