interface EditManagementLocationProps {
  googleApiKey: string
}
interface AddressForm {
  street1?: string
  street2?: string
  street?: string
  streetNumber?: string
  city?: string
  state?: string
  postalCode?: string
  country?: string
  address2?: string
  zip?: string
}

interface PlacesAutocompleteProps {
  name: string
  autoFocus?: boolean
  required?: boolean
  disabled?: boolean
  label?: string
  callbackAddress?: (address: AddressForm | undefined) => void
  isFilter?: boolean
}

interface Location {
  id: string
  locationType: string
  locationName: string
  npi: string
  taxonomy: string
  p_address_1: string
  p_address_2: string
  city: string
  state: string
  zip: string
  phone: string
  fax: string
  status: string
}

export type {
  EditManagementLocationProps,
  AddressForm,
  PlacesAutocompleteProps,
  Location,
}
