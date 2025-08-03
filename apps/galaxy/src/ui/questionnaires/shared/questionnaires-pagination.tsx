import { Button, Flex, Select, Text } from '@radix-ui/themes'

interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
  onPrevious: () => void
  onNext: () => void
  className?: string
}

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  onPrevious,
  onNext,
  className,
}: PaginationProps) => {
  const handlePageSelect = (page: string) => {
    onPageChange(parseInt(page))
  }

  return (
    <Flex justify="end" align="center" gap="3" my="4" className={className}>
      <Flex align="center" gap="2">
        <Text size="1" weight="light">
          Page No.
        </Text>
        <Select.Root
          value={currentPage.toString()}
          onValueChange={handlePageSelect}
        >
          <Select.Trigger variant="surface" className="h-[25px] w-[60px]" />
          <Select.Content align="start">
            {Array.from({ length: (totalPages+1) }, (_, i) => (
              <Select.Item
                key={i + 1}
                value={(i + 1).toString()}
                className="h-[25px] w-[60px]"
              >
                {i + 1}
              </Select.Item>
            ))}
          </Select.Content>
        </Select.Root>
      </Flex>

      <Button
        type="button"
        size="1"
        color="gray"
        variant="surface"
        onClick={onPrevious}
        disabled={currentPage === 1}
      >
        Previous
      </Button>

      {!(currentPage >= totalPages) && (
        <Button
          type="button"
          size="1"
          color="gray"
          variant="surface"
          onClick={onNext}
          disabled={currentPage === totalPages}
        >
          Next
        </Button>
      )}

      {currentPage === totalPages && (
        <Button type="button" size="1" onClick={onNext} highContrast>
          Show Result
        </Button>
      )}
    </Flex>
  )
}

export { Pagination, type PaginationProps }
