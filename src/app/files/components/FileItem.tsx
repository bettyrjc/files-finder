/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import React, { useState } from 'react';
import { ChevronRight, ChevronDown, Folder, FileText } from 'lucide-react';
//TODO: puts files
type InodePath = {
  path: string;
}

type FileItemType = {
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
}

const FileItem = ({ item, level = 0 }: FileItemProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const isDirectory = item && item.inode_type === "directory";
  const getFileType = (item?: FileItemType) => {
    if (!item || !item.inode_type) return "Unknown";
    if (item.inode_type === "directory") return "Folder";
    if (item.content_mime) {
      const mimeType = item.content_mime.split('/').pop();
      return mimeType ? mimeType.charAt(0).toUpperCase() + mimeType.slice(1) : "File";
    }
    return "File";
  };

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

  return (
    <>
      <tr className="hover:bg-gray-50">
        <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">
          <div className="flex items-center" style={{ paddingLeft: `${level * 20}px` }}>
            {isDirectory ? (
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-1 mr-2 rounded hover:bg-gray-200"
              >
                {isOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
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
          {getFileType(item)}
        </td>
      </tr>
      {/* {isOpen && isDirectory && item?.children!.map((child, index) => (
        <FileItem
          key={`${child.name}-${index}`}
          item={child}
          level={level + 1}
        />
      ))} */}
    </>
  );
};

export default FileItem;