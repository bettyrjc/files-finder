
'use client'

import React, { useRef } from 'react'
import FileItem from '../components/FileItem'
import { files } from 'serc/app/assets/Data'
import SearchInput from '../../shared/inputs/SearchInput'
import Button from '../../shared/buttons/Button'
import { ArrowDownUp } from 'lucide-react'

const FilesFinder = () => {
  const searchInput = useRef<HTMLInputElement>(null)
  return (

    <div className="w-full min-h-[700px] h-full   text-gray-900 mt-0 pt-0">
      <>
        {/* header table NTH */}
        <div className="flex items-center justify-between gap-6 px-2 py-4 border border-gray-200 ">
          <div>
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
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {files.map((file, index) => (
                <FileItem key={`${file.name}-${index}`} item={file} />
              ))}
            </tbody>
          </table>
          <div className="px-2 py-4 bg-white border border-gray border-t-transparent">
            <div className='text-sm text-gray-600'>
              files: <span>{files?.length}</span>
            </div>
          </div>
        </div>
      </>
    </div>
  )
}

export default FilesFinder