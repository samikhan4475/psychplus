import { Flex, Text } from '@radix-ui/themes'
import { cn } from '@/utils'

interface CardHeadingProps {
  title: string
  className?: string
}

const CardHeading = ({
  title,
  children,
  className,
}: React.PropsWithChildren<CardHeadingProps>) => (
  <Flex align="center" px="2" py="1" className={cn('bg-gray-3', className)}>
    <Text weight="medium" className="text-[14px]">
      {title}
    </Text>
    {children}
  </Flex>
)

export { CardHeading }
