
interface Address {
  type?: string; // Adjust based on actual types used
  street1?: string;
  street2?: string;
  city?: string;
  state?: string;
  country?: string;
  postalCode?: string;
  geoCoordinates?: GeoCoordinates;
  timeZoneId?: string;
}

interface GeoCoordinates {
  longitude?: number;
  latitude?: number;
  altitude?: number;
}

interface LabOrder {
  id?: string | null;
  labOrderNumber?: number;
  metadata?: Metadata;
  labTestId?: string
  labId?: string;
  testName?: string;
  patientId?: number | string;
  appointmentId?: number | string;
  orderStatus?: string;
  orderingStaffId?: number;
  orderingStaffName?: string;
  billType?: string;
  isFasting?: boolean;
  isLabDraw?: boolean;
  orderType?: string;
  orderSendStatus?: boolean;
  orderSentDateTime?: string;
  isPscHold?: boolean;
  isTest?: boolean;
  labOrderDate?: string;
  labNotes?: string;
  orderingLab?: {
    id?: string;
    metadata?: Metadata;
    recordStatus?: string;
    name?: string;
    locationName?: string;
    locationId?: string;
    consolidatorId?: string;
    labGroupId?: string;
    contactDetails?: ContactDetails;
    isTest?: boolean;
  };
  labTests?: LabTest[];
  labResults?: LabResult[];
  patient?: Patient;
  appointment?: Appointment;
  recordStatus?: string;
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
  labTestAnswers?: labTestAnswers[]
  askAtOrderEntries?: Questions[]
}
interface Questions {
  id?: string
  metadata?: Metadata
  testCode?: string
  questionCode?: string
  questionText?: string
  controlType?: string
  testName?: string
  contentDescription?: string
  isMandatory?: boolean
  answerLength?: number
  options?: string[]
  recordStatus?: string
  answerOptions?: string[]
}
interface labTestAnswers {
  "id"?: string
  "metadata"?: Metadata
  "labTestId"?: string
  "questionCode"?: string
  "questionText"?: string
  "entryAnswer"?: string
  "resourceStatus"?: string
}
interface LabResult {
  id: string;
  metadata: Metadata;
  labTestId: string;
  orderId: string;
  observationTime: string;
  resultCode: string;
  resultValue: string;
  resultValueUnit: string;
  recomendedValue: string;
  statusCode: string;
  abnormalRangeCode: string;
  physicianComments: string;
  externalResultId: string;
  labComments: string;
  resultValueType: 'FreeText' | 'Other'; // Adjust as needed
  valueDescription: string;
  recordStatus: string;
}

interface Patient {
  id: number;
  metadata: Metadata;
  verificationStatus: 'Verified' | 'NotVerified'; // Adjust as needed
  userId: number;
  legalName: {
    firstName: string;
    middleName: string;
    lastName: string;
    preferredName: string;
    title: string;
    suffix: string;
    honors: string;
  };
  birthdate: string;
  gender: string;
  genderOrientation: string;
  genderExpression: string;
  genderPronoun: string;
  driversLicense: {
    type: 'DriversLicense';
    number: string;
    issuedDate: string;
    expirationDate: string;
    issuedBy: string;
    validIn: string;
    hasFrontImage: boolean;
    hasBackImage: boolean;
  };
  socialSecurityNumber: string;
  medicalRecordNumber: string;
  language: string;
  preferredLanguage: string;
  chargeKey: string;
  chargeUserId: string;
  isPlusMember: boolean;
  isTest: boolean;
  hasPhoto: boolean;
  guardian: {
    name: {
      firstName: string;
      middleName: string;
      lastName: string;
      preferredName: string;
      title: string;
      suffix: string;
      honors: string;
    };
    isEmergencyContact: boolean;
    relationship: string;
    contact: ContactDetails;
  };
  contactDetails: ContactDetails;
  emergencyContact: {
    name: {
      firstName: string;
      middleName: string;
      lastName: string;
      preferredName: string;
      title: string;
      suffix: string;
      honors: string;
    };
    relationship: string;
    contact: ContactDetails;
  };
  cmdId: string;
  motherMaidenName: string;
  alternateOrPreviousName: {
    firstName: string;
    middleName: string;
    lastName: string;
    preferredName: string;
    title: string;
    suffix: string;
    honors: string;
  };
  alternateOrPreviousContactDetails: ContactDetails;
  languageAbility: string;
  languageProficiency: string;
  religion: string;
  status: string;
  hasGuardian: boolean;
  races: string[];
  ethnicities: string[];
}

