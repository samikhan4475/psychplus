import { Flex, Text } from '@radix-ui/themes'

interface ColumnHeaderProps {
  label: string
}

const ColumnHeader = ({ label }: ColumnHeaderProps) => {
  return (
    <Flex height="100%" align="center">
      <Text className="text-[11.5px] font-regular">{label}</Text>
    </Flex>
  )
}

export { ColumnHeader }
