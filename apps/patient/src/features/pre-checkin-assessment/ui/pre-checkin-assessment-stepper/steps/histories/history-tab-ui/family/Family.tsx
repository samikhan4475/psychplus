import React from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { Flex } from '@radix-ui/themes'
import { FormProvider, useForm } from 'react-hook-form'
import FamilyOptions from './blocks/family-options'
import { familySchema, FamilySchemaType } from './family-schema'

const Family = () => {
  const form = useForm<FamilySchemaType>({
    resolver: zodResolver(familySchema),
    reValidateMode: 'onChange',
  })

  return (
    <FormProvider {...form}>
      <Flex gap="2" wrap="wrap">
        <FamilyOptions />
      </Flex>
    </FormProvider>
  )
}

export default Family
