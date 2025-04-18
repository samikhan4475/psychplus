import React from 'react'
import { useFormContext } from 'react-hook-form'
import { FormFieldContainer, FormFieldLabel, RadioGroup } from '@/components'
import { SchemaType } from './schema'

const MailingRadioButton = () => {
  const { watch, setValue, resetField } = useFormContext<SchemaType>()
  const onValueChange = (val: string) => {
    const isMailingAddressSameAsPrimary = val === 'Yes'
    setValue(
      'contactInfo.isMailingAddressSameAsPrimary',
      isMailingAddressSameAsPrimary,
    )
    if (!isMailingAddressSameAsPrimary)
      resetField('mailingAddress', {
        defaultValue: {
          postalCode: '',
          type: 'Mailing',
          street1: '',
          street2: '',
          city: '',
          state: '',
          country: '',
          timeZoneId: '',
        },
      })
  }
  return (
    <FormFieldContainer className="flex-row bg-blue-2 px-2 py-1">
      <FormFieldLabel>Is your mailing address same as Home?</FormFieldLabel>
      <RadioGroup
        className="ml-2 border-none"
        field="isMailingAddressSameAsPrimary"
        defaultValue={
          watch('contactInfo.isMailingAddressSameAsPrimary') ? 'Yes' : 'No'
        }
        onValueChange={onValueChange}
        options={[
          { label: 'No', value: 'No' },
          { label: 'Yes', value: 'Yes' },
        ]}
      />
    </FormFieldContainer>
  )
}

export { MailingRadioButton }
