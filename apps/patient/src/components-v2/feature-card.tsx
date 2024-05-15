import { cn } from '@psychplus-v2/utils'
import { Flex, Text } from '@radix-ui/themes'

interface FeatureCardProps {
  id?: string
  title: string
  containerClassName?: string
  contentClassName?: string
}

const FeatureCard = ({
  id,
  title,
  children,
  containerClassName,
  contentClassName,
}: React.PropsWithChildren<FeatureCardProps>) => (
  <Flex
    id={id}
    direction="column"
    className={cn(
      'bg-white border-b-gray-5 first:border-b xs:rounded-2 xs:border xs:border-gray-5',
      containerClassName,
    )}
  >
    <Flex
      align="center"
      py="3"
      px="5"
      className="border-b border-b-gray-5 bg-gray-2"
    >
      <Text className="text-[14px] font-[500] xs:text-[16px]">{title}</Text>
    </Flex>
    <Flex direction="column" py="6" px="5" className={cn(contentClassName)}>
      {children}
    </Flex>
  </Flex>
)

export { FeatureCard }
