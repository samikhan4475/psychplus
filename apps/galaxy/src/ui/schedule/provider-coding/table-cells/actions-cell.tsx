import { useState } from 'react'
import { Flex, IconButton } from '@radix-ui/themes'
import { PropsWithRow } from '@/components'
import { DollarIcon, TableEditIcon } from '@/components/icons'
import { useStore as useGlobalStore } from '@/store'
import { Appointment } from '@/types'
import { PaymentDialog } from '@/ui/patient-info/payment-history-tab'
import { EditVisit } from '@/ui/visit/edit-visit'
import { CLICK_DOLLAR_ICON, EDIT_APPOINTMENT } from '../../constants'
import { useInactiveRowStatus, useSchedulerPermissions } from '../../hooks'
import { PermissionAlert } from '../../shared'
import { useRefetchAppointments } from '../hooks'
import { MergedRecord, WeekDay, WeekdayData } from '../types'

interface ActionCellProps extends PropsWithRow<MergedRecord> {
  day: WeekDay
}

const ActionsCell = ({
  row: { original: appointment },
  day,
}: ActionCellProps) => {
  const appointmentId = appointment.weekDays[day.id]?.appointmentId
  const isDisabled = appointmentId === undefined
  const { staffId } = useGlobalStore((state) => state.user)
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [alertMessage, setAlertMessage] = useState<string>('')
  const transformedAppointment = transformMergedAppointment(appointment, day)
  const refetch = useRefetchAppointments()
  const {
    permissionToClickDollarIcon,
    permissionToEditOtherAppointments,
    permissionToEditSelfAppointment,
  } = useSchedulerPermissions()
  const hasPermissionToEditSelfAppointment =
    staffId === appointment.providerId && permissionToEditSelfAppointment
  const hasPermissionToEditAppointment = hasPermissionToEditSelfAppointment
    ? true
    : !!permissionToEditOtherAppointments
  const isInactiveVisit = useInactiveRowStatus(
    appointment.weekDays[day.id]?.visitStatus ?? '',
    false
  )

  return (
    <Flex
      gap="1"
      align="center"
      justify="center"
      className="flex-1"
      onClick={(e) => e.stopPropagation()}
    >
      <PermissionAlert
        isOpen={isOpen}
        message={alertMessage}
        onClose={() => {
          setIsOpen(false)
        }}
      />
      {permissionToClickDollarIcon ? (
        <PaymentDialog
          patientId={appointment.patientId.toString()}
          appointment={transformedAppointment}
        >
          <IconButton variant="ghost" disabled={isDisabled || isInactiveVisit}>
            <DollarIcon />
          </IconButton>
        </PaymentDialog>
      ) : (
        <IconButton
          variant="ghost"
          disabled={isDisabled || isInactiveVisit}
          onClick={() => {
            setAlertMessage(CLICK_DOLLAR_ICON)
            setIsOpen(true)
          }}
        >
          <DollarIcon />
        </IconButton>
      )}
      {hasPermissionToEditAppointment ? (
        <EditVisit appointmentId={appointmentId ?? 0} onEdit={refetch}>
          <IconButton variant="ghost" disabled={isDisabled || isInactiveVisit}>
            <TableEditIcon height={18} />
          </IconButton>
        </EditVisit>
      ) : (
        <IconButton
          variant="ghost"
          disabled={isDisabled || isInactiveVisit}
          onClick={() => {
            setAlertMessage(EDIT_APPOINTMENT)
            setIsOpen(true)
          }}
        >
          <TableEditIcon height={18} />
        </IconButton>
      )}
    </Flex>
  )
}

const transformMergedAppointment = (
  mergedAppointment: MergedRecord,
  day: WeekDay,
): Appointment => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { weekDays, ...otherFields } =
    mergedAppointment
  const {
    diagnosis,
    visitMedium,
    visitSequence,
    isPrimaryProviderType,
    appointmentId,
    visitStatus,
    visitType,
    noteSignedStatus,
    cptCodes,
  } = mergedAppointment.weekDays[day.id] ?? ({} as WeekdayData)
  const appointment: Appointment = {
    ...otherFields,
    diagnosis,
    visitMedium,
    visitSequence,
    isPrimaryProviderType,
    appointmentId,
    visitStatus,
    visitType: visitType ?? '',
    noteSignedStatus,
    cptCodes,
  }
  return appointment
}

export { ActionsCell }
