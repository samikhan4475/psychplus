import { Dispatch, HTMLProps, ReactNode, SetStateAction } from 'react'
import { Row } from '@tanstack/react-table'
import { CodeSetType } from '@psychplus/codeset'
import { PatientTypes } from '@psychplus/lab-orders/types'
import { ToastData } from '@/providers'

interface UseDiagnosticDataParams {
  appointmentId: string
  orderId?: string | null
  patientId?: string | null
  setSelectedDiagnostics: Dispatch<SetStateAction<Diagnostic[]>>
  isEdit: boolean
}
interface LabTest {
  id?: string | null
  metadata?: Metadata
  labId?: string
  patientId?: number | string
  appointmentId?: number | string
  orderStatus?: string
  orderingStaffId?: number
  locationId?: number | string
  papIndicator?: string
  temperatureType?: string
  recordStatus?: string
  activeStatus?: string
  newTest?: boolean
  labTestId?: string
  orderId?: string | null
  labTestCode?: string
  labTestCodeType?: string
  labAssignedCode?: string
  testCode?: string
  checked?: boolean
  disabled?: boolean
  labTestDescription?: string
  testName?: string
  askAtOrderEntries?: Questions[]
  labTestAnswers?: labTestAnswers[]
}
interface Questions {
  id?: string
  metadata?: Metadata
  testCode?: string
  questionCode?: string
  questionText?: string
  controlType?: string
  testName?: string
  entryAnswer?: string
  contentDescription?: string
  isMandatory?: boolean
  answerLength?: number
  options?: string[]
  recordStatus?: string
  answerOptions?: string[]
}
interface UseLabOrderFormParams {
  appointmentId: string
  isEdit: boolean
  patientId: string
  orderId?: string
  labOrderData: LabOrder[]
  testsData?: LabTest[]
  toast: (data: ToastData) => void
}

interface LabResult {
  id?: string
  metadata?: Metadata
  labTestId?: string
  orderId?: string
  observationTime?: string
  resultCode?: string
  resultValue?: string
  resultValueUnit?: string
  recomendedValue?: string
  statusCode?: string
  abnormalRangeCode?: string
  physicianComments?: string
  externalResultId?: string
  labComments?: string
  resultValueType?: string
  valueDescription?: string
  recordStatus?: string
}

interface Order {
  id?: string
  metadata: Metadata
  labId: string
  locationId?: string | number
  patientId: number
  appointmentId: number
  orderStatus: string
  orderingStaffName: string
  labOrderNumber: number
  orderingStaffId: number
  billType: string
  isFasting: boolean
  isLabDraw: boolean
  orderType: string
  orderSendStatus: boolean
  orderSentDateTime: string
  isPscHold: boolean
  isTest: boolean
  labTests: LabTest[]
  labResults: LabResult[]
  recordStatus: string
  orderingLab?: {
    name: string
    locationName: string
    locationId: string
  }
}

interface OrderPayload {
  idList: string[]
  labIds: string[]
  appointmentIds: number[]
  orderCreatedDate: string
  orderingStaffId?: number
  orderStatus: string
  resourceStatusList: string[]
}

interface LabOrder {
  id?: string | null
  labOrderNumber?: number
  metadata?: Metadata
  labId?: string
  labTestCode?: string
  papIndicator?: string
  temperatureType?: string
  testCode?: string
  newTest?: boolean
  testName?: string
  labTestId?: string
  checked?: boolean
  disabled?: boolean
  patientId?: number | string
  appointmentId?: number | string
  orderStatus?: string
  orderingStaffId?: number
  orderingStaffName?: string
  billType?: string
  isFasting?: boolean
  isLabDraw?: boolean
  orderType?: string
  orderSendStatus?: boolean
  orderSentDateTime?: string
  isPscHold?: boolean
  isTest?: boolean
  labOrderDate?: string
  labNotes?: string
  orderingLab?: {
    id?: string
    metadata?: Metadata
    recordStatus?: string
    name?: string
    locationName?: string
    locationId?: string
    consolidatorId?: string
    labGroupId?: string
    contactDetails?: ContactDetails
    isTest?: boolean
  }
  labTests?: LabTest[]
  labResults?: LabResult[]
  patient?: Patient
  appointment?: Appointment
  recordStatus?: string
  labDocuments?: LabDocument[]
  askAtOrderEntries?: Questions[]
  labTestAnswers?: labTestAnswers[]
}
interface labTestAnswers {
  id?: string
  metadata?: Metadata
  labTestId?: string
  questionCode?: string
  questionText?: string
  entryAnswer?: string
  resourceStatus?: string
}

