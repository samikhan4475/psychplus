import { useState } from 'react'
import { Flex, IconButton } from '@radix-ui/themes'
import { PropsWithRow } from '@/components'
import { DollarIcon, TableEditIcon } from '@/components/icons'
import { useStore as useGlobalStore } from '@/store'
import { Appointment } from '@/types'
import { PaymentDialog } from '@/ui/patient-info/payment-history-tab'
import { EditVisit } from '@/ui/visit/edit-visit'
import { CLICK_DOLLAR_ICON, EDIT_APPOINTMENT } from '../../constants'
import {
  useInactiveRowStatus,
  useRefetchAppointments,
  useSchedulerPermissions,
} from '../../hooks'
import { PermissionAlert } from '../../shared'

const ActionsCell = ({
  row: { original: appointment },
}: PropsWithRow<Appointment>) => {
  const refetch = useRefetchAppointments()
  const isInactiveVisit = useInactiveRowStatus(appointment.visitStatus, false)
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [alertMessage, setAlertMessage] = useState<string>('')
  const { staffId } = useGlobalStore((state) => state.user)
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
          appointment={appointment}
        >
          <IconButton variant="ghost" disabled={isInactiveVisit}>
            <DollarIcon />
          </IconButton>
        </PaymentDialog>
      ) : (
        <IconButton
          variant="ghost"
          disabled={isInactiveVisit}
          onClick={() => {
            setAlertMessage(CLICK_DOLLAR_ICON)
            setIsOpen(true)
          }}
        >
          <DollarIcon />
        </IconButton>
      )}
      {hasPermissionToEditAppointment ? (
        <EditVisit onEdit={refetch} appointmentId={appointment.appointmentId}>
          <IconButton variant="ghost" disabled={isInactiveVisit}>
            <TableEditIcon height={18} />
          </IconButton>
        </EditVisit>
      ) : (
        <IconButton
          variant="ghost"
          disabled={isInactiveVisit}
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

export { ActionsCell }
