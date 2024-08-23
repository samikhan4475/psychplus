'use client'

import { Button, Flex, Text } from '@radix-ui/themes'
import { PATIENT_LOOKUP_TABLE_PAGE_SIZE } from './constants'
import { useStore } from './store'

const PatientLookupTablePagination = () => {
  const { data, loading, page, next, prev } = useStore((state) => ({
    data: state.data,
    loading: state.loading,
    page: state.page,
    next: state.next,
    prev: state.prev,
  }))

  if (!data) {
    return null
  }

  const pages = Math.ceil(data.total / PATIENT_LOOKUP_TABLE_PAGE_SIZE)

  const hasPrev = page !== 1
  const hasNext = page < pages

  const low = (page - 1) * PATIENT_LOOKUP_TABLE_PAGE_SIZE + 1
  const high = page * PATIENT_LOOKUP_TABLE_PAGE_SIZE

  return (
    <Flex
      py="1"
      px="2"
      gap="2"
      align="center"
      justify="between"
      className="sticky bottom-0 left-0 right-0 border-t border-t-gray-5 bg-gray-3"
    >
      <Text weight="light" className="text-[11px]">
        {low} - {high} of {data.total}
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

export { PatientLookupTablePagination }
