import { LocationPractice, Sort } from '@/types'
import { Address } from '@/ui/staff-management/types'
import { LocationFormSchemaType } from './filter-form'

interface GetLocationListParams {
  formValues?: Partial<LocationFilter>
  page?: number
  sort?: Sort
}

interface LocationFilter
  extends Omit<
    LocationFormSchemaType,
    'recordStatuses' | 'isGoogleLinkStatus'
  > {
  recordStatuses?: string[]
  isGoogleLinkStatus?: boolean
}

interface GetLocationListResponse {
  locations: LocationPractice[]
  total: number
}
interface PhoneOrFax {
  number: string
  type: string
}
interface LocationFormBody {
  recordStatus: string
  locationType: string
  name: string
  npi: string
  phone: Partial<PhoneOrFax> | null
  fax: Partial<PhoneOrFax> | null
  isTestLocation: boolean
  address: Address
  locationNameGenerated?: string
  id?: string
  locationGoogleLink?: string
}

interface AttachPracticeLocationPayload {
  recordStatus: string
  practiceId: string
  locationId: string
  practiceType: string
  isPrimaryPractice: boolean
}

export type {
  LocationFilter,
  GetLocationListParams,
  GetLocationListResponse,
  LocationFormBody,
  AttachPracticeLocationPayload,
}
