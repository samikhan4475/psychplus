'use client'

import { Flex } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { YesNoSelect } from '@/components'
import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
} from '@/components/form'
import { SchemaType } from './receiver-form'

const SupportMultipleDirectoriesField = () => {
  const form = useFormContext<SchemaType>()

  if (form.watch('isSupportMultipleDirectory') === 'yes') {
    const submissionDirectory = form.getValues('submissionDirectory')
    const fieldsToUpdate: Array<keyof SchemaType> = [
      'batchResponseDirectory',
      'chResponseDirectory',
      'claimResponseDirectory',
      'eraResponseDirectory',
    ]

    fieldsToUpdate.forEach((field) =>
      form.setValue(`${field}`, submissionDirectory),
    )
  }

  return (
    <FormFieldContainer className="flex-1 gap-0">
      <FormFieldLabel>Support Multiple Directories</FormFieldLabel>
      <YesNoSelect field="isSupportMultipleDirectory" className="" />
      <FormFieldError name="website" />
    </FormFieldContainer>
  )
}

export { SupportMultipleDirectoriesField }