interface LegalName {
  firstName: string
  lastName: string
}

interface Address1 {
  type?: string
  street1?: string
  street2?: string
  city?: string
  state?: string
  country?: string
  postalCode?: string
}

interface ContactDetails {
  email?: string
  addresses?: Address1[]
  isMailingAddressSameAsPrimary?: boolean
}

interface Metadata {
  createdOn?: string
  createdBy?: number
  createdByFullName?: string
  updatedOn?: string
  updatedBy?: number
  updatedByFullName?: string
  deletedOn?: string
  deletedBy?: number
  deletedByFullName?: string
}

interface Diagnoses {
  id: number
  metadata: Metadata
  disabled?: boolean
  checked?: boolean
  orderId?: string
  diagnosisCode?: string
  diagnosisDescription?: string
  code?: string
  description?: string
  symptomCode?: string
  recordStatus?: 'Active' | 'Inactive' | 'Pending'
}

type LabOrderFormState = {
  date: Date | undefined
  Time: Date | undefined
  LabBilling: string
  status: string
  specimenType: string
  labOrderStatus: string
  specimenCollectionMethod: string
  specimenRole: string
  specimentAdditive: string
  fasting: boolean
  state: boolean
  labDraw: boolean
  selectedTests: LabTest[]
  selectedDiagnostics: Diagnostic[]
}
type DropdownTypes = { label: string; value: string }

type Diagnostic = {
  id?: number
  metadata?: object
  newDignoses?: boolean
  isActive?: boolean
  symptomCode?: string
  description?: string
  activeStatus?: string
  symptomCodeDescription?: string
  diagnosisDescription?: string
  diagnosisCode?: string
  code?: string
  checked?: boolean
  disabled?: boolean
  recordStatus?: string
  temperatureType?: string
  papIndicator?: string
}

interface PhoneNumber {
  type: string
  number: string
  extension?: string
  comment?: string
}

interface Address {
  type: string
  street1: string
  street2?: string
  city: string
  state: string
  country: string
  postalCode: string
  geoCoordinates?: {
    longitude: number
    latitude: number
    altitude?: number
  }
}

interface LegalName {
  firstName: string
  middleName?: string
  lastName: string
  preferredName?: string
  title?: string
  suffix?: string
  honors?: string
}

interface ContactInfo {
  email: string
  emailVerificationStatus: string
  phoneNumbers: PhoneNumber[]
  addresses: Address[]
  isMailingAddressSameAsPrimary: boolean
}

interface Person {
  id: number
  metadata: Metadata
  isTest: boolean
  legalName: LegalName
  staffRoleCode: string
  contactInfo: ContactInfo
  spokenLanguages: string[]
  virtualRoomLink: string
  bio: string
  hasPhoto: boolean
}

type TestCompProps = {
  text?: string
  checked: boolean | undefined
  onToggle: () => void
}

interface DiagnosticInterface {
  isEdit: boolean
  setSelectedDiagnostics: React.Dispatch<React.SetStateAction<Diagnostic[]>>
  selectedDiagnostics: Diagnostic[]
  patientId: string | null
  appointmentId: string
  toast: (data: ToastData) => void

  orderId?: string | null
}

