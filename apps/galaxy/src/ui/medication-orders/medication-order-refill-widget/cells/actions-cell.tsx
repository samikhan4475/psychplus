import { Flex } from '@radix-ui/themes'
import { Row } from '@tanstack/react-table'
import { LongTextCell } from '@/components'
import { DeclineMedicationDialog } from '../dialogs/decline-prescription-request-dialog'
import { UpdateMedicationDialog } from '../dialogs/update-medication-dialog'
import { MedicationRefill } from '../types'

interface ActionsCellProps {
  row: Row<MedicationRefill>
}

const ActionsCell = ({ row }: ActionsCellProps) => {
  const { isResponsePending, notificationResponseType } = row.original
  return (
    <Flex gap="2" align="center">
      {isResponsePending ? (
        <>
          <DeclineMedicationDialog row={row} />
          <UpdateMedicationDialog row={row} />
        </>
      ) : (
        <LongTextCell className="w-[150px]">
          {notificationResponseType}
        </LongTextCell>
      )}
    </Flex>
  )
}

export { ActionsCell }
