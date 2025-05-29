import { Badge, BadgeProps, Flex } from '@radix-ui/themes'
import { Row } from '@tanstack/react-table'
import { DeclineMedicationDialog } from '../dialogs/decline-prescription-request-dialog'
import { UpdateMedicationDialog } from '../dialogs/update-medication-dialog'
import PatientMapDialog from '../patient-map/map-patient-dialog'
import { MedicationRefill } from '../types'

interface ActionsCellProps {
  row: Row<MedicationRefill>
}
const badgeColorMap: Record<string, BadgeProps['color']> = {
  Approved: 'green',
  Denied: 'red',
}
const ActionsCell = ({ row }: ActionsCellProps) => {
  const { isResponsePending, notificationResponseType, patientId } =
    row.original

  let content: React.ReactNode
  if (!patientId) {
    content = (
      <>
        <DeclineMedicationDialog row={row} /> <PatientMapDialog row={row} />
      </>
    )
  } else if (isResponsePending) {
    content = (
      <>
        <DeclineMedicationDialog row={row} />
        <UpdateMedicationDialog row={row} />
      </>
    )
  } else {
    const getBadgeColor = (status: string): BadgeProps['color'] =>
      badgeColorMap[status] || 'green'

    content = (
      <Badge
        className="!rounded-none"
        color={getBadgeColor(notificationResponseType ?? '')}
      >
        {notificationResponseType}
      </Badge>
    )
  }

  return (
    <Flex gap="1" align="center" className="w-full min-w-0">
      {content}
    </Flex>
  )
}

export { ActionsCell }
