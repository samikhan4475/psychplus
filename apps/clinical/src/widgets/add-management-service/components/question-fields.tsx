'use client'

import React from 'react'
import { Box, Checkbox, Flex, Text } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { RadioButtonOption } from '../types'
import { RadioButtonGroup } from './radio-button-group'

const QuestionFields = () => {
  const { watch, setValue } = useFormContext()

  const questionOptions: RadioButtonOption[] = [
    { value: 'Yes', label: 'Yes' },
    { value: 'No', label: 'No' },
  ]
  return (
    <Box className="col-span-3">
      <Text size={'4'} weight={'bold'}>
        Questions
      </Text>
      <Flex direction={'column'} className="gap-[10px]" width={'100%'} mt={'2'}>
        <RadioButtonGroup
          label="PsychPlus Policy Required"
          name="psychPlusPolicyRequired"
          options={questionOptions}
        />

        <RadioButtonGroup
          label="EHR Use Preferences"
          name="ehrUsePreferences"
          options={[
            { value: 'EHR + Coding', label: 'EHR + Coding' },
            { value: 'Coding Only', label: 'Coding Only' },
          ]}
        />

        <RadioButtonGroup
          label="Send patient reminder for visits"
          name="sendProviderReminderForVisits"
          options={questionOptions}
        />

        <RadioButtonGroup
          label="Are patient potentially seen every day on this service"
          name="arePatientPotentiallySeenEveryDayOnThisService"
          options={questionOptions}
        />

        <RadioButtonGroup
          label="Automatically bill for this service"
          name="automaticallyBillForThisService"
          options={questionOptions}
        />

        <Text as="label" size="2" weight={'medium'}>
          <Flex gap="2">
            <Checkbox
              color="blue"
              checked={watch('createSimilarVisitForMedicalProvider')}
              onCheckedChange={(check) =>
                setValue('createSimilarVisitForMedicalProvider', check)
              }
            />
            Create similar visit for medical provider
          </Flex>
        </Text>
      </Flex>
    </Box>
  )
}

export { QuestionFields }
