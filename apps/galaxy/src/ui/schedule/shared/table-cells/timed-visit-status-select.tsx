import { useState } from 'react'
import { now, parseAbsolute } from '@internationalized/date'
import { Flex } from '@radix-ui/themes'
import { CodesetSelectCell } from '@/components'
import { CODESETS } from '@/constants'
import { useStore as useGlobalStore } from '@/store'
import { Appointment, RolePermission } from '@/types'
import { StatusCode } from '../../constants'
import {
  useConfirmVisitUpdate,
  useInactiveRowStatus,
  useRefetchAppointments,
  useSchedulerPermissions,
  useVisitStatusCodeset,
} from '../../hooks'
import { transformIn, updateVisit } from '../../utils'
import { PermissionAlert } from '../permission-alert'
import { UpdateVisitAlert } from '../update-visit-alert'

const VISIT_STATUS_PERMISSION =
  'You do not have permission to change the visit status to this. Please contact your supersvisor if you need any further assistance.'

const TimedVisitStatusSelect = ({
  appointment,
  className,
}: {
  appointment: Appointment
  className?: string
}) => {
  const [visitStatus, setVisitStatus] = useState<string>(
    appointment?.visitStatus,
  )
  const isInactiveVisit = useInactiveRowStatus(
    appointment.visitStatus,
    appointment.isServiceTimeDependent,
  )
  const { alertState, onUpdateVisitConfirm, onUpdateVisitError } =
    useConfirmVisitUpdate()
  const refetch = useRefetchAppointments()
  const [isAlertOpen, setIsAlertOpen] = useState<boolean>(false)
  const nonTimedVisitStatusCodes = useVisitStatusCodeset('NonTimed')
  const {
    canChangeVisitStatusToCheckedInOfSelfAppointments,
    canChangeVisitStatusToCheckedInOfOtherProviders,
    canChangeVisitStatusToCancelledSForSelfAppointments,
    canChangeVisitStatusToCancelledSForOtherProviders,
    canChangeVisitStatusToCheckedOut,
    canChangeVisitStatusToConfirmedS,
    canChangeVisitStatusToInRoom,
    canChangeVisitStatusToNoShowForSelfAppointments,
    canChangeVisitStatusToNoShowForOtherProviders,
    canChangeVisitStatusToNoShowAfterVisitStart,
  } = useSchedulerPermissions()
  const { staffId } = useGlobalStore((state) => state.user)
  const currentTime = now(appointment.locationTimezoneId)
  const visitStartTime = parseAbsolute(
    appointment.appointmentDate,
    appointment.locationTimezoneId,
  )
  const visitEndTime = visitStartTime.add({
    minutes: appointment.appointmentDuration,
  })
  const isPastVisitStartTime = currentTime.compare(visitStartTime) > 0
  const isPastVisitEndTime = currentTime.compare(visitEndTime) > 0
  const isASelfAppointment = staffId === appointment.providerId
  const canChangeVisitStatusToCheckedIn = isASelfAppointment
    ? canChangeVisitStatusToCheckedInOfSelfAppointments
    : canChangeVisitStatusToCheckedInOfOtherProviders
  const canChangeVisitStatusToCancelledS = isASelfAppointment
    ? canChangeVisitStatusToCancelledSForSelfAppointments
    : canChangeVisitStatusToCancelledSForOtherProviders
  const canChangeStatusToNoShowForOther =
    canChangeVisitStatusToNoShowAfterVisitStart
      ? true
      : !!canChangeVisitStatusToNoShowForOtherProviders
  const canChangeVisitStatusToNoShow = isASelfAppointment
    ? canChangeVisitStatusToNoShowForSelfAppointments
    : canChangeStatusToNoShowForOther

  const statusPermissions: Record<string, RolePermission> = {
    CheckedIn: canChangeVisitStatusToCheckedIn,
    CheckedOut: canChangeVisitStatusToCheckedOut,
    ConfirmedS: canChangeVisitStatusToConfirmedS,
    InRoom: canChangeVisitStatusToInRoom,
    CancelledS: canChangeVisitStatusToCancelledS,
  }

  const hasPermissionToChangeStatus = (status: string) => {
    if (status === 'ConfirmedP' || status === 'CancelledP') {
      return false
    }

    if (status === 'NoShow') {
      if (isPastVisitEndTime) {
        return !!canChangeVisitStatusToNoShow
      } else if (isPastVisitStartTime) {
        return !!canChangeVisitStatusToNoShowAfterVisitStart
      }
    }

    if (!statusPermissions[status]) {
      return false
    }

    return true
  }

  const confirmVisitUpdate = (isConfirmed: boolean, status?: number) => {
    const isOverride = status === StatusCode.OverridePermission
    const transformedBody = {
      ...transformIn(appointment),
      isOverridePermissionProvided: isOverride,
      isProceedPermissionProvided: !isOverride,
      appointmentStatus: visitStatus,
    }

    onUpdateVisitConfirm({
      isConfirmed,
      body: transformedBody,
      resetValue: () => setVisitStatus(appointment.visitStatus),
      status,
    })
  }

  const onChange = async (val: string) => {
    if (hasPermissionToChangeStatus(val)) {
      setVisitStatus(val)
      const transformedBody = transformIn(appointment)
      transformedBody.appointmentStatus = val
      updateVisit(transformedBody, refetch, onUpdateVisitError)
    } else setIsAlertOpen(true)
  }

  return (
    <Flex
      width="100%"
      height="100%"
      align="center"
      onClick={(e) => e.stopPropagation()}
    >
      <UpdateVisitAlert state={alertState} onConfirm={confirmVisitUpdate} />
      <PermissionAlert
        isOpen={isAlertOpen}
        onClose={() => setIsAlertOpen(false)}
        message={VISIT_STATUS_PERMISSION}
      />
      <CodesetSelectCell
        codeset={CODESETS.AppointmentStatus}
        value={visitStatus}
        disabled={isInactiveVisit}
        className={className}
        exclude={[...nonTimedVisitStatusCodes]}
        onValueChange={onChange}
      />
    </Flex>
  )
}

export { TimedVisitStatusSelect }