interface Appointment {
  id: number;
  metadata: Metadata;
  status: string;
  type: string;
  encounterNumber: string;
  encounterTypeCode: number;
  clinic: {
    id: string;
    metadata: Metadata;
    isTest: boolean;
    name: string;
    group: string;
    description: string;
    npi: string;
    contact: ContactDetails;
    taxonomy: {
      code: string;
      display: string;
      metadata: Metadata;
      attributes: {
        name: string;
        value: string;
      }[];
    }[];
    distanceInMiles: number;
  };
  specialist: {
    id: number;
    metadata: Metadata;
    isTest: boolean;
    legalName: {
      firstName: string;
      middleName: string;
      lastName: string;
      preferredName: string;
      title: string;
      suffix: string;
      honors: string;
    };
    staffRoleCode: string;
    contactInfo: ContactDetails;
    spokenLanguages: string[];
    virtualRoomLink: string;
    bio: string;
    hasPhoto: boolean;
    rating: number;
  };
  specialistTypeCode: number;
  physicianStaffId: number;
  physicianName: string;
  startDate: string;
  endDate: string;
  duration: number;
  coPay: number;
  virtualRoomLink: string;
  isCopayPaid: boolean;
}
interface LabOrders {
  "idList"?: string[],
  "labIds"?: string[],
  appointmentIds?: number[],
  patientId?: number[],
  "orderCreatedDate"?: string,
  "orderingStafId"?: string,
  "orderStatus"?: string,
  "resourceStatusList"?: string[]
}
interface LabResultPayload {
  "idList"?: string[],
  "orderId"?: string | null,
  "appointmentId"?: string | null,
  "patientId"?: string | null,
}
interface LabSearchPayload {
  idList?: string[],
  consolidatorIds?: string[],
  resourceStatusList?: string[],
  testCodes?: string[],
  testNames?: string[],
}



interface LabRecord {
  id?: string | null;
  locationId?: string;
  metadata?: Metadata;
  labId?: string;
  patientId?: number | string;
  appointmentId?: number | string;
  orderStatus?: string;
  orderingStaffId?: number;
  billType?: string;
  isFasting?: boolean;
  isLabDraw?: boolean;
  orderType?: string;
  orderSendStatus?: boolean;
  orderSentDateTime?: string;
  isPscHold?: boolean;
  isTest?: boolean;
  labTests?: LabTest[];
  labResults?: LabResult[];
  recordStatus?: string;
}
interface OrderParams {
  appointmentId: string
  patientId: string
}
interface Metadata {
  createdOn?: string;
  createdBy?: number;
  createdByFullName?: string;
  updatedOn?: string;
  updatedBy?: number;
  updatedByFullName?: string;
  deletedOn?: string;
  deletedBy?: number;
  deletedByFullName?: string;
}



interface Problem {
  id: string;
  metadata: Metadata;
  recordStatus: string;
  problemDate: string;
  symptomCode: string;
  symptomCodesetUsed: string;
  isPrimary: boolean;
  chronicity: string;
  severity: string;
  activeStatus: string;
  resolvedDate: string;
  problemType: string;
  comments: string;
  patientId: number;
  noteId: number;
  dataSource: string;
  symptomCodeDescription: string;
}
interface Contact {
  email: string;
  emailVerificationStatus: string;
  phoneNumbers: {
    type: string;
    number: string;
    extension: string;
    comment: string;
  }[];
  addresses: {
    type: string;
    street1: string;
    street2: string;
    city: string;
    state: string;
    country: string;
    postalCode: string;
    geoCoordinates: {
      longitude: number;
      latitude: number;
      altitude: number;
      timeZoneId?: string
    };
  }[];
  isMailingAddressSameAsPrimary: boolean;
}


