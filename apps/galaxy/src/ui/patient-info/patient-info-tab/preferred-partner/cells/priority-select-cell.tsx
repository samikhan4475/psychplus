'use client'

import { Flex, Select } from '@radix-ui/themes'
import { Row } from '@tanstack/react-table'
import { PatientPreferredPartner } from '@/types'

interface PrioritySelectCellProps {
  row: Row<PatientPreferredPartner>
}
const PrioritySelectCell = ({
  row: {
    original: { priority },
  },
}: PrioritySelectCellProps) => {
  return (
    <Flex
      className="min-w-20"
      justify="center"
      width="100%"
      align="center"
      height="100%"
    >
      <Select.Root defaultValue={priority} size="1">
        <Select.Trigger className="w-full pl-1 !outline-none [box-shadow:none]" />
        <Select.Content position="popper" align="center" highContrast>
          {options?.map((opt) => (
            <Select.Item key={opt.value} value={opt.value}>
              {opt.label}
            </Select.Item>
          ))}
        </Select.Content>
      </Select.Root>
    </Flex>
  )
}

const options = [
  {
    label: 'Primary',
    value: 'primary',
  },
  {
    label: 'Secondary',
    value: 'secondary',
  },
]
export { PrioritySelectCell }
