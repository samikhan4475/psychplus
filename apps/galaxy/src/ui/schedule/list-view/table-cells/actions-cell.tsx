import { useState } from 'react'
import { Flex, IconButton } from '@radix-ui/themes'
import { CirclePlus } from 'lucide-react'
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
import { AddProviderTypeDialog } from '../add-provider-type-dialog'

const ActionsCell = ({
  row: { original: appointment },
}: PropsWithRow<Appointment>) => {
  const appointmentId = appointment.appointmentId
  const { staffId } = useGlobalStore((state) => state.user)
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [alertMessage, setAlertMessage] = useState<string>('')
  const refetch = useRefetchAppointments()
  const {
    permissionToEditOtherAppointments,
    permissionToClickDollarIcon,
    permissionToEditSelfAppointment,
  } = useSchedulerPermissions()
  const isInactiveVisit = useInactiveRowStatus(
    appointment.visitStatus,
    appointment.isServiceTimeDependent,
  )
  const hasPermissionToEditSelfAppointment =
    staffId === appointment.providerId && permissionToEditSelfAppointment
  const hasPermissionToEditAppointment = hasPermissionToEditSelfAppointment
    ? true
    : !!permissionToEditOtherAppointments
  const isPsychiatristVisitTypeSequence =
    appointment.providerType === 'Psychiatrist'

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
          patientId={`${appointment.patientId}`}
          appointment={appointment}
        >
          <IconButton disabled={isInactiveVisit} variant="ghost">
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
        <EditVisit
          appointmentId={appointmentId}
          onEdit={refetch}
          disabled={isInactiveVisit}
        >
          <IconButton variant="ghost">
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
      {!appointment.isServiceTimeDependent && (
        <AddProviderTypeDialog
          appointmentId={appointment.appointmentId}
          isPsychiatristVisitTypeSequence={isPsychiatristVisitTypeSequence}
        >
          <IconButton
            variant="ghost"
            disabled={!isPsychiatristVisitTypeSequence || isInactiveVisit}
          >
            <CirclePlus color="black" width={16} height={16} />
          </IconButton>
        </AddProviderTypeDialog>
      )}
    </Flex>
  )
}

export { ActionsCell }
