import React from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { Flex } from '@radix-ui/themes'
import { FormProvider, useForm } from 'react-hook-form'
import PastConditions from './blocks/past-conditions'
import PastInputContainer from './blocks/past-input-container'
import { pastPsychSchema, PastPsychSchemaType } from './past-psychiatry-schema'

const PastPsychiatry = () => {
  const form = useForm<PastPsychSchemaType>({
    resolver: zodResolver(pastPsychSchema),
    reValidateMode: 'onChange',
  })

  return (
    <FormProvider {...form}>
      <Flex className="w-full" gap="3" mb="4">
        <PastInputContainer />
      </Flex>
      <Flex gap="2" wrap="wrap">
        <PastConditions />
      </Flex>
    </FormProvider>
  )
}

export default PastPsychiatry
