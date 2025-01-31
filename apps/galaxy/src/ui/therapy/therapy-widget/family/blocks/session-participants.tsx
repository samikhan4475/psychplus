'use client'

import { Flex } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { FormFieldError, RadioSelectSection } from '@/components'
import { FamilyTherapySchemaType } from '../therapy-schema'
import { FAMILY_SESSION_PARTICIPANT_OPTIONS } from './utils'

const TherapySessionParticipantsBlock = () => {
  const { watch } = useFormContext<FamilyTherapySchemaType>()
  const therapySessionParticipants = watch('therapySessionParticipants')

  return (
    <Flex align="center" height="24" gap="4">
      <RadioSelectSection
        label="Session Participant"
        field="therapySessionParticipants"
        options={FAMILY_SESSION_PARTICIPANT_OPTIONS}
        required
      />

      {!therapySessionParticipants && (
        <FormFieldError name={'therapySessionParticipants'} />
      )}
    </Flex>
  )
}

export { TherapySessionParticipantsBlock }
