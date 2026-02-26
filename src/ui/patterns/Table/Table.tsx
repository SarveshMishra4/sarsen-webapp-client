// src/ui/primitives/Table/Table.tsx

import React from "react";

interface Column<T> {
  key: string;
  header: string;
  render?: (row: T) => React.ReactNode;
}

interface TableProps<T> extends React.HTMLAttributes<HTMLTableElement> {
  columns: Column<T>[];
  data: T[];
  rowKey?: (row: T, index: number) => string | number;
  emptyText?: string;
}

export function Table<T>({
  columns,
  data,
  rowKey,
  emptyText = "No data found",
  className = "",
  ...rest
}: TableProps<T>) {
  return (
    <table
      {...rest}
      className={`
        w-full border-collapse border border-gray-200
        ${className}
      `}
    >
      <thead className="bg-gray-50">
        <tr>
          {columns.map((col) => (
            <th
              key={col.key}
              className="border p-2 text-left text-sm font-medium"
            >
              {col.header}
            </th>
          ))}
        </tr>
      </thead>

      <tbody>
        {data.length === 0 ? (
          <tr>
            <td
              colSpan={columns.length}
              className="p-4 text-center text-gray-500"
            >
              {emptyText}
            </td>
          </tr>
        ) : (
          data.map((row, i) => (
            <tr key={rowKey?.(row, i) ?? i}>
              {columns.map((col) => (
                <td
                  key={col.key}
                  className="border p-2 text-sm"
                >
                  {col.render
                    ? col.render(row)
                    : (row as any)[col.key]}
                </td>
              ))}
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
}