import { Flex, Select } from '@radix-ui/themes'

const options = [
  {
    label: 'Group 1',
    value: 'Group 2',
  },
  {
    label: 'Group 3',
    value: 'Group 3',
  },
  {
    label: 'Group 4',
    value: 'Group 4',
  },
  {
    label: 'Group 5',
    value: 'Group 5',
  },
]

const GroupSelectCell = () => {
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

export { GroupSelectCell }
