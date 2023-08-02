import React from 'react';
import { unCamelCase } from '../Formatting';

export type Column = string | { title: string; key: string };
export type Row = { id?: string; [key: string]: React.ReactNode };

export interface TableProps {
  columns: Column[];
  data: Row[];
  activeRows?: number[];
}

export const Table: React.FC<TableProps> = ({
  columns,
  data,
  activeRows,
}: TableProps) => {
  return (
    <div className='overflow-x-auto'>
      <table className='table table-pin-rows'>
        <thead>
          <tr>
            {columns.map((column) =>
              typeof column === 'string' ? (
                <th>{unCamelCase(column)}</th>
              ) : (
                <th>{unCamelCase(column.title)}</th>
              ),
            )}
          </tr>
        </thead>
        <tbody>
          {data.map((row, i) => (
            <tr key={row.id || i}>
              {columns.map((column) => (
                <th key={typeof column === 'string' ? column : column.key}>
                  {row[typeof column === 'string' ? column : column.key]}
                </th>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