interface Clinic {
  id: string;
  metadata: Metadata;
  isTest: boolean;
  name: string;
  group: string;
  description: string;
  npi: string;
  contact: Contact;
  taxonomy: {
    code: string;
    display: string;
    metadata: Metadata;
    attributes: {
      name: string;
      value: string;
    }[];
  }[];
  distanceInMiles: number;
}

interface LegalName {
  firstName: string;
  middleName: string;
  lastName: string;
  preferredName: string;
  title: string;
  suffix: string;
  honors: string;
}

interface Specialist {
  id: number;
  metadata: Metadata;
  isTest: boolean;
  legalName: LegalName;
  staffRoleCode: string;
  contactInfo: Contact;
  spokenLanguages: string[];
  virtualRoomLink: string;
  bio: string;
  hasPhoto: boolean;
  rating: number;
}

interface NewAppointment {
  id: number;
  metadata: Metadata;
  status: string;
  type: string;
  encounterNumber: string;
  encounterTypeCode: number;
  clinic: Clinic;
  specialist: Specialist;
  specialistTypeCode: number;
  physicianStaffId: number;
  physicianName: string;
  startDate: string; // Assuming ISO 8601 formatted date string
  endDate: string; // Assuming ISO 8601 formatted date string
  duration: number;
  coPay: number;
  virtualRoomLink: string;
  isCopayPaid: boolean;
}

interface SpecimenData {
  id?: string;
  newSpecimen?: boolean;
  SiteMode?: string;
  labSpecimen?: string;
  TestId?: string;
  StartDate?: string;
  StartTime?: string;
  EndDate?: string;
  EndTime?: string;
  metadata?: Metadata;
  recordStatus?: string;
  orderId?: string;
  collectionMethod?: string;
  collectedOn?: string;
  specimenType?: string;
  specimenAdditives?: string;
  collectionReceivedDateTime?: string;
  volume?: number | string;
  measureUnit?: string;
  rejectReason?: string;
  sourceSite?: string;
  sourceSiteModifier?: string;
  role?: string;
  containerCondition?: string;
}
interface ResultData {
  id?: string
  Result?: string
  testName?: string
  orderingLab?: {
    name: string
  }
  User?: string
  ResultName?: string
  ResultValue?: string
  Unit?: string
  Code?: string
  Range?: string
  Flag?: string
  Status?: string
  Note?: string
  orderId?: string | null
  labOrderDate?: Date
  observationTime?: Date | string
  resultValue?: string
  valueDescription?: string
  resultValueUnit?: string
  resultCode?: string
  labTestId?: string
  recomendedValue?: string
  abnormalRangeCode?: string
  statusCode?: string
  physicianComments?: string
}
interface StaffType {
  id: number;
  metadata: {
    createdOn: string;
    createdBy: number;
    createdByFullName: string;
    updatedOn: string;
    updatedBy: number;
    updatedByFullName: string;
    deletedOn: string;
    deletedBy: number;
    deletedByFullName: string;
  };
  isTest: boolean;
  legalName: {
    firstName: string;
    middleName: string;
    lastName: string;
    preferredName: string;
    title: string;
    suffix: string;
    honors: string;
  };
  staffRoleCode: string;
  contactInfo: {
    email: string;
    emailVerificationStatus: string;
    phoneNumbers: {
      type: string;
      number: string;
      extension: string;
      comment: string;
    }[];
    addresses: {
      type: string;
      street1: string;
      street2: string;
      city: string;
      state: string;
      country: string;
      postalCode: string;
      geoCoordinates: {
        longitude: number;
        latitude: number;
        altitude: number;
      };
    }[];
    isMailingAddressSameAsPrimary: boolean;
  };
  spokenLanguages: string[];
  virtualRoomLink: string;
  bio: string;
  hasPhoto: boolean;
  rating: number;
}
interface StaffTypeSearchPayload {
  "staffIds"?: string;
  "locationIds"?: string[]
  "name"?: string
  "npi"?: string
  "roleCodes"?: string[]
  "spokenLanguage"?: string,
  "includeBiography"?: boolean
}
interface PhoneNumber {
  type?: string;
  number?: string;
  extension?: string;
  comment?: string;
}
interface SearchLabDignosisCod10Diagnoses {
  "id": number
  "metadata": Metadata
  "code": string
  "description": string
  "isFavorite": boolean
  "isActive": boolean
}
interface ContactDetails {
  email?: string;
  emailVerificationStatus?: string;
  phoneNumbers?: PhoneNumber[];
  addresses?: Address[];
  isMailingAddressSameAsPrimary?: boolean;
}
interface RecordTypes {
  id: string;
  metadata: Metadata;
  recordStatus: string;
  name: string;
  locationName: string;
  locationId: string;
  consolidatorId: string;
  labGroupId: string;
  contactDetails: ContactDetails;
  isTest: boolean;
}
interface Observation {
  id: string;
  metadata: Metadata;
  labTestId: string;
  orderId: string;
  observationTime: string; // Assuming this is an ISO 8601 formatted date string
  resultCode: string;
  resultValue: string;
  resultValueUnit: string;
  recommendedValue: string;
  statusCode: string;
  abnormalRangeCode: string;
  physicianComments: string;
  externalResultId: string;
  labComments: string;
  resultValueType: string;
  valueDescription: string;
  recordStatus: string;
}

