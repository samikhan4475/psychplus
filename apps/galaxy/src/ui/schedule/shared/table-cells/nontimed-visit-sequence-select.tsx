import { useEffect, useMemo, useState } from 'react'
import { Flex } from '@radix-ui/themes'
import { CodesetSelectCell } from '@/components'
import { CODESETS } from '@/constants'
import { Appointment } from '@/types'
import { CHANGE_NON_TIMED_SEQUENCE, StatusCode } from '../../constants'
import {
  useConfirmVisitUpdate,
  useInactiveRowStatus,
  useRefetchAppointments,
  useSchedulerPermissions,
  useVisitSequenceCodeset,
} from '../../hooks'
import { useEncounterTypeStore } from '../../store'
import { transformIn, updateVisit } from '../../utils'
import { PermissionAlert } from '../permission-alert'
import { UpdateVisitAlert } from '../update-visit-alert'

const NonTimedVisitSequenceSelect = ({
  appointment,
}: {
  appointment: Appointment
}) => {
  const [visitSequence, setVisitSequence] = useState<string>(
    appointment.visitSequence,
  )
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [excludedCodes, setExcludedCodes] = useState<string[]>([])
  const timedVisitSequenceCodes = useVisitSequenceCodeset('TimedServices')
  const nonTimedVisitSequenceCodes = useVisitSequenceCodeset(
    'NonTimedServices',
    true,
  )

  const { visitSequenceOptionsMapper } = useEncounterTypeStore()
  const availableSequenceCodes = useMemo(() => {
    const availableCodes =
      visitSequenceOptionsMapper[appointment.visitType] ?? []
    return nonTimedVisitSequenceCodes.filter((val) =>
      availableCodes.includes(val),
    )
  }, [appointment.visitType, visitSequenceOptionsMapper])

  const isInactiveVisit = useInactiveRowStatus(
    appointment.visitStatus,
    appointment.isServiceTimeDependent,
  )
  const refetch = useRefetchAppointments()
  const { alertState, onUpdateVisitConfirm, onUpdateVisitError } =
    useConfirmVisitUpdate()
  const { canChangeNonTimedServiceVisitSequence } = useSchedulerPermissions()

  useEffect(() => {
    const { visitSequence, isPrimaryProviderType } = appointment
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
        ...availableSequenceCodes.filter(
          (val) => !['Initial', 'InitialDischarge'].includes(val),
        ),
      ]
    } else if (visitSequence === 'Initial' && !isPrimaryProviderType) {
      exCodes = [
        ...exCodes,
        ...availableSequenceCodes.filter((val) => val !== 'Initial'),
      ]
    } else if (
      (visitSequence === 'Subsequent' && isPrimaryProviderType) ||
      visitSequence === 'Discharge'
    ) {
      exCodes = [
        ...exCodes,
        ...availableSequenceCodes.filter(
          (val) => !['Discharge', 'Subsequent'].includes(val),
        ),
      ]
    } else if (visitSequence === 'Subsequent' && !isPrimaryProviderType) {
      exCodes = [
        ...exCodes,
        ...availableSequenceCodes.filter((val) => val !== 'Subsequent'),
      ]
    }
    setExcludedCodes(exCodes)
  }, [appointment, nonTimedVisitSequenceCodes, availableSequenceCodes])

  const confirmVisitUpdate = (isConfirmed: boolean, status?: number) => {
    const isOverride = status === StatusCode.OverridePermission
    const transformedBody = {
      ...transformIn(appointment),
      isOverridePermissionProvided: isOverride,
      isProceedPermissionProvided: !isOverride,
      visitSequenceType: visitSequence,
    }
    onUpdateVisitConfirm({
      isConfirmed,
      body: transformedBody,
      resetValue: () => setVisitSequence(appointment.visitSequence),
    })
  }

  const onChange = async (val: string) => {
    if (!canChangeNonTimedServiceVisitSequence) {
      return setIsOpen(true)
    }
    setVisitSequence(val)
    const transformedBody = transformIn(appointment)
    transformedBody.visitSequenceType = val
    updateVisit(transformedBody, refetch, onUpdateVisitError)
  }

  const excluded = [...timedVisitSequenceCodes, ...excludedCodes]

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
        codeset={CODESETS.VisitSequence}
        value={visitSequence}
        disabled={isInactiveVisit}
        exclude={excluded}
        onValueChange={onChange}
      />
    </Flex>
  )
}

export { NonTimedVisitSequenceSelect }
