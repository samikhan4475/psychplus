import { Flex, Text, Tooltip } from '@radix-ui/themes'

const LongTextCell = ({ children }: React.PropsWithChildren) => {
  return (
    <Flex direction="column" height="100%" justify="center" px="1">
      <Tooltip content={children}>
        <Text className="line-clamp-1 overflow-ellipsis text-[11px]">
          {children}
        </Text>
      </Tooltip>
    </Flex>
  )
}

export { LongTextCell }
