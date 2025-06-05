import React from 'react'
import { cn } from '@psychplus-v2/utils'
import { Button, Flex } from '@radix-ui/themes'
import { APPOINTMENT_HISTORY_LIMIT } from '../constants'
import { useStore } from '../store'

const AppointmentHistoryTablePagination = () => {
  const { page: currentPage, total, setPage } = useStore()

  const handlePageChange = (newPage: number) => {
    setPage(newPage)
  }

  const totalPages = Math.ceil(total / APPOINTMENT_HISTORY_LIMIT)
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1)

  return (
    <Flex align="center" justify="end" gap={'2'} className="mb-2 mt-4 w-full">
      {/* Pagination Buttons */}
      <Button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1 || total === 0}
        className="text-white h-8 w-8 rounded-2"
      >
        &lt;
      </Button>

      {/* Page Numbers */}
      {pages.map((page) => (
        <Button
          key={page}
          onClick={() => handlePageChange(page)}
          className={cn(
            'flex h-8 w-8 items-center justify-center rounded-2 border',
            page === currentPage
              ? 'bg-pp-blue text-white'
              : 'bg-white border-gray-10 text-gray-6',
          )}
        >
          {page}
        </Button>
      ))}

      {/* Next Button */}
      <Button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages || total === 0}
        className="text-white flex h-8 w-8 items-center justify-center rounded-2 border disabled:opacity-40"
      >
        &gt;
      </Button>
    </Flex>
  )
}

export default AppointmentHistoryTablePagination
