'use client'

import { Flex } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import {
  FormError,
  RadioSelectSection,
  SelectableChipDetails,
} from '@/components'
import { TherapySchemaType } from '../therapy-schema'
import { SESSION_PARTICIPANT_OPTIONS } from './utils'

const TherapySessionParticipantsBlock = () => {
  const {
    watch,
    formState: { errors },
  } = useFormContext<TherapySchemaType>()
  const therapySessionParticipants = watch('therapySessionParticipants')
  const therapySessionParticipantsError =
    errors.therapySessionParticipants?.message || ''

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
      <FormError
        message={
          therapySessionParticipants ? '' : therapySessionParticipantsError
        }
      />
    </Flex>
  )
}

export { TherapySessionParticipantsBlock }
