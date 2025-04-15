'use client'

import { Button, Flex, Text } from '@radix-ui/themes'
import { DOTS, usePagination } from '@/hooks/use-pagination'
import { cn } from '@/utils'
import { PaginationSelectField } from './pagination-select-field'

interface DataTablePaginationProps {
  className?: string
  total: number // total number of items
  pageSize: number // number of items per page
  loading: boolean
  page: number
  showTotal?: boolean
  next: () => void
  prev: () => void
  jumpToPage: (page: number) => void
  onPageSizeChange?: (pageSize: number) => void
}

const DataTablePagination = ({
  className,
  total,
  loading,
  page,
  pageSize,
  showTotal = false,
  next,
  prev,
  jumpToPage,
  onPageSizeChange,
}: DataTablePaginationProps) => {
  const paginationRange = usePagination({
    currentPage: page,
    totalCount: total,
    siblingCount: 1,
    pageSize,
  })
  const pages = Math.ceil(total / pageSize)
  const hasPrev = page !== 1
  const hasNext = page < pages

  if (!total) {
    return null
  }

  return (
    <Flex
      py="1"
      px="2"
      gap="2"
      align="center"
      justify="end"
      className={cn('border-pp-gray-2 h-12 border', className)}
    >
      {onPageSizeChange && (
        <PaginationSelectField
          onPageSizeChange={onPageSizeChange}
          pageSize={pageSize}
        />
      )}
      {showTotal && <Text className="px-1 text-[14px]">TOTAL: {total}</Text>}
      <PaginationButton onClick={prev} disabled={!hasPrev || loading}>
        Previous
      </PaginationButton>
      {paginationRange?.map((pageNumber, idx) => {
        if (pageNumber === DOTS) {
          return (
            <Button
              variant="ghost"
              color="gray"
              size="1"
              className="pointer-events-none !m-0  h-6 w-6 p-0"
              key={`${pageNumber}-${idx}`}
            >
              &#8230;
            </Button>
          )
        }
        return (
          <Button
            onClick={() => jumpToPage(pageNumber as number)}
            key={`${pageNumber}-${idx}`}
            color="gray"
            size="1"
            className={cn(
              'disabled:!text-pp-gray-3 min-w-4 !m-0 h-6 !px-1 py-0 text-2',
              {
                'text-black min-w-6': page === pageNumber,
              },
            )}
            variant={page === pageNumber ? 'outline' : 'ghost'}
            disabled={loading}
          >
            {pageNumber}
          </Button>
        )
      })}
      <PaginationButton onClick={next} disabled={!hasNext || loading}>
        Next
      </PaginationButton>
    </Flex>
  )
}

const PaginationButton = (props: React.ComponentProps<typeof Button>) => (
  <Button
    size="1"
    color="gray"
    variant="outline"
    className="text-black disabled:text-pp-gray-3 !m-0 h-6 px-2 text-1"
    {...props}
  />
)

export { DataTablePagination }
