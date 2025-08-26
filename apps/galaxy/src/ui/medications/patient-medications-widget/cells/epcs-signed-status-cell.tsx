import { Flex, Tooltip } from '@radix-ui/themes'
import { CheckCircle2, Hourglass } from 'lucide-react'
import { PropsWithRow } from '@/components'
import { EpcsDrugSignedStatus, PatientMedication } from '../types'

export const EpcsSignedStatusCell = ({
  row: { original },
}: PropsWithRow<PatientMedication>) => {
  const icons = []
  const epcsStatus = original.epcsDrugSignedStatus

  switch (epcsStatus) {
    case EpcsDrugSignedStatus.Signed:
      icons.push(
        <Tooltip key="resultSigned" content={epcsStatus}>
          <CheckCircle2 size={18} className="ml-1 text-green-10" />
        </Tooltip>,
      )
      break
    case EpcsDrugSignedStatus.ReadyToSign:
      icons.push(
        <Tooltip key="readyToSign" content="Ready To Sign">
          <Hourglass size={14} className="text-yellow-700 ml-1" />
        </Tooltip>,
      )
      break
    default:
      break
  }

  if (icons.length > 0) {
    return <Flex gap="2">{icons}</Flex>
  }
}
