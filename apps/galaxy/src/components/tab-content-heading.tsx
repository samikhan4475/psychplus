import { Flex, Text } from '@radix-ui/themes'
import { cn } from '@/utils'

interface TabContentHeadingProps {
  title: string
  className?: string
}

const TabContentHeading = ({
  title,
  children,
  className = '',
}: React.PropsWithChildren<TabContentHeadingProps>) => {
  return (
    <Flex
      align="center"
      p="2"
      className={cn('bg-white -mt-[1px] border border-gray-5', className)}
    >
      <Text className="text-[16px] font-[600] text-accent-12">{title}</Text>
      {children}
    </Flex>
  )
}

export { TabContentHeading }
