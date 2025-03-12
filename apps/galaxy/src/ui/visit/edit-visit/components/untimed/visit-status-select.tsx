import { useEffect, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import {
  CodesetSelect,
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
} from '@/components'
import { CODESETS } from '@/constants'
import { VisitSequenceTypes } from '@/types'
import {
  INITIAL_DISCHARGE_VISIT_STATUS,
  INITIAL_VISIT_STATUS,
  SUBSEQUENT_VISIT_STATUS,
} from '@/ui/schedule/constants'
import { useVisitStatusCodeset } from '@/ui/schedule/hooks'
import { VisitStatusCodes } from '@/ui/schedule/types'
import { SchemaType } from '../../schema'

const VisitStatusSelect = () => {
  const nonTimedVisitStatusCodes = useVisitStatusCodeset('NonTimed')
  const timedVisitStatusCodes = useVisitStatusCodeset('Timed')
  const form = useFormContext<SchemaType>()
  const isPrimaryProviderType = form.watch('isPrimaryProviderType')
  const visitSequence = form.watch('visitSequence')
  const nonPrimaryStatuses = isPrimaryProviderType
    ? [VisitStatusCodes.SeenDcByPrimary, VisitStatusCodes.UnseenDcByPrimary]
    : []
  const [excludedCodes, setExcludedCodes] = useState<string[]>([])

  useEffect(() => {
    switch (visitSequence) {
      case VisitSequenceTypes.Initial:
        setExcludedCodes(
          nonTimedVisitStatusCodes.filter(
            (value) => !INITIAL_VISIT_STATUS.includes(value),
          ),
        )
        return
      case VisitSequenceTypes.InitialDischarge:
        setExcludedCodes(
          nonTimedVisitStatusCodes.filter(
            (value) => !INITIAL_DISCHARGE_VISIT_STATUS.includes(value),
          ),
        )
        return
      case VisitSequenceTypes.Subsequent:
      case VisitSequenceTypes.Discharge:
        setExcludedCodes(
          nonTimedVisitStatusCodes.filter(
            (value) => !SUBSEQUENT_VISIT_STATUS.includes(value),
          ),
        )
        return
    }
  }, [visitSequence, nonTimedVisitStatusCodes])

  return (
    <FormFieldContainer className="flex-1">
      <FormFieldLabel required>Visit Status</FormFieldLabel>
      <CodesetSelect
        name="visitStatus"
        codeset={CODESETS.AppointmentStatus}
        exclude={[
          ...timedVisitStatusCodes,
          ...nonPrimaryStatuses,
          ...excludedCodes,
        ]}
        size="1"
        className="h-6 w-full"
      />
      <FormFieldError name={'visitStatus'} />
    </FormFieldContainer>
  )
}

export { VisitStatusSelect }