interface Diagnoses {
  id?: number;
  metadata?: Metadata;
  disabled?: boolean;
  checked?: boolean;
  orderId?: string | null;
  diagnosisCode?: string;
  diagnosisDescription?: string;
  code?: string;
  description?: string;
  symptomCode?: string;
  recordStatus?: string;
}
interface LabTestResult {
  idList?: string[];
  resourceStatusList?: string[];
  labTestId?: string;
  orderId?: string;
  statusCode?: string;
}
interface CodeAttribute {
  id: string;
  metadata: {
    createdOn: string;
    createdBy: number;
    createdByFullName: string;
    updatedOn: string;
    updatedBy: number;
    updatedByFullName: string;
    deletedOn: string;
    deletedBy: number;
    deletedByFullName: string;
  };
  recordStatus: string;
  codeId: string;
  name: string;
  content: string;
}

interface Code {
  id: string;
  metadata: {
    createdOn: string;
    createdBy: number;
    createdByFullName: string;
    updatedOn: string;
    updatedBy: number;
    updatedByFullName: string;
    deletedOn: string;
    deletedBy: number;
    deletedByFullName: string;
  };
  recordStatus: string;
  codesetId: string;
  code: string;
  displayName: string;
  groupingCode: string;
  codeAttributes: CodeAttribute[];
}
interface DocumetTypeAgainstLaborderPayload {
  "isIncludeMetadataResourceChangeControl"?: boolean;
  "isIncludeMetadataResourceIds"?: boolean;
  "isIncludeMetadataResourceStatus"?: boolean;
  "idList"?: string[];
  "appointmentId"?: number;
  "labOrderId"?: string,
  "documentTypes"?: string[]
}
interface DocumentTypeAgainstLaborder {
  id: string,
  metadata: Metadata
  orderId: string;
  documentType: string;
  documentUrl: string;
  documentName: string;
  recordStatus: string;
}
interface getSpecimenTypes {
  recordStatus: string;
  assigningAuthorityId: string;
  codeSystemName: string;
  displayName: string;
  version: string;
  oid: string;
  validFrom: string; // Assuming this is an ISO 8601 formatted date string
  validTo: string; // Assuming this is an ISO 8601 formatted date string
  sourceName: string;
  sourceUrl: string;
  sourceFormat: string;
  sourceUpdateDays: number;
  viewPermissionCode: string;
  editPermissionCode: string;
  codes?: Code[]; // Array of Code objects
}

interface SpecimenTypes {
  id?: string;
  recordStatus?: string;
  metadata?: Metadata;
  labSpecimen?: string;
  sourceSiteModifier?: string;
  orderId?: string;
  collectionMethod?: string;
  collectedOn?: string; // Assuming this is an ISO 8601 formatted date string
  specimenType?: string;
  specimenAdditives?: string;
  collectionReceivedDateTime?: string; // Assuming this is an ISO 8601 formatted date string
  volume?: string | number;
  measureUnit?: string;
  rejectReason?: string;
  sourceSite?: string;
  role?: string;
  containerCondition?: string;
  labTests?: LabTest[];
}

