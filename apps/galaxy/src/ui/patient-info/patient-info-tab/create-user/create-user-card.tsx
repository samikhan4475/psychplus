'use client'

import { Button, Flex } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { CardHeading } from '@/components'
import { DobInput } from './dob-input'
import { FirstNameInput } from './first-name-input'
import { LastNameInput } from './last-name-input'
import { MiddleNameInput } from './middle-name-input'
import { type CreateUserSchema } from './schema'

const CreateUserCard = () => {
  const form = useFormContext<CreateUserSchema>()

  return (
    <Flex direction="column" className="bg-white shadow-2">
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
            }}
          >
            Reset
          </Button>
        </Flex>
      </CardHeading>
      <Flex direction="column" px="2" py="2">
        <Flex align="start" gap="2">
          <FirstNameInput />
          <MiddleNameInput />
          <LastNameInput />
          <DobInput />
        </Flex>
      </Flex>
    </Flex>
  )
}

export { CreateUserCard }
