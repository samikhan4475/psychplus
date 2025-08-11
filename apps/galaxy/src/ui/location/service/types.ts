import { Path } from 'react-hook-form'
import { ClinicAddress, SelectOptionType, Service, Sort } from '@/types'
import { ServiceSchemaType } from './add-service-dialog'
import { ServiceFiltersSchemaType } from './filter-form'

interface Question {
  label: string
  name: Path<ServiceSchemaType>
  options: SelectOptionType[]
  disabled?: boolean
  locationType?: string
}

enum CosignerType {
  Location = 'Location',
}
enum LocationType {
  Facility = 'Facility',
  Clinic = 'Clinic',
}
enum Services {
  Psychiatry = 'Psychiatry',
  Therapy = 'Therapy',
  CouplesFamilyTherapy = 'CouplesFamilyTherapy',
  GroupTherapy = 'GroupTherapy',
  NeuropsychologicalEvaluation = 'NeuropsychologicalEvaluation',
}

enum PrimayProviderType {
  PMNR = 'Pmnr',
  Psychiatrist = 'Psychiatrist',
  InternalMedicine = 'InternalMedicine',
  FamilyMedicine = 'FamilyMedicine',
}

enum BillingUsageType {
  CodingOnly = 'CodingOnly',
  EHRCoding = 'EHRCoding',
}

enum RecordStatus {
  Active = 'Active',
  Inactive = 'Inactive',
}
interface ServiceFiltersPayload extends ServiceFiltersSchemaType {
  recordStatuses?: string[]
}
interface GetLocationServicesListParams {
  formValues?: Partial<ServiceFiltersPayload>
  page?: number
  sort?: Sort
}

interface ServicePaylod extends Omit<Service, 'address'> {
  address: Partial<ClinicAddress>
}

interface ServiceClaimAddress extends ClinicAddress {
  stateId: string
  cityId: string
}

export {
  CosignerType,
  Services,
  PrimayProviderType,
  BillingUsageType,
  RecordStatus,
  LocationType,
  type Question,
  type GetLocationServicesListParams,
  type ServiceFiltersPayload,
  type ServicePaylod,
  type ServiceClaimAddress,
}
