import { UseFormReturn } from "react-hook-form";
import { EdiFormSchema } from "../schema/ediForm.schema";

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
  receiverId: string,
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
  form?: UseFormReturn<EdiFormSchema>
  callbackAddress?: (address: AddressForm | undefined) => void
  isFilter?: boolean
}

interface EDIItem {
  id?: string;
  receiverName?: string;
  receiverId?: string;
  insurancePayerName?: string;
  insurancePlanId?: string;
  payerId?: string;
  isEligibility?: boolean;
  isElectronic?: boolean;
  isInstitutional?: boolean;
  isDental?: boolean;
  isPaperCms1500?: boolean;
  isPaperUb04?: boolean;
}
interface EDIListColumn {
  id: string;
  title: string;
  rowName: string;
  editable: boolean
  type: string;
  enableHiding: boolean,
  dropdownValues?: EDIDropdownItem[];
  text: (text: string) => string;
}
interface EDIDropdownItem {
  value: string
  label: string
}
interface EDIList {
  tablePageSize: number;
  manualPagination: boolean;
  columns: EDIListColumn[];
}
export enum EDIIconAction {
  edit = "Edit",
  delete = "Delete"
}

interface Metadata {
  createdOn: string;
  createdBy: number;
  createdByFullName: string;
  updatedOn: string;
  updatedBy: number;
  updatedByFullName: string;
  deletedOn: string | null;
  deletedBy: number | null;
  deletedByFullName: string | null;
}

interface Plan {
  id: string;
  metadata: Metadata;
  name: string;
  isActive: boolean;
  isTest: boolean;
  isPublicViewable: boolean;
  payerType: string;
  effectiveDate: string;
}

interface InsurancePayer {
  id: string;
  metadata: Metadata;
  name: string;
  plans: Plan[];
}
interface InsurancePayerOption {
  id: string
  fullName: string
}

interface InsurancePayerList {
  insurancePlanId: string
  insurancePayerName: string,
}

interface ReceiverList {
  receiverId: string
  receiverName: string,
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
  PlacesAutocompleteProps,
  EDIItem,
  EDIListColumn,
  EDIList,
  EDIDropdownItem,
  InsurancePayer,
  InsurancePayerOption,
  InsurancePayerList,
  ReceiverList
}
