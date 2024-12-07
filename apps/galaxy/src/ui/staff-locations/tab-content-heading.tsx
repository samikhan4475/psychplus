import { Flex, Text } from '@radix-ui/themes'

interface TabContentHeadingProps {
  title: string
}

const TabContentHeading = ({
  title,
  children,
}: React.PropsWithChildren<TabContentHeadingProps>) => {
  return (
    <Flex align="center" className="bg-white px-3 py-2" justify="between">
      <Text className="text-[16px] font-[600] text-accent-12">{title}</Text>
      {children}
    </Flex>
  )
}

export { TabContentHeading }
