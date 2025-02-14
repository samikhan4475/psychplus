'use client'

import { useEffect } from 'react'
import { useFormContext } from 'react-hook-form'
import { AddressFieldsGroup } from '@/components'
import { FormFieldContainer, FormFieldLabel } from '@/components/form'
import { SchemaType } from './schema'

const AddressFields = () => {
  const form = useFormContext<SchemaType>()

  useEffect(() => {
    if (form.getValues('isMailingAddressSameAsHome') === 'yes') {
      form.setValue('mailing.street2', form.getValues('address2'), {
        shouldDirty: true,
      })
    }
  }, [form.watch('address2')])

  return (
    <FormFieldContainer className="flex-1 gap-0 pt-2">
      <FormFieldLabel className="pb-2 text-[14px]">Home Address</FormFieldLabel>
      <AddressFieldsGroup columnsPerRow="2" className="flex" required />
    </FormFieldContainer>
  )
}

export { AddressFields }
