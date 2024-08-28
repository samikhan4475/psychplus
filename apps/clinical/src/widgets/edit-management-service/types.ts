interface EditManagmentComponentProps {
  googleApiKey: string
}

interface Address {
  address1: string
  address2: string
  city: string
  state: string
  zip: number
}

interface Reminders {
  provNotes: string
  ptVisit: string
}

interface Service {
  id: string
  locationType: string
  locationName: string
  service: string
  pos: number
  address: Address
  psychplusPolicy: string
  reminders: Reminders
  ehrCode: number
  cosignerType: string
  cosigner: string
  primaryProvider: string
  visitType: string
  status: string
}
interface VisitTypeDiagnosisData {
  visitType: string
  diagnosis: string
  units: string
  groups: string
  rooms: string
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
interface RadioButtonOption {
  value: string
  label: string
}

interface RadioButtonGroupProps {
  label: string
  name: string
  options: RadioButtonOption[]
}

interface ServiceFormProps {
  googleApiKey: string
}
export type {
  Service,
  EditManagmentComponentProps,
  VisitTypeDiagnosisData,
  PlacesAutocompleteProps,
  AddressForm,
  RadioButtonGroupProps,
  RadioButtonOption,
  ServiceFormProps,
}
