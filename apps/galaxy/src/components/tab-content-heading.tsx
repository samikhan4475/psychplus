import { Flex, Text } from '@radix-ui/themes'
import { cn } from '@/utils'

interface TabContentHeadingProps {
  title: string
  className?: string
  beforeTitle?: React.ReactNode
}

const TabContentHeading = ({
  title,
  children,
  className = '',
  beforeTitle,
}: React.PropsWithChildren<TabContentHeadingProps>) => {
  return (
    <Flex
      justify="between"
      align="center"
      p="2"
      className={cn('bg-white -mt-[1px] border border-gray-5', className)}
    >
      <Flex>
        {beforeTitle && <Flex mr="2">{beforeTitle}</Flex>}
        <Text className="text-[16px] font-[600] text-accent-12">{title}</Text>
      </Flex>
      {children}
    </Flex>
  )
}

export { TabContentHeading }
