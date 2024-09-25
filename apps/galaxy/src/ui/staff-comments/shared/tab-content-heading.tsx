'use client'

import { Flex, Text } from '@radix-ui/themes'

interface TabContentHeadingProps {
  title: string
}

const TabContentHeading = ({
  title,
  children,
}: React.PropsWithChildren<TabContentHeadingProps>) => {
  return (
    <Flex p="2" className="bg-white sticky -top-[1px] z-[1] shadow-2">
      <Text className="text-[16px] font-[600] text-accent-12">{title}</Text>
      {children}
    </Flex>
  )
}

export { TabContentHeading }
