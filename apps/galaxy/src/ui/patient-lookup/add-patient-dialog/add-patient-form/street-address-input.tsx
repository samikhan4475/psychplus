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
      label="Address 1"
      labelClassName="!text-1"
      address2FieldName="contactInfo.addresses.0.street2"
      zipFieldName="contactInfo.addresses.0.postalCode"
      placeholder="Address 1"
      prefix="contactInfo.addresses.0"
    />
  )
}

export { StreetAddressInput }
