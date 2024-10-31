/* eslint-disable @typescript-eslint/no-explicit-any */

'use client'

import React, { useRef } from 'react'
import FileItem, { FileItemType } from '../components/FileItem'
// import { files } from 'src/assets/Data'
import SearchInput from '../../shared/inputs/SearchInput'
import Button from '../../shared/buttons/Button'
import { ArrowDownUp } from 'lucide-react'
import { useKnowledgeBasesService } from '../hooks/useKnowledgeBasesService'
// import { useFilesListKnowledgeBasesService } from '../hooks/useFilesListKnowledgeBaseService'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { getFilesListKnowledgeBaseService } from '../services/getKnowledgeBase'

const FilesFinder = () => {
  const searchInput = useRef<HTMLInputElement>(null)
  const {
    data,
    isSuccess: isKnowledgeBaseSuccess
  } = useKnowledgeBasesService()
  const knowledgeBaseInfo = data?.admin[0] || {}
  const knowledgeBaseId = knowledgeBaseInfo?.knowledge_base_id || ''

  // const { data: filesData } = useFilesListKnowledgeBasesService(knowledgeBaseInfo?.knowledge_base_id || '')
  const queryClient = useQueryClient();

  // Query principal para obtener los archivos raíz
  const { data: filesData } = useQuery({
    queryKey: ['knowledge_files', knowledgeBaseId],
    queryFn: () => getFilesListKnowledgeBaseService(knowledgeBaseId),
    enabled: Boolean(knowledgeBaseId) && isKnowledgeBaseSuccess,
  });

  
  const handleDelete = (itemId: string) => {
    // Función recursiva para encontrar y actualizar elementos
    const removeItem = (items: FileItemType[]): FileItemType[] => {
      return items.filter(item => {
        if (item.inode_id === itemId) {
          return false;
        }
        if (item.children) {
          item.children = removeItem(item.children);
        }
        return true;
      });
    };

    // Actualizar el cache para la consulta principal
    queryClient.setQueryData(
      ['knowledge_files', knowledgeBaseId],
      (oldData: FileItemType[] | undefined) => oldData ? removeItem(oldData) : []
    );
  };

  return (

    <div className="w-full min-h-[700px] h-full   text-gray-900 mt-0 pt-0">
      <>
        {/* header table NTH */}
        <div className="items-center justify-between gap-6 px-2 py-4 border border-gray-200 md:flex ">
          <div className='mb-2 md:mb-0'>
            <Button
              color='primary'
              onClick={() => console.log('filter')}
              size="small"
              variant="outlined"
              icon={<ArrowDownUp size={14} />}
            >
              Sort
            </Button>
          </div>
          <div >
            <SearchInput
              onChange={(e) => console.log(e.target.value)}
              ref={searchInput}
            />
          </div>
        </div>
        {/* files */}
        <div className="mt-2 overflow-x-auto">
          <table className="min-w-full border divide-y divide-gray-200">
            <thead className="bg-blue-100">
              <tr>
                <th className="w-1/2 px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase border-b">
                  Name
                </th>
                <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase border-b">
                  Date
                </th>
                <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase border-b">
                  Kind
                </th>
                <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase border-b">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filesData?.length > 0 && filesData.map((file: any, index: any) => (
                <FileItem key={`${file.name}-${index}`} item={file}
                  level={0}
                  parentId={file.inode_id}
                  onDelete={handleDelete}
                />
              ))}
            </tbody>
          </table>
          <div className="px-2 py-4 bg-white border border-gray border-t-transparent">
            <div className='text-sm text-gray-600'>
              files: <span>{filesData?.length}</span>
            </div>
          </div>
        </div>
      </>
    </div>
  )
}

export default FilesFinder