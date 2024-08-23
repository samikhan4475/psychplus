import { Flex } from '@radix-ui/themes'

const WidgetBlocksContainer = ({ children }: React.PropsWithChildren) => {
  return (
    <Flex direction="column" gap="2">
      {children}
    </Flex>
  )
}

export { WidgetBlocksContainer }
