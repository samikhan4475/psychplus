import { useEffect, useState } from 'react'
import { Flex } from '@radix-ui/themes'
import { CodesetSelectCell } from '@/components'
import { CODESETS } from '@/constants'
import { useStore as useGlobalStore } from '@/store'
import { Appointment } from '@/types'
import {
  INITIAL_DISCHARGE_VISIT_STATUS,
  INITIAL_VISIT_STATUS,
  StatusCode,
  SUBSEQUENT_VISIT_STATUS,
} from '../../constants'
import {
  useConfirmVisitUpdate,
  useInactiveRowStatus,
  useRefetchAppointments,
  useVisitStatusCodeset,
} from '../../hooks'
import { VisitStatusCodes } from '../../types/schedule'
import { transformIn, updateVisit } from '../../utils'
import { NoteSignedAlert } from '../note-signed-alert'
import { UpdateVisitAlert } from '../update-visit-alert'

const NonTimedVisitStatusSelect = ({
  appointment,
}: {
  appointment: Appointment
}) => {
  const [visitStatus, setVisitStatus] = useState<string>(
    appointment.visitStatus,
  )
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const { alertState, onUpdateVisitConfirm, onUpdateVisitError } =
    useConfirmVisitUpdate()
  const refetch = useRefetchAppointments()
  const nonTimedVisitStatusCodes = useVisitStatusCodeset('NonTimed')
  const timedVisitStatusCodes = useVisitStatusCodeset('Timed')
  const isInactiveVisit = useInactiveRowStatus(
    appointment.visitStatus,
    appointment.isServiceTimeDependent,
  )
  const [exclude, setExclude] = useState<string[]>([])
  const { staffId } = useGlobalStore((state) => state.user)
  const nonPrimaryExcludedStatus = appointment.isPrimaryProviderType
    ? [VisitStatusCodes.SeenDcByPrimary, VisitStatusCodes.UnseenDcByPrimary]
    : []

  useEffect(() => {
    if (appointment.visitSequence === 'Initial') {
      setExclude(
        nonTimedVisitStatusCodes.filter(
          (value) => !INITIAL_VISIT_STATUS.includes(value),
        ),
      )
    } else if (appointment.visitSequence === 'InitialDischarge') {
      setExclude(
        nonTimedVisitStatusCodes.filter(
          (value) => !INITIAL_DISCHARGE_VISIT_STATUS.includes(value),
        ),
      )
    } else if (
      appointment.visitSequence === 'Subsequent' ||
      appointment.visitSequence === 'Discharge'
    ) {
      setExclude(
        nonTimedVisitStatusCodes.filter(
          (value) => !SUBSEQUENT_VISIT_STATUS.includes(value),
        ),
      )
    }
  }, [
    staffId,
    appointment.providerId,
    appointment.visitSequence,
    nonTimedVisitStatusCodes,
  ])

  const onChange = async (val: string) => {
    if (appointment.noteSignedStatus === 'Signed') {
      setVisitStatus(val)
      return setIsOpen(true)
    }
    setVisitStatus(val)
    const transformedBody = transformIn(appointment)
    transformedBody.appointmentStatus = val
    updateVisit({
      body: transformedBody,
      onSuccess: refetch,
      onError: onUpdateVisitError,
    })
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

  const onClose = (isConfirmed: boolean) => async () => {
    if (!isConfirmed) {
      setVisitStatus(appointment.visitStatus)
    }
    const transformedBody = transformIn(appointment)
    transformedBody.appointmentStatus = visitStatus
    updateVisit({
      body: transformedBody,
      onSuccess: refetch,
      onError: onUpdateVisitError,
    })
    setIsOpen(false)
  }

  return (
    <Flex
      width="100%"
      height="100%"
      align="center"
      onClick={(e) => e.stopPropagation()}
    >
      <UpdateVisitAlert state={alertState} onConfirm={confirmVisitUpdate} />
      <NoteSignedAlert isOpen={isOpen} onClose={onClose} />
      <CodesetSelectCell
        codeset={CODESETS.AppointmentStatus}
        value={visitStatus}
        disabled={isInactiveVisit}
        exclude={[
          ...exclude,
          ...nonPrimaryExcludedStatus,
          ...timedVisitStatusCodes,
        ]}
        onValueChange={onChange}
      />
    </Flex>
  )
}

export { NonTimedVisitStatusSelect }
