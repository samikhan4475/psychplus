import { Flex, Text } from '@radix-ui/themes'

interface WeekDetailProps {
  title: string
  description: string
}

const WeekDetail = ({ description, title }: WeekDetailProps) => {
  return (
    <Flex direction="row" pl="2" gap="1">
      <Text className="text-pp-black-3 text-1 font-[600]">{`${title}:`}</Text>
      <Text className="text-pp-black-3 text-1 font-[400]">{description}</Text>
    </Flex>
  )
}

export { WeekDetail }
