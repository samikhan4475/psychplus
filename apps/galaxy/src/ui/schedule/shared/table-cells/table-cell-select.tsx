import { Flex, Select } from '@radix-ui/themes'
import { Option } from '../../types'

interface TableCellSelectProps {
    options: Option[]
}

const TableCellSelect = ({options}: TableCellSelectProps) => {
  return (
    <Flex p="1" width="100%">
      <Select.Root size="1">
        <Select.Trigger placeholder="select" className="w-full text-gray-12" />
        <Select.Content position="popper" highContrast>
          {options.map((option) => (
            <Select.Item key={option.value} value={option.value}>
              {option.label}
            </Select.Item>
          ))}
        </Select.Content>
      </Select.Root>
    </Flex>
  )
}

export { TableCellSelect }
