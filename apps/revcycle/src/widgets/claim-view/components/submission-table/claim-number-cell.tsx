import { Box, Text } from '@radix-ui/themes'
import { ClaimActionIcon } from './claim-action-icon'

interface TableCellLongTextProps {
  claimId: string
  text: string
}

const ClaimNumberCell = ({ claimId, text }: TableCellLongTextProps) => {
  return (
    <Box className="inline-flex">
      <Text
        size="1"
        className="max-w-[200px] items-center overflow-hidden whitespace-nowrap"
      >
        {text}
      </Text>
      <ClaimActionIcon claimId={claimId} />
    </Box>
  )
}

export { ClaimNumberCell }
