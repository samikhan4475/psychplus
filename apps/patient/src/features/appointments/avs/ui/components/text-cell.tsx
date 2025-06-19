import { Flex, Text } from '@radix-ui/themes'

const TextCell = ({ children }: React.PropsWithChildren) => (
  <Flex height="100%" align="center" justify="start" pl="1">
    <Text weight="regular" className="text-1">
      {children}
    </Text>
  </Flex>
)

export { TextCell }
