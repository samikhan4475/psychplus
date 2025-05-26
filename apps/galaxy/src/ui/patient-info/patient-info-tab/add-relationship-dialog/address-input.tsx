'use client'

import { FormFieldContainer, GooglePlacesAutocomplete } from '@/components'

const AddressInput = () => {
  return (
    <FormFieldContainer className="w-full">
      <GooglePlacesAutocomplete
        required={true}
        name="street1"
        label="Address"
        zipFieldName="contactDetails.addresses.0.postalCode"
        address2FieldName="street2"
        placeholder="Enter Address"
        prefix="contactDetails.addresses.0"
        labelClassName="!text-1"
      />
    </FormFieldContainer>
  )
}

export { AddressInput }
