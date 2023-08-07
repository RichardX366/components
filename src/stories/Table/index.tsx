import React from 'react';
import { unCamelCase } from '../Formatting';
import { AiOutlineFileSearch } from 'react-icons/ai';

export type Column = string | { title: string; key: string };
export type Row = { id?: string; [key: string]: React.ReactNode };

export interface TableProps {
  columns: Column[];
  data: Row[];
  activeRows?: number[];
  noData?: React.ReactNode;
}

export const Table: React.FC<TableProps> = ({
  columns,
  data,
  activeRows,
  noData = (
    <>
      <AiOutlineFileSearch className='w-20 h-20' />
      <p>No data found</p>
    </>
  ),
}) => {
  return (
    <div className='overflow-x-auto rounded-md shadow-md dark:shadow-white/20 ring-1 dark:ring-white/10 ring-black/10'>
      <table className='table table-lg'>
        <thead className='bg-gray-100 dark:bg-gray-800 dark:text-white text-gray-900 text-xs'>
          <tr>
            {columns.map((column) =>
              typeof column === 'string' ? (
                <th key={column}>{unCamelCase(column)}</th>
              ) : (
                <th key={column.key}>{unCamelCase(column.title)}</th>
              ),
            )}
          </tr>
        </thead>
        <tbody className='bg-white dark:bg-gray-900'>
          {data.length ? (
            data.map((row, i) => (
              <tr key={row.id || i}>
                {columns.map((column) => (
                  <th
                    className={`font-normal border-t border-t-gray-300 dark:border-t-gray-500 text-gray-600 dark:text-gray-300 ${
                      activeRows?.includes(i)
                        ? 'bg-gray-50 dark:bg-gray-800/50'
                        : ''
                    }`}
                    key={typeof column === 'string' ? column : column.key}
                  >
                    {row[typeof column === 'string' ? column : column.key]}
                  </th>
                ))}
              </tr>
            ))
          ) : (
            <tr className='h-56 relative'>
              <th className='absolute inset-0 flex flex-col items-center justify-center gap-2 bg-white dark:bg-gray-900'>
                {noData}
              </th>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};
