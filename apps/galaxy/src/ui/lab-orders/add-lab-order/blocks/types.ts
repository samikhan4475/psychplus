interface LabTestAnswers {
  id?: string
  labTestId?: string
  questionCode?: string
  questionText?: string
  entryAnswer?: string
  resourceStatus?: string
}

interface TestLabsType {
  consolidatorId?: string
  cptCode?: string
  id?: string
  papIndicator?: string
  recordStatus?: string
  temperatureType?: string
  testCode?: string
  testName?: string
  orderId?: string
  labTestCode?: string
  labTestCodeType?: string
  labAssignedCode?: string
  isNewTestLab?: boolean
  labTestAnswers?: LabTestAnswers[]
  askAtOrderEntries?: Question[]
  labTestId?: string
}

interface DiagnosisType {
  id?: string | number
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

interface LabsLocation {
  id?: string
  recordStatus?: string
  name?: string
  locationId?: string
  consolidatorId?: string
  labGroupId?: string
  isTest?: string
}

interface AppointmentDetails {
  id?: number
  status?: string
  type?: string
  encounterNumber?: string
  encounterTypeCode?: string
  patientId?: string
  specialistTypeCode?: string
  locationId?: string
  locationName?: string
  serviceId?: string
  service?: string
  physicianStaffId?: string
  providerName?: string
  startDate?: string
  endDate?: string
  duration?: string
  coPay?: string
  isCopayPaid?: string
  isSelfPay?: string
  visitNoteTitle?: string
  visitType?: string
  visitTypeCode?: string
  visitSequence?: string
  providerType?: string
}

interface Option {
  id: string
  askAtOrderEntryId: string
  optionKey: string
  optionValue: string
}
interface Question {
  id?: string
  testCode?: string
  questionCode?: string
  questionText?: string
  controlType?: string
  testName?: string
  entryAnswer?: string
  contentDescription?: string
  isMandatory?: boolean
  answerLength?: number
  options?: Option[]
  recordStatus?: string
  answerOptions?: string[]
}

interface LabOrder {
  id?: string | null
  labOrderNumber?: number

  labTestId?: string
  labId?: string
  testName?: string
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
    recordStatus?: string
    name?: string
    locationName?: string
    locationId?: string
    consolidatorId?: string
    labGroupId?: string
    isTest?: boolean
  }
  labTests?: TestLabsType[]
  recordStatus?: string
}

interface SpecimenData {
  id?: string
  newSpecimen?: boolean
  SiteMode?: string
  labSpecimen?: string
  TestId?: string
  StartDate: string
  StartTime: string
  EndDate: string
  EndTime: string
  recordStatus?: string
  orderId?: string
  collectionMethod?: string
  collectedOn?: string
  specimenType?: string
  specimenAdditives?: string
  collectionReceivedDateTime?: string
  volume?: number | string
  measureUnit?: string
  rejectReason?: string
  sourceSite?: string
  sourceSiteModifier?: string
  role?: string
  containerCondition?: string
  labTests?: TestLabsType[]
}

enum ControlType {
  OptionSelect = 'OptionSelect',
  FreeText = 'FreeText',
}

enum LabOrderStatusEnum {
  Unsigned = 'Unsigned',
  Signed = 'Signed',
  SignedNotSent = 'SignedNotSent',
  SignedSent = 'SignedSent',
  ResultReceived = 'ResultReceived',
}

const RecurrenceTypeOptions = [
  { label: 'Daily', value: 'Daily' },
  { label: 'Weekly', value: 'Weekly' },
  { label: 'Monthly', value: 'Monthly' },
  { label: 'Every 3 months', value: 'ThreeMonths' },
  { label: 'Every 6 months', value: 'SixMonths' },
]
export {
  type TestLabsType,
  type DiagnosisType,
  type LabsLocation,
  type AppointmentDetails,
  type Question,
  type Option,
  type LabTestAnswers,
  type LabOrder,
  type SpecimenData,
  ControlType,
  LabOrderStatusEnum,
  RecurrenceTypeOptions,
}
