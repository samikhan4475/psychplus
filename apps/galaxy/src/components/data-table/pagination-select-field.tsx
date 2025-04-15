'use client'

import { Select } from '@radix-ui/themes'
import { CODESETS } from '@/constants'
import { useCodesetOptions } from '@/hooks'

interface PaginationSelectFieldProps {
  onPageSizeChange?: (pageSize: number) => void
  pageSize?: number
}
const PaginationSelectField = ({
  onPageSizeChange,
  pageSize,
}: PaginationSelectFieldProps) => {
  const options = useCodesetOptions(CODESETS.Paging)
  const sortedOptions = options?.sort(
    (a, b) => Number(a?.value) - Number(b?.value),
  )

  return (
    <Select.Root
      value={String(pageSize)}
      onValueChange={(val) => onPageSizeChange?.(Number(val))}
      size="1"
    >
      <Select.Trigger className="min-w-20" />
      <Select.Content highContrast>
        {sortedOptions.map((opt) => (
          <Select.Item key={opt.value} value={opt.value}>
            {opt.label}
          </Select.Item>
        ))}
      </Select.Content>
    </Select.Root>
  )
}

export { PaginationSelectField }
