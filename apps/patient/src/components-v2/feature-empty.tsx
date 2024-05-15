import { Flex, Text } from '@radix-ui/themes'
import { type LucideIcon } from 'lucide-react'

interface FeatureEmptyProps {
  title: string
  description?: React.ReactNode
  action?: React.ReactNode
  Icon: LucideIcon
}

const FeatureEmpty = ({
  title,
  description,
  action,
  Icon,
}: FeatureEmptyProps) => (
  <Flex
    direction="column"
    height="100%"
    align="center"
    justify="center"
    py="7"
    px="5"
  >
    <Flex
      align="center"
      justify="center"
      className="rounded-full h-[65px] w-[65px] border border-dashed border-gray-9"
    >
      <Icon
        width={30}
        height={30}
        strokeWidth={1}
        fill="white"
        className="text-accent-12"
      />
    </Flex>
    <Flex direction="column" mt="2">
      <Text
        align="center"
        className="font-serif text-[24px] font-[600] -tracking-[1.5px] text-accent-12"
      >
        {title}
      </Text>
      {description ? (
        <Text
          align="center"
          weight="light"
          className="text-[15px] text-gray-11"
        >
          {description}
        </Text>
      ) : null}
      {action ? (
        <Flex justify="center" mt="3">
          {action}
        </Flex>
      ) : null}
    </Flex>
  </Flex>
)

export { FeatureEmpty }