interface LabTestInterface {
  setSelectedTests: React.Dispatch<React.SetStateAction<LabTest[]>>
  selectedTests: LabTest[]
  uniqueTestData: LabTest[]
  isEdit: boolean
  appointmentId: string
  orderId?: string | null
  toast: (data: ToastData) => void
}

interface CustomMultiSelectInterface {
  defaultSelected: LabTest[] | Diagnostic[]
  label: string
  code: string
  code1: string
  optionKey: string
  handleRemoveOption: (e: any) => void
  className?: string
}

interface IndeterminateCheckboxProps extends HTMLProps<HTMLInputElement> {
  indeterminate?: boolean
  isHeaderCheckBox?: boolean
  checked?: boolean
  disabled?: boolean
  onClick?: (e: any) => void
}
interface CheckBoxType {
  checked: string
  label: string
  onChange: React.Dispatch<React.SetStateAction<string>>
}

interface SpecimenModalProps {
  active: boolean
  handlerClose: () => void
  labTest?: LabOrder | null
}

interface LabOrderFormModalProps {
  active: boolean
  isEdit?: boolean
  labBillingType: CodeSetType[]
  labOrderStatus: CodeSetType[]
  handlerClose: () => void
  labTestId?: string
  labOrderData: LabOrder[]
  testsData?: LabTest[]
  appointmentId: string
  orderId?: string
  patientId: string
}
interface PdfModalProps {
  active: boolean
  handlerClose: (e: any) => void
  pdfTypeUrl: PdfTypeUrl
}
interface PdfTypeUrl {
  url: string
  type: string
}
interface LabTestDetails {
  labTestId: string
  type: string
  labTest?: LabOrder | null
}
interface LabDocument {
  id?: string
  metadata?: Metadata
  orderId?: string
  documentType?: string
  documentUrl: string
  documentName?: string
  recordStatus?: string
}

export enum LabOrderStatus {
  Completed = 'Completed',
  Pending = 'Pending',
  Cancelled = 'Cancelled',
  OnHold = 'OnHold',
}
export enum LabOrderPdf {
  resultsPdf = 'ResultsPdf',
  requisitionPdf = 'RequisitionPdf',
}
export const displayStatuses: { [key in LabOrderStatus]: string } = {
  [LabOrderStatus.Completed]: 'Completed',
  [LabOrderStatus.Pending]: 'Pending',
  [LabOrderStatus.Cancelled]: 'Cancelled',
  [LabOrderStatus.OnHold]: 'On Hold',
}
interface DropdownProps {
  initialValue?: string
  placeholder?: string
  className?: string
  inputClass?: string
  liClass?: string
  keyName?: string
  disabled?: boolean
  defaultData?: any
  fetchResults?: (query: string) => Promise<any>
  onChange?: (item: any) => void
}
interface AccordionProps {
  children: ReactNode
}

interface AccordionSummaryProps {
  children: ReactNode
  onClick: () => void
  handlerDelete?: () => void
  isOpen: boolean
  sno: number
}

interface AccordionDetailsProps {
  children: ReactNode
  isOpen: boolean
}

interface CustomAccordionProps {
  title: string
  type: string
  children: ReactNode
  handlerDelete?: () => void
  sno: number
  isNew?: boolean
}

interface DataTableRowActionsProps {
  data: Row<LabOrder>
  setSelectedLabTestDetails: React.Dispatch<
    React.SetStateAction<LabTestDetails>
  >
}
export enum MenuItemType {
  SpecimenLabelPrint = 'Specimen Label Print',
  RequisitionPrint = 'Requisition Print',
  Delete = 'Delete',
  ResultPreview = 'Result preview',
}
interface LabOrderFormProps {
  isProfileScreen?: boolean
  isEdit?: boolean
  labBillingType: CodeSetType[]
  labOrderStatus: CodeSetType[]
  labOrderData: LabOrder[]
  testsData?: LabTest[]
  labTestId?: string
  patientId: string
  appointmentId: string
  orderId?: string
}
interface RowDelete {
  isOpen: boolean
  closeDialog: () => void
  deleteHandler: () => void
  handlerCanceled?: () => void
}

