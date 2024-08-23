import { Flex, Text } from "@radix-ui/themes"

const DateCell = ({ children }: React.PropsWithChildren) => {
  return (
    <Flex direction="column" height="100%" justify="center" px="1">
      <Text className="text-[11px]">{children}</Text>
    </Flex>
  )
}

export { DateCell }
