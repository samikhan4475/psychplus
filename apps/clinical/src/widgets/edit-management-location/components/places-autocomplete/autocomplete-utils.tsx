'use client'

import { FieldValues } from 'react-hook-form'
import { type DetailsResult } from 'use-places-autocomplete'
import { AddressForm } from '../../types'

const getInitialAutocompleteValues = (address: FieldValues) => {
  if (
    !address.street1 ||
    !address.city ||
    !address.state ||
    !address.postalCode
  ) {
    return undefined
  }

  return `${address.street1}, ${address.city}, ${address.state} ${address.postalCode}`
}

const getAddressFromPlacesResults = (
  result: Awaited<DetailsResult>,
): AddressForm | undefined => {
  if (
    !result ||
    typeof result === 'string' ||
    !Array.isArray(result.address_components)
  ) {
    return
  }

  let street1: string | undefined
  let street: string | undefined
  let streetNumber: string | undefined
  let city: string | undefined
  let state: string | undefined
  let postalCode: string | undefined
  let country: string | undefined

  for (const component of result.address_components) {
    if (component && Array.isArray(component.types)) {
      for (const t of component.types) {
        switch (t) {
          case 'postal_code':
            postalCode ||= component.long_name || component.short_name
            break

          case 'country':
            country ||= component.long_name || component.short_name
            break

          case 'administrative_area_level_1':
            state ||= component.long_name || component.short_name
            break

          case 'locality':
            city ||= component.long_name || component.short_name
            break

          case 'street_number':
            streetNumber ||= component.long_name || component.short_name
            break

          case 'route':
            street ||= component.short_name || component.long_name
            break
        }
      }
    }
  }

  if (street && streetNumber) {
    street1 = `${streetNumber} ${street}`
  }

  return {
    street1,
    street,
    streetNumber,
    city,
    state,
    postalCode,
    country,
  }
}

export { getInitialAutocompleteValues, getAddressFromPlacesResults }
