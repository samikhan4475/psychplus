import React from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider, useForm } from 'react-hook-form'
import MedicalOptions from './blocks/medical-options'
import { medicalSchema, MedicalSchemaType } from './medical-schema'

const Medical = () => {
  const form = useForm<MedicalSchemaType>({
    resolver: zodResolver(medicalSchema),
    reValidateMode: 'onChange',
  })

  return (
    <FormProvider {...form}>
      <MedicalOptions />
    </FormProvider>
  )
}

export default Medical
