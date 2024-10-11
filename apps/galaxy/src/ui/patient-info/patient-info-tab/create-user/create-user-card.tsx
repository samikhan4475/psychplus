'use client'

import { Button, Flex, Grid } from '@radix-ui/themes'
import { CardHeading } from '@/components'
import { DobInput } from './dob-input'
import { EmailInput } from './email-input'
import { FirstNameInput } from './first-name-input'
import { GuardianNameInput } from './guardian-name-input'
import { GuardianRadio } from './guardian-radio'
import { LastNameInput } from './last-name-input'
import { MiddleNameInput } from './middle-name-input'
import { PhoneNumberInput } from './phone-number-input'
import { PolicySection } from './policy-section'

interface CreateUserCardProps {
  patientId: string
  patientPolicyAStatus?: string
}

const CreateUserCard = ({
  patientId,
  patientPolicyAStatus,
}: CreateUserCardProps) => {
  return (
    <Flex direction="column" className="bg-white overflow-hidden rounded-1">
      <CardHeading title="Create User">
        <Flex justify="end" className="flex-1"></Flex>
      </CardHeading>
      <Grid columns="6" px="2" py="2" gap="2">
        <FirstNameInput />
        <MiddleNameInput />
        <LastNameInput />
        <DobInput />
        <PhoneNumberInput />
        <EmailInput />
        <GuardianRadio />
        <GuardianNameInput />
        <PolicySection
          patientId={patientId}
          patientPolicyAStatus={patientPolicyAStatus}
        />
      </Grid>
    </Flex>
  )
}

export { CreateUserCard }
