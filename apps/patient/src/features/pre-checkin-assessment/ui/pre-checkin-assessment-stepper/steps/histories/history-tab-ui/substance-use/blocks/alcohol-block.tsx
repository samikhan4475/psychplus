import React from 'react'
import { Box, Flex, Text } from '@radix-ui/themes'
import { FormFieldLabel } from '@/components-v2'
import AlcoholOptions from './alcohol-options'
import YesNoBlock from './yes-no-block'

const ALCOHOL_DESCRIPTION = (
  <span>
    Do you drink{' '}
    <span className="rounded-3 bg-gray-3 px-1.5 py-[1px]">&gt;4</span> alcoholic
    drinks/day or{' '}
    <span className="rounded-3 bg-gray-3 px-1.5 py-[1px]">&gt;14</span>{' '}
    alcoholic drinks/week?
  </span>
)

const AlcoholBlock = () => {
  return (
    <Box>
      <Text size="3" weight="bold">
        Drug/Alcohol:
      </Text>
      <Flex justify={'center'} align={'start'} direction={'column'} mt={'2'}>
        <FormFieldLabel required className="pb-1.5">
          Alcohol
        </FormFieldLabel>
        <Text>{ALCOHOL_DESCRIPTION}</Text>
        <YesNoBlock />
      </Flex>

      <Flex justify={'center'} align={'start'} direction={'column'} mt={'2'}>
        <FormFieldLabel required className="pb-1.5">
          Drugs
        </FormFieldLabel>
        <Text>
          In the past 6 months, have you used a recreational drug or used a
          prescription medication for nonmedical reasons?
        </Text>
        <YesNoBlock />
      </Flex>
      <AlcoholOptions />
    </Box>
  )
}

export default AlcoholBlock
