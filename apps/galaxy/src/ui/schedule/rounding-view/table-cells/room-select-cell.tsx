import { Flex, Select } from '@radix-ui/themes'

const options = [
  {
    label: 'Room 1',
    value: 'Room 1',
  },
  {
    label: 'Room 2',
    value: 'Room 2',
  },
  {
    label: 'Room 3',
    value: 'Room 3',
  },
  {
    label: 'Room 4',
    value: 'Room 4',
  },
]

const RoomSelectCell = () => {
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

export { RoomSelectCell }
