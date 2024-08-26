interface ManagementLocationsDialogProps {
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

export type {
  ManagementLocationsDialogProps,
  AddressForm,
  PlacesAutocompleteProps,
}
