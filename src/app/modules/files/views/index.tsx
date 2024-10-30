
import React from 'react'
import FileItem from '../components/FileItem'
import { files } from 'serc/app/assets/Data'

const FilesFinder = () => {
  return (
    <div className="w-full min-h-[700px] h-full  bg-gray-50 text-gray-900 mt-0 pt-0">
      <>
        {/* header table */}
        <div className="flex gap-6 bg-red-500">
          <div className="text-gray-900">
            <input type="checkbox" />
            Select all
          </div>
          <button>Sort</button>
          <button>Filter</button>
          <div>
            <input type="text" placeholder="Search" />
          </div>
        </div>
        {/* files */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
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
        </div>


      </>
    </div>
  )
}

export default FilesFinder