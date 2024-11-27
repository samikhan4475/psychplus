import { Flex, Text } from '@radix-ui/themes'

interface TabContentHeadingProps {
  title: string
}

const TabContentHeading = ({
  title,
  children,
}: React.PropsWithChildren<TabContentHeadingProps>) => {
  return (
    <Flex align="center" justify="between">
      <Text className="text-1 font-[600] text-accent-12">{title}</Text>
      {children}
    </Flex>
  )
}

export { TabContentHeading }
