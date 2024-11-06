'use client'

import { GooglePlacesAutocomplete } from '@/components/address-fields-group/address-autocomplete'
import { useGooglePlacesContext } from '@/providers/google-places-provider'

const StreetAddressInput = () => {
  const { loaded } = useGooglePlacesContext()
  if (!loaded) {
    return null
  }
  return (
    <GooglePlacesAutocomplete
      name="street1"
      label="Street Address"
      labelClassName="!text-1"
      address2FieldName="contactInfo.addresses.0.street2"
      zipFieldName="contactInfo.addresses.0.postalCode"
      placeholder="Street address"
      prefix="contactInfo.addresses.0"
    />
  )
}

export { StreetAddressInput }
