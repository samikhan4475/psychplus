import { cn } from '@psychplus-v2/utils'
import { Flex, Text } from '@radix-ui/themes'

interface FeatureCardProps {
  id?: string
  title: string | React.ReactNode
  containerClassName?: string
  contentClassName?: string
  showTitleInsideCard?: boolean
}

const FeatureCard = ({
  id,
  title,
  children,
  containerClassName,
  contentClassName,
  showTitleInsideCard,
}: React.PropsWithChildren<FeatureCardProps>) => (
  <Flex
    id={id}
    direction="column"
    className={cn(
      'bg-white border-b-gray-5 first:border-b xs:rounded-2 xs:border xs:border-gray-5',
      containerClassName,
    )}
  >
    {!showTitleInsideCard && title && (
      <Flex
        align="center"
        py="2"
        px="3"
        className="rounded-t-2 border-b border-b-gray-5 bg-[#EEF2F6]"
      >
        <Text className="text-[14px] font-[500] xs:text-[16px]">{title}</Text>
      </Flex>
    )}
    <Flex direction="column" py="5" px={{ initial: '3', md: '5' }} className={cn(contentClassName)}>
      {showTitleInsideCard && title && (
        <Text className="md:text-[22px] text-[18px] font-medium" mb="2">
          {title}
        </Text>
      )}
      {children}
    </Flex>
  </Flex>
)

export { FeatureCard }
