import { Badge, Text, Tooltip } from '@radix-ui/themes'
import { PropsWithRow, TextCell } from '@/components'
import { PrescriberRxRenewalResponse } from '../types'
import { getBadgeColor } from './actions-cell'

const TranscationStatusCell = ({
  row,
}: PropsWithRow<PrescriberRxRenewalResponse>) => {
  const drug = row.original
  if (drug?.transactionErrorDescription) {
    return (
      <Tooltip content={<Text>{drug?.transactionErrorDescription}</Text>}>
        <Text>{drug?.userTransactionStatus}</Text>
      </Tooltip>
    )
  }
  return (
    <TextCell>
      <Badge
        className="!rounded-none"
        color={getBadgeColor(drug.userTransactionStatus ?? '')}
      >
        {drug.userTransactionStatus}
      </Badge>
    </TextCell>
  )
}

export default TranscationStatusCell