interface Name {
  firstName: string;
  middleName: string;
  lastName: string;
  preferredName: string;
  title: string;
  suffix: string;
  honors: string;
};

interface PatientContact {
  email: string;
  emailVerificationStatus: 'Verified' | 'Unverified';
  phoneNumbers: PhoneNumber[];
  addresses: Address[];
  isMailingAddressSameAsPrimary: boolean;
};

interface DriversLicense {
  type: string;
  number: string;
  issuedDate: string;
  expirationDate: string;
  issuedBy: string;
  validIn: string;
  hasFrontImage: boolean;
  hasBackImage: boolean;
};

interface Guardian {
  name: Name;
  isEmergencyContact: boolean;
  relationship: string;
  contact: Contact;
};

interface EmergencyContact {
  name: Name;
  relationship: string;
  contact: Contact;
};

interface AlternateOrPreviousContactDetails {
  email: string;
  emailVerificationStatus: 'Verified' | 'Unverified';
  phoneNumbers: PhoneNumber[];
  addresses: Address[];
  isMailingAddressSameAsPrimary: boolean;
};

interface PatientTypes {
  id: number;
  metadata: Metadata;
  verificationStatus: 'Verified' | 'Unverified';
  userId: number;
  legalName: Name;
  birthdate: string;
  gender: 'Male' | 'Female' | 'NotSpecified';
  genderOrientation: string;
  genderExpression: string;
  genderPronoun: string;
  driversLicense: DriversLicense;
  socialSecurityNumber: string;
  medicalRecordNumber: string;
  language: string;
  preferredLanguage: string;
  chargeKey: string;
  chargeUserId: string;
  isPlusMember: boolean;
  isTest: boolean;
  hasPhoto: boolean;
  guardian: Guardian;
  contactDetails: PatientContact;
  emergencyContact: EmergencyContact;
  cmdId: string;
  motherMaidenName: string;
  alternateOrPreviousName: Name;
  alternateOrPreviousContactDetails: AlternateOrPreviousContactDetails;
  languageAbility: string;
  languageProficiency: string;
  religion: string;
  status: string;
  hasGuardian: boolean;
  races: string[];
  ethnicities: string[];
};
type questResultPayload = {
  EntryType?: string,
  LogDescription?: string
}
type PatientPayload = {
  idList?: number[];
  name?: string;
  gender?: 'Male' | 'Female' | 'NotSpecified';
  dateOfBirth?: string; // e.g., '2024-09-12'
  age?: number;
  email?: string;
  telephone?: string;
  ssn?: string;
  city?: string;
  postalCode?: string;
  hasGuardian?: boolean;
  mrn?: string; // Medical Record Number
  patientCreatedFrom?: string; // e.g., '2024-09-12'
  patientCreatedTo?: string; // e.g., '2024-09-12'
  patientStatuses?: PatientStatus[];
  contactMadeStatuses?: ContactMadeStatus[];
  verificationStatus?: 'Verified' | 'Unverified';
  insuranceVerificationStatus?: 'Verified' | 'Unverified';
  consentVerificationStatus?: 'Verified' | 'Unverified';
  creditCardVerificationStatus?: 'Verified' | 'Unverified';
  hasNextAppointment?: boolean;
  visitHistoryPastDays?: number;
  futureVisitsByDays?: 'Disregard' | 'Consider';
};

type PatientStatus = 'CustomerActive' | 'CustomerInactive' | 'Prospective';
type ContactMadeStatus = 'Set' | 'NotSet';

export type {
  PatientPayload,
  PatientContact,
  Address,
  RecordTypes,
  PatientTypes,
  SpecimenData,
  ResultData,
  LabOrders,
  LabTestResult,
  StaffType,
  StaffTypeSearchPayload,
  LabRecord,
  LabOrder,
  OrderParams,
  LabTest,
  SearchLabDignosisCod10Diagnoses,
  LabResultPayload,
  Diagnoses,
  LabSearchPayload,
  Problem,
  Observation,
  getSpecimenTypes,
  SpecimenTypes,
  NewAppointment,
  Code,
  DocumentTypeAgainstLaborder,
  DocumetTypeAgainstLaborderPayload,
  questResultPayload
}
