'use client'

import { Flex, Text } from '@radix-ui/themes'
import { FormFieldContainer, FormFieldLabel } from '@/components/form'
import { MaximumAgeField } from './maximum-age-field'
import { MinimumAgeField } from './minimum-age-field'

const AgeRangeField = () => {
  return (
    <FormFieldContainer>
      <FormFieldLabel>Age Range</FormFieldLabel>
      <Flex align="start">
        <MinimumAgeField />
        <Text mx="2"> - </Text>
        <MaximumAgeField />
      </Flex>
    </FormFieldContainer>
  )
}

export { AgeRangeField }
