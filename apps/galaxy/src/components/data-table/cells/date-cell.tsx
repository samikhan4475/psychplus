import { Flex, Text } from '@radix-ui/themes'

const DateCell = ({ children }: React.PropsWithChildren) => {
  return (
    <Flex direction="column" height="100%" justify="center">
      <Text className="text-pp-black-3" size="1" weight="regular">
        {children}
      </Text>
    </Flex>
  )
}

export { DateCell }
