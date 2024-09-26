import { Flex, Text, Tooltip } from '@radix-ui/themes'

const TestNameCell = ({ children }: React.PropsWithChildren) => {
  return (
    <Flex direction="column" height="100%" justify="center" px="1">
      <Tooltip content={children}>
        <Text className="line-clamp-1 overflow-ellipsis text-[11px]">
          {formatText(children as string)}
        </Text>
      </Tooltip>
    </Flex>
  )
}

const formatText = (text: string) => {
  const start = text.indexOf('(')
  const end = text.indexOf(')', start)

  if (start === -1 || end === -1 || start > end) {
    return (
      <Text className="line-clamp-1 overflow-ellipsis text-[11px]">{text}</Text>
    )
  }

  const before = text.slice(0, start).trim()
  const boldText = text.slice(start + 1, end).trim()
  const after = text.slice(end + 1).trim()

  return (
    <Text className="line-clamp-1 overflow-ellipsis text-[11px]">
      {before} <span className="font-bold">({boldText})</span> {after}
    </Text>
  )
}

export { TestNameCell }
