import { useEffect, useState } from 'react'
import { Flex } from '@radix-ui/themes'
import { CodesetSelectCell, PropsWithRow } from '@/components'
import { CODESETS } from '@/constants'
import { useStore as useGlobalStore } from '@/store'
import {
  INITIAL_DISCHARGE_VISIT_STATUS,
  INITIAL_VISIT_STATUS,
  StatusCode,
  SUBSEQUENT_VISIT_STATUS,
} from '../../constants'
import {
  useConfirmVisitUpdate,
  useInactiveRowStatus,
  useVisitStatusCodeset,
} from '../../hooks'
import { NoteSignedAlert, UpdateVisitAlert } from '../../shared'
import { VisitStatusCodes } from '../../types/schedule'
import { updateVisit } from '../../utils'
import { useRefetchAppointments } from '../hooks'
import { MergedRecord, WeekDay } from '../types'
import { transformIn } from '../util'

interface VisitStatusSelectCellProps extends PropsWithRow<MergedRecord> {
  day: WeekDay
}

const VisitStatusSelectCell = ({
  row: { original: appointment },
  day,
}: VisitStatusSelectCellProps) => {
  const data = appointment.weekDays[day.id]
  const appointmentId = data?.appointmentId
  const appointmentSequence = appointment.weekDays[day.id]?.visitSequence || ''
  const [visitStatus, setVisitStatus] = useState<string>(
    appointment.weekDays[day.id]?.visitStatus || '',
  )
  const refetch = useRefetchAppointments()
  const isInactiveVisit = useInactiveRowStatus(
    appointment.weekDays[day.id]?.visitStatus ?? '',
    false,
  )
  const { alertState, onUpdateVisitConfirm, onUpdateVisitError } =
    useConfirmVisitUpdate()
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const nonTimedVisitStatusCodes = useVisitStatusCodeset('NonTimed')
  const timedVisitStatusCodes = useVisitStatusCodeset('Timed')
  const [exclude, setExclude] = useState<string[]>([])
  const { staffId } = useGlobalStore((state) => state.user)
  const nonPrimaryExcludedStatus = data?.isPrimaryProviderType
    ? [VisitStatusCodes.SeenDcByPrimary, VisitStatusCodes.UnseenDcByPrimary]
    : []

  useEffect(() => {
    if (appointmentSequence === 'Initial') {
      setExclude(
        nonTimedVisitStatusCodes.filter(
          (value) => !INITIAL_VISIT_STATUS.includes(value),
        ),
      )
    } else if (appointmentSequence === 'InitialDischarge') {
      setExclude(
        nonTimedVisitStatusCodes.filter(
          (value) => !INITIAL_DISCHARGE_VISIT_STATUS.includes(value),
        ),
      )
    } else if (
      appointmentSequence === 'Subsequent' ||
      appointmentSequence === 'Discharge'
    ) {
      setExclude(
        nonTimedVisitStatusCodes.filter(
          (value) => !SUBSEQUENT_VISIT_STATUS.includes(value),
        ),
      )
    } else if (staffId === appointment.providerId) {
      setExclude([
        VisitStatusCodes.UnseenDcByPrimary,
        VisitStatusCodes.SeenDcByPrimary,
      ])
    }
  }, [
    staffId,
    appointment.providerId,
    appointmentSequence,
    nonTimedVisitStatusCodes,
  ])

  const onChange = (val: string) => {
    if (appointment.weekDays[day.id]?.noteSignedStatus === 'Signed') {
      setVisitStatus(val)
      return setIsOpen(true)
    }
    setVisitStatus(val)
    const transformedBody = transformIn(appointment, day.id)
    transformedBody.appointmentStatus = val
    updateVisit(transformedBody, refetch)
  }

  const confirmVisitUpdate = (isConfirmed: boolean, status?: number) => {
    const isOverride = status === StatusCode.OverridePermission
    const transformedBody = {
      ...transformIn(appointment, day.id),
      isOverridePermissionProvided: isOverride,
      isProceedPermissionProvided: !isOverride,
      appointmentStatus: visitStatus,
    }

    onUpdateVisitConfirm({
      isConfirmed,
      body: transformedBody,
      resetValue: () => setVisitStatus(data?.visitStatus ?? ''),
    })
  }

  const onClose = (isConfirmed: boolean) => () => {
    if (!isConfirmed) {
      setVisitStatus(data?.visitStatus ?? '')
    }
    const transformedBody = transformIn(appointment, day.id)
    transformedBody.appointmentStatus = visitStatus
    updateVisit(transformedBody, refetch, onUpdateVisitError)
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
        disabled={appointmentId === undefined || isInactiveVisit}
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

export { VisitStatusSelectCell }
