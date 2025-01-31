'use client'

import { Flex } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import {
  FormFieldError,
  RadioSelectSection,
  SelectableChipDetails,
} from '@/components'
import { TherapySchemaType } from '../therapy-schema'
import { SESSION_PARTICIPANT_OPTIONS } from './utils'

const TherapySessionParticipantsBlock = () => {
  const { watch } = useFormContext<TherapySchemaType>()
  const therapySessionParticipants = watch('therapySessionParticipants')

  return (
    <Flex align="center" height="24" gap="4">
      <RadioSelectSection
        label="Session Participant"
        field="therapySessionParticipants"
        options={SESSION_PARTICIPANT_OPTIONS}
        required
      />
      {therapySessionParticipants === 'Patient&Other' && (
        <SelectableChipDetails
          label="Other"
          field="patientOther"
          type="text"
          showIndicator={false}
        />
      )}
      {!therapySessionParticipants && (
        <FormFieldError name={'therapySessionParticipants'} />
      )}
    </Flex>
  )
}

export { TherapySessionParticipantsBlock }
