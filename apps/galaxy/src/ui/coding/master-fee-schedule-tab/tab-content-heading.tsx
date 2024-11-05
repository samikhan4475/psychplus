import { Flex, Text } from '@radix-ui/themes'

interface TabContentHeadingProps {
  title: string
}

const TabContentHeading = ({
  title,
  children,
}: React.PropsWithChildren<TabContentHeadingProps>) => {
  return (
    <Flex
      align="center"
      justify="between"
      p="2"
      className="bg-white -mt-[1px] border border-gray-5"
    >
      <Text className="text-[16px] font-[600] text-accent-12">{title}</Text>
      {children}
    </Flex>
  )
}

export { TabContentHeading }
