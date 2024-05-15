import { Flex, Heading, Text } from '@radix-ui/themes'
import { ConstructionIcon } from 'lucide-react'

const UnderConstruction = () => (
  <Flex height="100%" align="center" justify="center" className="flex-1">
    <Flex direction="column" align="center" justify="center" gap="2">
      <Flex align="center" gap="2">
        <ConstructionIcon
          width={24}
          height={24}
          strokeWidth={1.5}
          fill="white"
          className="min-w-[24px] text-accent-12"
        />
        <Heading size="5" className="text-accent-12">
          Under Construction
        </Heading>
      </Flex>
      <Text size="2" align="center" className="max-w-[250px] text-gray-11">
        We&apos;re working hard to bring you something awesome!
      </Text>
    </Flex>
  </Flex>
)

export { UnderConstruction }
