import { Box, Text } from '@radix-ui/themes'
interface TableCellLongTextProps {
  text: string
}
const ClaimNumberCell = ({ text }: TableCellLongTextProps) => {
  return (
    <Box className="inline-flex">
      <Text
        size="1"
        className="max-w-[200px] items-center overflow-hidden whitespace-nowrap"
      >
        {text}
      </Text>
    </Box>
  )
}
export { ClaimNumberCell }
