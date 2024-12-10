import { PropsWithChildren } from 'react'
import { Flex, Text } from '@radix-ui/themes'

const RequiredColumnHeader = ({ children }: PropsWithChildren) => {
  return (
    <Flex>
      {children}
      <Text className="ml-[2px] text-[12px] text-red-9">*</Text>
    </Flex>
  )
}

export { RequiredColumnHeader }
