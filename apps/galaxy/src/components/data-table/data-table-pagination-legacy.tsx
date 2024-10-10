'use client'

import { Button, Flex, Text } from '@radix-ui/themes'
import { cn } from '@/utils'

interface DataTablePaginationLegacyProps {
  className?: string
  total: number // total number of items
  pageSize: number // number of items per page
  loading: boolean
  page: number
  next: () => void
  prev: () => void
}

const DataTablePaginationLegacy = ({
  className,
  total,
  loading,
  page,
  pageSize,
  next,
  prev,
}: DataTablePaginationLegacyProps) => {
  if (!total) {
    return null
  }

  const pages = Math.ceil(total / pageSize)

  const hasPrev = page !== 1
  const hasNext = page < pages

  const low = (page - 1) * pageSize + 1
  const high = page * pageSize

  return (
    <Flex
      py="1"
      px="2"
      gap="2"
      align="center"
      justify="between"
      className={cn(
        'sticky bottom-0 left-0 right-0 border-t border-t-gray-5 bg-gray-3',
        className,
      )}
    >
      <Text weight="light" className="text-[11px]">
        {low} - {high} of {total}
      </Text>
      <Flex align="center" gap="2">
        <Text weight="light" className="text-[11px]">
          Page {page} of {pages}
        </Text>
        <PaginationButton onClick={prev} disabled={!hasPrev || loading}>
          Prev
        </PaginationButton>
        <PaginationButton onClick={next} disabled={!hasNext || loading}>
          Next
        </PaginationButton>
      </Flex>
    </Flex>
  )
}

const PaginationButton = (props: React.ComponentProps<typeof Button>) => (
  <Button
    size="1"
    variant="outline"
    highContrast
    className="h-[auto] min-h-[auto] px-1 py-[2px] text-[11px]"
    {...props}
  />
)

export { DataTablePaginationLegacy }
