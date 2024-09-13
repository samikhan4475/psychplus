'use client'

import { Button, Flex, Grid } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { CardHeading } from '@/components'
import { type CreateUserSchema } from './create-user-schema'
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
  phone?: string
  email: string
  isPolicySigned: boolean
}

const CreateUserCard = ({
  patientId,
  phone,
  email,
  isPolicySigned,
}: CreateUserCardProps) => {
  const form = useFormContext<CreateUserSchema>()

  return (
    <Flex direction="column" className="bg-white overflow-hidden rounded-1">
      <CardHeading title="Create User">
        <Flex justify="end" className="flex-1">
          <Button
            size="1"
            variant="surface"
            color="gray"
            highContrast
            className="h-auto px-1 py-[2px]"
            onClick={(e) => {
              e.preventDefault()
              form.resetField('firstName')
              form.resetField('middleName')
              form.resetField('lastName')
              form.resetField('dob')
              form.resetField('phone')
              form.resetField('email')
              form.resetField('hasGuardian')
              form.resetField('guardianFirstName')
              form.resetField('guardianLastName')
            }}
          >
            Reset
          </Button>
        </Flex>
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
          phone={phone}
          email={email}
          isPolicySigned={isPolicySigned}
        />
      </Grid>
    </Flex>
  )
}

export { CreateUserCard }
