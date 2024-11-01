/* eslint-disable @typescript-eslint/no-explicit-any */

'use client'

import React, { useEffect, useState } from 'react'
import FileItem, { FileItemType } from '../components/FileItem'
// import SearchInput from '../../shared/inputs/SearchInput'
import Button from '../../shared/buttons/Button'
import { ArrowDownUp, Loader } from 'lucide-react'
import { useKnowledgeBasesService } from '../hooks/useKnowledgeBasesService'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { getFilesListKnowledgeBaseService } from '../services/getKnowledgeBase'
import { useSession } from 'next-auth/react'

const FilesFinder = () => {
  const session = useSession()
  const isAuthenticated = session?.status === 'authenticated'
  // const searchInput = useRef<HTMLInputElement>(null)
  const [dataValue, setDataValue] = useState<FileItemType[]>([])
  const [direction, setDirection] = useState('desc');
  const {
    data,
    isSuccess: isKnowledgeBaseSuccess,
    isLoading: isKnowledgeBaseLoading,
  } = useKnowledgeBasesService(isAuthenticated)
  const knowledgeBaseInfo = data?.admin[0] || {}
  const knowledgeBaseId = knowledgeBaseInfo?.knowledge_base_id || ''
  const queryClient = useQueryClient();

  const { data: filesData, isLoading: isLoadingFiles } = useQuery({
    queryKey: ['knowledge_files', knowledgeBaseId],
    queryFn: () => getFilesListKnowledgeBaseService(knowledgeBaseId),
    enabled: Boolean(knowledgeBaseId) && isKnowledgeBaseSuccess, //enabled when knowledgeBaseId is available
  });

  /**
   * 
   * @param itemId 
   */
  const handleDelete = (itemId: string) => {
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

    queryClient.setQueryData(
      ['knowledge_files', knowledgeBaseId],
      (oldData: FileItemType[] | undefined) => oldData ? removeItem(oldData) : []
    );
  };
  /**
   * 
   * @param direction: String
   * @returns 
   */
  const sortDataByDate = (direction = 'desc') => {
    if (dataValue.length === 0) return;
    const data = dataValue.sort((a: FileItemType, b: FileItemType) => {
      const dateA = new Date(a.modified_at).getTime();
      const dateB = new Date(b.modified_at).getTime();
      return direction === 'desc'
        ? dateB - dateA  // Desc (B -> A)
        : dateA - dateB; // Asc (A -> B)
    });

    setDirection(direction === 'desc' ? 'asc' : 'desc');
    setDataValue([...data]);
  };
  /**
   * 
   * @param direction: String
   * @returns 
   */
  const sortDataByName = (direction = 'desc') => {
    if (dataValue.length === 0) return;
    const data = dataValue.sort((a: FileItemType, b: FileItemType) => {
      const nameA = a?.inode_path?.path.toLowerCase();
      const nameB = b?.inode_path?.path.toLowerCase();
      return direction === 'desc'
        ? nameB.localeCompare(nameA)  // Desc (B -> A)
        : nameA.localeCompare(nameB); // Asc (A -> B)
    });

    setDirection(direction === 'desc' ? 'asc' : 'desc');
    setDataValue([...data]);
  }

  useEffect(() => {
    //set dataValue to filesData for manipulate data to sort
    if (filesData?.length === 0) return
    setDataValue(filesData)
  }, [filesData])

  // TODO: Implement search functionality and show it

  return (

    <div className="w-full min-h-[700px] h-full   text-gray-900 mt-0 pt-0">
      {
        isKnowledgeBaseLoading || isLoadingFiles ? (<div className='flex flex-col items-center justify-center h-[700px]'>
          <Loader className="border-blue-500 animate-spin" size={50} color="orange" />
          <p className="text-orange-400">Loading...</p>
        </div>) : <>
          {/* header table NTH */}
          <div className="items-center justify-between gap-6 px-2 py-4 border border-gray-200 md:flex ">
            <div className='flex gap-2 mb-2 md:mb-0'>
              <Button
                color='primary'
                onClick={() => sortDataByDate(direction)}
                size="small"
                variant="outlined"
                icon={<ArrowDownUp size={14} />}
              >
                Sort by date
              </Button>
              <Button
                color='secondary'
                onClick={() => sortDataByName(direction)}
                size="small"
                variant="outlined"
                icon={<ArrowDownUp size={14} />}
              >
                Sort by name
              </Button>
            </div>
            {/* <div >
              <SearchInput
                onChange={(e) => searchByName(e.target.value)}
                ref={searchInput}
              />
            </div> */}
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
                {dataValue?.length > 0 && dataValue?.map((file: any, index: any) => (
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
                files: <span>{dataValue?.length}</span>
              </div>
            </div>
          </div>
        </>
      }
    </div>
  )
}

export default FilesFinder