import { UseFormReturn } from "react-hook-form";
import { SubmitterFormSchema } from "../schema/submitterForm.schema";

interface SubmitterDropdownItem {
  value: string
  label: string
}

interface SubmitterListColumn {
  id: string;
  title: string;
  rowName: string;
  editable: boolean
  type: string;
  enableHiding: boolean,
  dropdownValues?: SubmitterDropdownItem[];
  text: (text: string) => string;
}

interface SubmitterList {
  tablePageSize: number;
  manualPagination: boolean;
  columns: SubmitterListColumn[];
}

interface SubmitterItem {
  name?: string;
  username?: string;
  email?: string;
  password?: string;
  submitterId?: string;
  contactPerson?: string;
  phone?: string;
  fax?: string;
  addressLine1?: string;
  addressLine2?: string;
  city?: string;
  state?: string;
  zip?: string;
  id?: string;
}

interface PracticeList {
  id: string,
  name: string
}

interface ReceiverItem {
  id: string,
  receiverName: string,
  city: string,
  state: string
}
interface CodeAttribute {
  name: string
  content: string
}
interface Code {
  code: string
  displayName: string
  groupingCode?: string
  codeAttributes?: CodeAttribute[]
}
interface RaceAndEthnicityCodeSet {
  codeSystemName: string
  displayName: string
  codes: Code[]
}
interface MetaDataCodeSet {
  code: string
  display: string
}

export enum SubmitterIconAction {
  edit = "Edit",
  delete = "Delete"
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
  form?: UseFormReturn<SubmitterFormSchema>
  callbackAddress?: (address: AddressForm | undefined) => void
  isFilter?: boolean
}

export type {
  SubmitterItem,
  SubmitterList,
  SubmitterListColumn,
  SubmitterDropdownItem,
  PracticeList,
  ReceiverItem,
  RaceAndEthnicityCodeSet,
  Code,
  MetaDataCodeSet,
  AddressForm,
  PlacesAutocompleteProps
}
