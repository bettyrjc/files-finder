/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import React, { useState } from 'react';
import { ChevronRight, ChevronDown, Folder, FileText } from 'lucide-react';

type FileItemProps = {
  item: {
    name: string;
    date: string;
    kind: string;
    children?: any[];
  };
  level?: number;
}
const FileItem = ({ item, level = 0 }: FileItemProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const hasChildren = item.children && item.children.length > 0;

  return (
    <>
      <tr className="hover:bg-gray-50">
        <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">
          <div className="flex items-center" style={{ paddingLeft: `${level * 20}px` }}>
            {hasChildren ? (
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-1 mr-2 rounded hover:bg-gray-200"
              >
                {isOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
              </button>
            ) : (
              <span className="w-8" />
            )}
            {hasChildren ? (
              <Folder size={16} className="mr-2 text-blue-500" />
            ) : (
              <FileText size={16} className="mr-2 text-gray-500" />
            )}
            {item.name}
          </div>
        </td>
        <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
          {item.date}
        </td>
        <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
          {item.kind}
        </td>
      </tr>
      {isOpen && hasChildren && item?.children!.map((child, index) => (
        <FileItem
          key={`${child.name}-${index}`}
          item={child}
          level={level + 1}
        />
      ))}
    </>
  );
};

export default FileItem;