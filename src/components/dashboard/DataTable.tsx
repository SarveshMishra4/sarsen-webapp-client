'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'

export interface Column<T = any> {
  key: keyof T | string
  header: string
  render?: (value: any, row: T) => React.ReactNode
  sortable?: boolean
  filterable?: boolean
  width?: string
  align?: 'left' | 'center' | 'right'
}

interface DataTableProps<T = any> {
  data: T[]
  columns: Column<T>[]
  keyField: keyof T
  isLoading?: boolean
  onRowClick?: (row: T) => void
  emptyMessage?: string
  pageSize?: number
  showPagination?: boolean
  showSearch?: boolean
  onSearch?: (term: string) => void
  onSort?: (key: string, direction: 'asc' | 'desc') => void
}

export const DataTable = <T extends Record<string, any>>({
  data,
  columns,
  keyField,
  isLoading = false,
  onRowClick,
  emptyMessage = 'No data available',
  pageSize = 10,
  showPagination = true,
  showSearch = false,
  onSearch,
  onSort
}: DataTableProps<T>) => {
  const [currentPage, setCurrentPage] = useState(1)
  const [searchTerm, setSearchTerm] = useState('')
  const [sortConfig, setSortConfig] = useState<{
    key: string
    direction: 'asc' | 'desc'
  } | null>(null)

  // Handle search
  const handleSearch = (term: string) => {
    setSearchTerm(term)
    setCurrentPage(1)
    if (onSearch) {
      onSearch(term)
    }
  }

  // Handle sort
  const handleSort = (key: string) => {
    let direction: 'asc' | 'desc' = 'asc'
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc'
    }
    setSortConfig({ key, direction })
    if (onSort) {
      onSort(key, direction)
    }
  }

  // Filter data locally if no external search provided
  const filteredData = onSearch 
    ? data 
    : data.filter(row => 
        Object.values(row).some(val => 
          String(val).toLowerCase().includes(searchTerm.toLowerCase())
        )
      )

  // Sort data locally if no external sort provided
  const sortedData = onSort
    ? filteredData
    : [...filteredData].sort((a, b) => {
        if (!sortConfig) return 0
        const aVal = a[sortConfig.key]
        const bVal = b[sortConfig.key]
        if (aVal < bVal) return sortConfig.direction === 'asc' ? -1 : 1
        if (aVal > bVal) return sortConfig.direction === 'asc' ? 1 : -1
        return 0
      })

  // Paginate
  const totalPages = Math.ceil(sortedData.length / pageSize)
  const paginatedData = sortedData.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  )

  const getAlignmentClass = (align?: 'left' | 'center' | 'right') => {
    switch (align) {
      case 'center':
        return 'text-center'
      case 'right':
        return 'text-right'
      default:
        return 'text-left'
    }
  }

  if (isLoading) {
    return (
      <div className="flex justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600" />
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {/* Search */}
      {showSearch && (
        <div className="flex justify-end">
          <div className="w-64">
            <Input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
            />
          </div>
        </div>
      )}

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {columns.map((column) => (
                <th
                  key={String(column.key)}
                  scope="col"
                  className={`
                    px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider
                    ${getAlignmentClass(column.align)}
                    ${column.sortable ? 'cursor-pointer hover:bg-gray-100' : ''}
                  `}
                  style={{ width: column.width }}
                  onClick={() => column.sortable && handleSort(String(column.key))}
                >
                  <div className="flex items-center space-x-1">
                    <span>{column.header}</span>
                    {column.sortable && sortConfig?.key === column.key && (
                      <span className="text-gray-400">
                        {sortConfig.direction === 'asc' ? '↑' : '↓'}
                      </span>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {paginatedData.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length}
                  className="px-6 py-12 text-center text-gray-500"
                >
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              paginatedData.map((row) => (
                <tr
                  key={row[keyField]}
                  onClick={() => onRowClick?.(row)}
                  className={onRowClick ? 'cursor-pointer hover:bg-gray-50' : ''}
                >
                  {columns.map((column) => (
                    <td
                      key={String(column.key)}
                      className={`
                        px-6 py-4 whitespace-nowrap text-sm text-gray-900
                        ${getAlignmentClass(column.align)}
                      `}
                    >
                      {column.render
                        ? column.render(row[column.key as keyof T], row)
                        : row[column.key as keyof T]}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {showPagination && totalPages > 1 && (
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-700">
            Showing {((currentPage - 1) * pageSize) + 1} to{' '}
            {Math.min(currentPage * pageSize, sortedData.length)} of{' '}
            {sortedData.length} results
          </div>
          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
            >
              Next
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}