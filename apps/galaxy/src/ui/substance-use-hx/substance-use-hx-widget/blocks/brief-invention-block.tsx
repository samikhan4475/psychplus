import React from 'react'
import { Flex, Text } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { CheckboxCell } from '@/components'

const BriefInterventionBlock = () => {
  const form = useFormContext()

  const briefIntervention = form.watch('briefIntervention') ? true : false
  const handleCheckedChange = (checked: boolean | 'indeterminate') => {
    form.setValue('briefIntervention', checked === true)
  }

  return (
    <>
      {(form.watch('alcohol') === 'yes' || form.watch('drugs') === 'yes') && (
        <Flex align="center">
          <Text size="1" weight="medium" className="mr-2">
            Brief Intervention
          </Text>
          <CheckboxCell
            checked={briefIntervention}
            onCheckedChange={handleCheckedChange}
          />
          <Text
            size="1"
            className="ml-1 w-[50%] rounded-2 border border-gray-5 p-1"
          >
            Discussed with patient reasons for use of substance, health risk
            associated with use, how ready and confident the patient is about
            quitting, gave advice and discussed the following goal
          </Text>
        </Flex>
      )}
    </>
  )
}

export { BriefInterventionBlock }