interface DataItem {
  id: string
  metadata: Metadata
  recordStatus: string
  name: string
  locationName: string
  locationId: string
  consolidatorId: string
  labGroupId: string
  contactDetails: ContactInfo
  isTest: boolean
}
interface SearchDropdownTypes {
  code: string
  displayName: string
}
interface PayloadTypes {
  id?: string
  patientId?: string
  appointmentId?: string
  orderStatus?: string
  billType?: string
  labOrderNumber?: string
  orderingStaffName?: string
  labOrderDate?: string
  OrderingStaffId?: number
  labId?: string
  isFasting?: boolean
  IsTest?: boolean
  locationId?: number
  orderingLab: {
    id: string
    metadata: Metadata
    recordStatus: string
    name: string
    locationName: string
    locationId: string
    consolidatorId: string
    labGroupId: string
    contactDetails: ContactDetails
    isTest: boolean
  }
}
interface Lab {
  id: string
  metadata: Metadata
  recordStatus: 'Active' | 'Inactive' // Assuming record status can be either "Active" or "Inactive"
  name: string
  locationId: string
  consolidatorId: string
  labGroupId: string
  contactDetails: {
    // Assuming contact details can be any structure or possibly empty
    [key: string]: any
  }
  isTest: boolean
}

interface Patient {
  id?: number
  metadata?: Metadata
  verificationStatus?: string
  userId?: number
  legalName?: {
    firstName?: string
    lastName?: string
  }
  birthdate?: string
  gender?: string
  socialSecurityNumber?: string
  medicalRecordNumber?: string
  language?: string // Assuming language can be any string value
  preferredLanguage?: string // Assuming preferred language can be any string value
  chargeUserId?: string
  isPlusMember?: boolean
  hasPhoto?: boolean
  contactDetails?: {
    email?: string
    addresses?: {
      type?: string
      street1?: string
      street2?: string
      city?: string
      state?: string
      country?: string
      postalCode?: string
    }[]
    isMailingAddressSameAsPrimary?: boolean
  }
  alternateOrPreviousContactDetails?: {
    [key: string]: any
  }
  status?: string
  hasGuardian?: boolean
}

interface Appointment {
  id?: number
  status?: string // Assuming status can be any string value
  type?: string // Assuming type can be any string value
  encounterNumber?: string
  encounterTypeCode?: number // Assuming encounter type code is a number
  specialistTypeCode?: number // Assuming specialist type code is a number
  physicianStaffId?: number
  startDate?: string // Assuming start date is a string representation of date
  endDate?: string // Assuming end date is a string representation of date
  duration?: number
  coPay?: number
  isCopayPaid?: boolean
}
interface MergePatientsProps {
  data: PatientTypes[]
  searchTerm: string
  onSearchChange: (term: string) => void
  onRowSelect: (patient: PatientTypes) => void
  showCreatePatientButton?: boolean
  selectedRow: any
}
export type {
  MergePatientsProps,
  SearchDropdownTypes,
  PayloadTypes,
  DataItem,
  RowDelete,
  LabOrderFormProps,
  DataTableRowActionsProps,
  LabOrderFormModalProps,
  AccordionProps,
  AccordionSummaryProps,
  AccordionDetailsProps,
  UseDiagnosticDataParams,
  DropdownProps,
  PdfModalProps,
  LabTestDetails,
  PdfTypeUrl,
  LabDocument,
  CustomAccordionProps,
  UseLabOrderFormParams,
  SpecimenModalProps,
  CheckBoxType,
  IndeterminateCheckboxProps,
  CustomMultiSelectInterface,
  LabTestInterface,
  DiagnosticInterface,
  TestCompProps,
  OrderPayload,
  Person,
  Order,
  LabTest,
  LabResult,
  LabOrder,
  LabOrderFormState,
  Diagnostic,
  DropdownTypes,
  Diagnoses,
}
