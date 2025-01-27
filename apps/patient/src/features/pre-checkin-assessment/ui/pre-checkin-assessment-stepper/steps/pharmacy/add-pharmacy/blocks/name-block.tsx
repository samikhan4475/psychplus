import React from 'react'
import { useFormContext } from 'react-hook-form'
import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
  SearchSelectInput,
} from '@/components-v2'
import { getPlaceholder } from '@/features/account/profile/utils'
import { getPharmaciesAction } from '@/features/pharmacy/actions/get-pharmacies'
import { Pharmacy } from '@/features/pharmacy/types'
import { PharmacySchemaType } from '../../pharmacy-schema'

const FIELD_ID = 'pharmacyName'

const NameBlock = () => {
  const form = useFormContext<PharmacySchemaType>()

  const formatText = (value: Pharmacy) => {
    let text = ''
    const parts = [
      value.name,
      value.contactDetails?.addresses?.[0]?.street1,
      value.contactDetails?.addresses?.[0]?.city,
      value.contactDetails?.addresses?.[0]?.state,
    ]
    text = parts.filter(Boolean).join(', ')

    return text
  }

  return (
    <FormFieldContainer className="w-1/3">
      <FormFieldLabel required>Pharmacy Name</FormFieldLabel>
      <SearchSelectInput
        fieldName={FIELD_ID}
        placeholder="Search by name"
        triggerPlaceholder={getPlaceholder(FIELD_ID)}
        fetchResults={(name: string) =>
          getPharmaciesAction({ payload: { organizationName: name } })
        }
        formatText={formatText}
        required
        onChange={(value: Pharmacy) => {
          const address = value.contactDetails?.addresses?.[0]?.street1 ?? ''
          const city = value?.contactDetails?.addresses?.[0]?.city ?? ''
          const state = value?.contactDetails?.addresses?.[0]?.state ?? ''
          const postalCode =
            value?.contactDetails?.addresses?.[0]?.postalCode ?? ''
          const phoneNumber =
            value?.contactDetails?.phoneNumbers?.[0]?.number ?? ''

          if (address) form.setValue('address', address)
          if (city) form.setValue('city', city)
          if (state) form.setValue('state', state)
          if (postalCode) form.setValue('zipCode', postalCode)
          if (phoneNumber) form.setValue('phoneNumber', phoneNumber)
          form.setValue(FIELD_ID, value.name ?? '')
          form.setValue('id', value.id ?? '')
          form.trigger()
        }}
        className="max-w-36"
      />
      <FormFieldError name={FIELD_ID} />
    </FormFieldContainer>
  )
}

export { NameBlock }
