import { ReactNode } from 'react'
import { Flex, Text } from '@radix-ui/themes'

interface PayerTabHeaderProps {
  title: string
  children?: ReactNode
}

const PayerTabHeader = ({ title, children }: PayerTabHeaderProps) => {
  return (
    <Flex
      direction="row"
      justify="between"
      align="center"
      className="bg-white px-2 py-2"
    >
      <Text className="text-[16px] font-[600] text-accent-12">{title}</Text>
      {children && <Flex gap="2">{children}</Flex>}
    </Flex>
  )
}

export { PayerTabHeader }
