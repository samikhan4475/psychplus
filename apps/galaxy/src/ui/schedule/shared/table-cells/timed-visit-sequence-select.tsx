import { useState } from 'react'
import { Flex } from '@radix-ui/themes'
import { CodesetSelectCell } from '@/components'
import { CODESETS } from '@/constants'
import { Appointment } from '@/types'
import { StatusCode } from '../../constants'
import {
  useConfirmVisitUpdate,
  useInactiveRowStatus,
  useRefetchAppointments,
  useVisitSequenceCodeset,
} from '../../hooks'
import { useEncounterTypeStore } from '../../store'
import { transformIn, updateVisit } from '../../utils'
import { UpdateVisitAlert } from '../update-visit-alert'

const TimedVisitSequenceSelect = ({
  appointment,
}: {
  appointment: Appointment
}) => {
  const [visitSequence, setVisitSequence] = useState<string>(
    appointment.visitSequence,
  )
  const timedVisitSequenceCodes = useVisitSequenceCodeset('TimedServices', true)
  const nonTimedVisitSequenceCodes = useVisitSequenceCodeset('NonTimedServices')
  const { visitSequenceOptionsMapper } = useEncounterTypeStore()
  const availableCodes = visitSequenceOptionsMapper[appointment.visitType] ?? []
  const availableSequenceCodes = timedVisitSequenceCodes.filter((val) =>
    availableCodes.includes(val),
  )
  const excluded = [...nonTimedVisitSequenceCodes]

  // Removing code which are not available for the current visit type
  timedVisitSequenceCodes.forEach((val) => {
    if (!availableSequenceCodes.includes(val)) {
      excluded.push(val)
    }
  })

  const isInactiveVisit = useInactiveRowStatus(
    appointment.visitStatus,
    appointment.isServiceTimeDependent,
  )
  const refetch = useRefetchAppointments()
  const { alertState, onUpdateVisitConfirm, onUpdateVisitError } =
    useConfirmVisitUpdate()

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
      status,
    })
  }

  const onChange = async (val: string) => {
    setVisitSequence(val)
    const transformedBody = transformIn(appointment)
    transformedBody.visitSequenceType = val
    updateVisit({
      body: transformedBody,
      onSuccess: refetch,
      onError: onUpdateVisitError,
    })
  }

  return (
    <Flex
      width="100%"
      height="100%"
      align="center"
      onClick={(e) => e.stopPropagation()}
    >
      <UpdateVisitAlert state={alertState} onConfirm={confirmVisitUpdate} />
      <CodesetSelectCell
        codeset={CODESETS.VisitSequence}
        disabled={isInactiveVisit}
        value={visitSequence}
        exclude={excluded}
        onValueChange={onChange}
      />
    </Flex>
  )
}

export { TimedVisitSequenceSelect }
