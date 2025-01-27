'use client'

import { Flex } from '@radix-ui/themes'
import { FormFieldError, RadioSelectSection } from '@/components'
import { FAMILY_SESSION_PARTICIPANT_OPTIONS } from './utils'

const TherapySessionParticipantsBlock = () => {
  return (
    <Flex align="center" height="24" gap="4">
      <RadioSelectSection
        label="Session Participant"
        field="therapySessionParticipants"
        options={FAMILY_SESSION_PARTICIPANT_OPTIONS}
        required
      />

      <FormFieldError name={'therapySessionParticipants'} />
    </Flex>
  )
}

export { TherapySessionParticipantsBlock }
