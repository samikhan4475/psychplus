import { UseFormReturn } from 'react-hook-form'
import { SchemaType } from './components/clearing-house-receiver-form'

interface ClearingHouseReceiver {
  id: string
  clearingHouseName: string
  receiverId: string
  receiverName: string
  phone: string
  fax: string
  email: string
  website: string
  submissionMethod: string
  submissionUrl: string
  submissionPort: number
  submissionDirectory: string
  batchResponseDirectory: string
  chResponseDirectory: string
  claimResponseDirectory: string
  eraResponseDirectory: string
  isa01: string
  isa03: string
  isa05: string
  isa07: string
  isa08: string
  gs03: string
  nm140ReceiverName: string
  nm140ReceiverId: string
  address1: string
  address2: string
  city: string
  state: string
  zip: string
  recordStatus: string
}

interface StateOption {
  value: string
  label: string
}

interface AddressDetails {
  street: string
  city: string
  stateLongName: string
  stateShortName: string
  zipcode: string
  latitude: number | null
  longitude: number | null
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
  form?: UseFormReturn<SchemaType>
  callbackAddress?: (address: AddressForm | undefined) => void
  isFilter?: boolean
}

export type {
  ClearingHouseReceiver,
  StateOption,
  AddressDetails,
  AddressForm,
  PlacesAutocompleteProps,
}
