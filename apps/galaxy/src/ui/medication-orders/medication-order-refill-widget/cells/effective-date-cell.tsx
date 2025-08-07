import { DateTimeCell, PropsWithRow } from '@/components'
import { formatDate } from '@/utils'
import { PrescriberRxRenewalResponse } from '../types'

const EffectiveDateCell = ({
  row,
}: PropsWithRow<PrescriberRxRenewalResponse>) => {
  const drug = row.original?.pharmacyNotificationResponseDrug?.[0]
  return (
    <DateTimeCell>
      {drug?.effectiveDate
        ? formatDate(`${drug?.effectiveDate}`, 'MM/dd/yyyy')
        : ''}
    </DateTimeCell>
  )
}

export default EffectiveDateCell
