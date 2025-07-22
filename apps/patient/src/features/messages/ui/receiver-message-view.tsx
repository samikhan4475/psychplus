import { Flex, Text } from '@radix-ui/themes'

interface RecevierMessageViewProps {
  name: string
  content: string
}

const getNameInitials = (name: string) => {
  let initials = ''
  name.split(' ').forEach((item) => {
    initials = `${initials}${item.charAt(0)}`
  })
  return initials
}

const RecevierMessageView = ({ content, name }: RecevierMessageViewProps) => {
  return (
    <Flex gap="3">
      <Flex
        justify="center"
        align="center"
        p="2"
        className="rounded-full h-[40px] w-[40px] border border-[#C4B8F3] bg-[#F5F2FF]"
      >
        <Text className="text-3 font-[600] text-[#5746AF]">
          {getNameInitials(name)}
        </Text>
      </Flex>
      <Flex direction="column" gap="2">
        <Text className="text-2 font-[600]">{name}</Text>
        <Flex className="bg-pp-gray-10 border-pp-gray-2 max-w-[960px] rounded-bl-2 rounded-br-2 rounded-tr-2 border px-[14px] py-[10px]">
          <Text className="text-3 font-[400]">{content}</Text>
        </Flex>
      </Flex>
    </Flex>
  )
}

export { RecevierMessageView }
