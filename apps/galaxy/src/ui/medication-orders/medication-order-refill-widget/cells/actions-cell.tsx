import { Flex } from '@radix-ui/themes'
import { Row } from '@tanstack/react-table'
import { LongTextCell } from '@/components'
import { DeclineMedicationDialog } from '../dialogs/decline-prescription-request-dialog'
import { UpdateMedicationDialog } from '../dialogs/update-medication-dialog'
import PatientMapDialog from '../patient-map/map-patient-dialog'
import { MedicationRefill } from '../types'

interface ActionsCellProps {
  row: Row<MedicationRefill>
}

const ActionsCell = ({ row }: ActionsCellProps) => {
  const { isResponsePending, notificationResponseType, patientId } =
    row.original
  let content: React.ReactNode
  if (!patientId) {
    content = <PatientMapDialog row={row} />
  } else if (isResponsePending) {
    content = (
      <>
        <DeclineMedicationDialog row={row} />
        <UpdateMedicationDialog row={row} />
      </>
    )
  } else {
    content = (
      <LongTextCell className="w-[150px]">
        {notificationResponseType}
      </LongTextCell>
    )
  }

  return (
    <Flex gap="2" align="center">
      {content}
    </Flex>
  )
}

export { ActionsCell }
