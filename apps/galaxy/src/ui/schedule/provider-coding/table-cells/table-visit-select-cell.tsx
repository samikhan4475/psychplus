import { useEffect, useState } from 'react'
import { Flex } from '@radix-ui/themes'
import { CodesetSelectCell, PropsWithRow } from '@/components'
import { CODESETS } from '@/constants'
import { CHANGE_NON_TIMED_SEQUENCE, StatusCode } from '../../constants'
import {
  useConfirmVisitUpdate,
  useInactiveRowStatus,
  useSchedulerPermissions,
  useVisitSequenceCodeset,
} from '../../hooks'
import { PermissionAlert, UpdateVisitAlert } from '../../shared'
import { useEncounterTypeStore } from '../../store'
import { updateVisit } from '../../utils'
import { useRefetchAppointments } from '../hooks'
import { MergedRecord, WeekDay } from '../types'
import { transformIn } from '../util'

interface VisitSequenceSelectCellProps extends PropsWithRow<MergedRecord> {
  day: WeekDay
}

const VisitSequenceSelectCell = ({
  row: { original: appointment },
  day,
}: VisitSequenceSelectCellProps) => {
  const data = appointment.weekDays[day.id]
  const appointmentId = data?.appointmentId
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [visitSequence, setVisitSequence] = useState<string>(
    data?.visitSequence ?? '',
  )
  const { alertState, onUpdateVisitConfirm, onUpdateVisitError } =
    useConfirmVisitUpdate()
  const [excludedCodes, setExcludedCodes] = useState<string[]>([])
  const refetch = useRefetchAppointments()
  const isInactiveVisit = useInactiveRowStatus(
    appointment.weekDays[day.id]?.visitStatus ?? '',
    false,
  )
  const timedVisitSequenceCodes = useVisitSequenceCodeset('TimedServices')
  const nonTimedVisitSequenceCodes = useVisitSequenceCodeset(
    'NonTimedServices',
    true,
  )

  const { visitSequenceOptionsMapper } = useEncounterTypeStore()
  const availableCodes = visitSequenceOptionsMapper[data?.visitType ?? ''] ?? []
  const availableSequenceCodes = nonTimedVisitSequenceCodes.filter((val) =>
    availableCodes.includes(val),
  )

  const { canChangeNonTimedServiceVisitSequence } = useSchedulerPermissions()

  useEffect(() => {
    const visitSequence = data?.visitSequence ?? ''
    const isPrimaryProviderType = data?.isPrimaryProviderType
    let exCodes: string[] = []
    // Removing code which are not available for the current visit type
    nonTimedVisitSequenceCodes.forEach((val) => {
      if (!availableSequenceCodes.includes(val)) {
        exCodes.push(val)
      }
    })
    if (
      (visitSequence === 'Initial' && isPrimaryProviderType) ||
      visitSequence === 'InitialDischarge'
    ) {
      exCodes = [
        ...exCodes,
        ...nonTimedVisitSequenceCodes.filter(
          (val) => !['Initial', 'InitialDischarge'].includes(val),
        ),
      ]
    } else if (visitSequence === 'Initial' && !isPrimaryProviderType) {
      exCodes = [
        ...exCodes,
        ...nonTimedVisitSequenceCodes.filter((val) => val !== 'Initial'),
      ]
    } else if (
      (visitSequence === 'Subsequent' && isPrimaryProviderType) ||
      visitSequence === 'Discharge'
    ) {
      exCodes = [
        ...exCodes,
        ...nonTimedVisitSequenceCodes.filter(
          (val) => !['Discharge', 'Subsequent'].includes(val),
        ),
      ]
    } else if (visitSequence === 'Subsequent' && !isPrimaryProviderType) {
      exCodes = [
        ...exCodes,
        ...nonTimedVisitSequenceCodes.filter((val) => val !== 'Subsequent'),
      ]
    }
    setExcludedCodes(exCodes)
  }, [data, nonTimedVisitSequenceCodes])

  const confirmVisitUpdate = (isConfirmed: boolean, status?: number) => {
    const isOverride = status === StatusCode.OverridePermission
    const transformedBody = {
      ...transformIn(appointment, day.id),
      isOverridePermissionProvided: isOverride,
      isProceedPermissionProvided: !isOverride,
      visitSequenceType: visitSequence,
    }
    onUpdateVisitConfirm({
      isConfirmed,
      body: transformedBody,
      resetValue: () => setVisitSequence(data?.visitSequence ?? ''),
    })
  }

  const onChange = (val: string) => {
    if (!canChangeNonTimedServiceVisitSequence) {
      return setIsOpen(true)
    }
    setVisitSequence(val)
    const transformedBody = transformIn(appointment, day.id)
    transformedBody.visitSequenceType = val
    updateVisit(transformedBody, refetch, onUpdateVisitError)
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
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        message={CHANGE_NON_TIMED_SEQUENCE}
      />
      <CodesetSelectCell
        value={visitSequence}
        codeset={CODESETS.VisitSequence}
        disabled={appointmentId === undefined || isInactiveVisit}
        exclude={[...timedVisitSequenceCodes, ...excludedCodes]}
        onValueChange={onChange}
      />
    </Flex>
  )
}

export { VisitSequenceSelectCell }
