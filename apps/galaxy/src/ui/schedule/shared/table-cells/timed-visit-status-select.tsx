import { useState } from 'react'
import { now, parseAbsolute } from '@internationalized/date'
import { Flex } from '@radix-ui/themes'
import { CodesetSelectCell } from '@/components'
import { CODESETS, SettingStatusCode } from '@/constants'
import { useStore as useGlobalStore, useStore } from '@/store'
import { Appointment, RolePermission } from '@/types'
import { getPreferenceSettings } from '@/ui/staff-preferences/client-actions'
import { StatusCode } from '../../constants'
import {
  useConfirmVisitUpdate,
  useInactiveRowStatus,
  useRefetchAppointments,
  useSchedulerPermissions,
  useVisitStatusCodeset,
} from '../../hooks'
import { transformIn, updateVisit } from '../../utils'
import { CancelAppointmentAlert } from '../cancel-appointment-alert'
import { PermissionAlert } from '../permission-alert'
import { UpdateVisitAlert } from '../update-visit-alert'

const VISIT_STATUS_PERMISSION =
  'You do not have permission to change the visit status to this. Please contact your supervisor if you need any further assistance.'

const VISIT_STATUS_FROM_CHECKED_OUT_PERMISSION =
  'The visit status is checked out, please contact your supervisor to modify the visit status'

const RESCHEDULE_ALERT_MESSAGE =
  "The Visit Status cannot be manually changed to 'Rescheduled.'"

const VISIT_STATUS_SUCCESS = 'Visit status is set as Cancel-A'

const STATUS_PATIENT_IN_ROOM = 'The patient is in room'

const TimedVisitStatusSelect = ({
  appointment,
  className,
}: {
  appointment: Appointment
  className?: string
}) => {
  const userId = useStore((state) => state.user.id)
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
  const [isCancelAlertOpen, setIsCancelAlertOpen] = useState<boolean>(false)
  const [isAlertOpen, setIsAlertOpen] = useState<boolean>(false)
  const [alertMessage, setAlertMessage] = useState<string>('')
  const nonTimedVisitStatusCodes = useVisitStatusCodeset('NonTimed')
  const {
    canChangeVisitStatusToCheckedInOfSelfAppointments,
    canChangeVisitStatusToCheckedInOfOtherProviders,
    canChangeVisitStatusToCancelledSForSelfAppointments,
    canChangeVisitStatusToCancelledSForOtherProviders,
    canChangeVisitStatusToCheckedOut,
    canChangeVisitStatusFromCheckedOut,
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

    if (status in statusPermissions && !statusPermissions[status]) {
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
      successMessage:
        visitStatus === 'CancelledA' ? VISIT_STATUS_SUCCESS : undefined,
    })
  }

  const onChange = async (val: string) => {
    if (
      visitStatus === 'CheckedOut' &&
      val !== 'CheckedOut' &&
      !canChangeVisitStatusFromCheckedOut
    ) {
      setAlertMessage(VISIT_STATUS_FROM_CHECKED_OUT_PERMISSION)
      return setIsAlertOpen(true)
    }
    if (hasPermissionToChangeStatus(val)) {
      if (val === 'Rescheduled') {
        setAlertMessage(RESCHEDULE_ALERT_MESSAGE)
        return setIsAlertOpen(true)
      }
      setVisitStatus(val)
      if (val === 'CancelledS') {
        setIsCancelAlertOpen(true)
        return
      }
      const transformedBody = transformIn(appointment)
      transformedBody.appointmentStatus = val

      let successMessage = undefined
      if (val === 'InRoom') {
        const payload = {
          userId,
          categoryValues: ['StaffPreference'],
          name: 'PatientIsInRoomValue',
          settingStatusCode: SettingStatusCode.Active,
        }
        const res = await getPreferenceSettings(payload)
        if (res.state === 'success' && res.data?.[0]?.content === 'Yes') {
          successMessage = STATUS_PATIENT_IN_ROOM
        }
      } else if (val === 'CancelledA') {
        successMessage = VISIT_STATUS_SUCCESS
      }

      updateVisit({
        body: transformedBody,
        onSuccess: refetch,
        onError: onUpdateVisitError,
        successMessage,
      })
    } else {
      setAlertMessage(VISIT_STATUS_PERMISSION)
      setIsAlertOpen(true)
    }
  }

  const handleCancellation = async (noRebookReason: string): Promise<void> => {
    setIsCancelAlertOpen(false)
    const transformedBody = {
      ...transformIn(appointment),
      appointmentStatus: visitStatus,
      noRebookReason,
    }
    updateVisit({
      body: transformedBody,
      onSuccess: refetch,
      onError: onUpdateVisitError,
    })
  }

  const onCancelAlertClose = () => {
    setIsCancelAlertOpen(false)
    setVisitStatus(appointment.visitStatus)
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
        onClose={() => {
          setIsAlertOpen(false)
          setAlertMessage('')
        }}
        message={alertMessage}
      />
      <CancelAppointmentAlert
        appointment={appointment}
        isOpen={isCancelAlertOpen}
        onClose={onCancelAlertClose}
        onSave={handleCancellation}
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
