import { Flex, Select } from '@radix-ui/themes'

const options = [
  {
    label: 'Unit 1',
    value: 'Unit 1',
  },
  {
    label: 'Unit 2',
    value: 'Unit 2',
  },
  {
    label: 'Unit 3',
    value: 'Unit 3',
  },
  {
    label: 'Unit 4',
    value: 'Unit 4',
  },
]

const UnitSelectCell = () => {
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

export { UnitSelectCell }
