import { DateValue } from 'react-aria-components'
import { Metadata } from '@/types'

interface PreferredPartnerItem {
  id: string
  metadata?: Metadata
  name: string
  individualRate: string
  coupleRate: string
  familyRate: string
  subscriptionStatus: string
  payerStatus: string
  billingFrequency: string
  plusChargeAmount: string
  serviceChargeAmount: string
  startDate: DateValue | string | null
  nextPaymentDate: DateValue | string | null
  contactDetails: {
    email: string
    emailVerificationStatus: string
    phoneNumbers?: Array<{
      type: string
      number: string
      extension: string
      comment: string
    }>
    addresses: Array<{
      type: string
      street1: string
      street2: string
      city: string
      state: string
      country: string
      postalCode: string
      geoCoordinates?: {
        longitude: number
        latitude: number
        altitude: number
      }
      timeZoneId?: string
    }>
    isMailingAddressSameAsPrimary: boolean
  }
  recordStatus: string
  isTest: boolean
  paymentStatus: string
  totalUserIds: number
  totalUsers: number
  familiesCount: number
  couplesCount: number
  individualsCount: number
}

interface PreferredPartnerListResponse {
  preferredPartners: PreferredPartnerItem[]
  total: number
}

interface PreferredPartnerListPayload {
  isIncludeMetadataResourceChangeControl: boolean
  isIncludeMetadataResourceIds: boolean
  isIncludeMetadataResourceStatus: boolean
  partnerIds: string[]
  name: string
  subscriptionStatusList: string[]
  payerStatusList: string[]
  billingFrequencyList: string[]
  city: string
  dateFrom?: DateValue | null | string
  dateTo?: DateValue | null | string
  isIncludeCounts: boolean
  recordStatusList: string[]
  individualRate: string
  coupleRate: string
  familyRate: string
  plusChargeAmount: string
  serviceChargeAmount: string
  startDate: DateValue | null | string
  nextPaymentDate: DateValue | null | string
  paymentStatuses: string[]
  address: string
}

export {
  type PreferredPartnerItem,
  type PreferredPartnerListResponse,
  type PreferredPartnerListPayload,
}
