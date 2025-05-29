import { PreferredPartnerItem } from '../../types'

type BillingFrequency = 'Monthly' | 'Annual'

const getInitialValues = (): PreferredPartnerItem => ({
  id: '',
  name: '',
  individualRate: '',
  coupleRate: '',
  familyRate: '',
  subscriptionStatus: '',
  payerStatus: '',
  billingFrequency: '',
  totalUsers:0,
  plusChargeAmount: '',
  serviceChargeAmount: '',
  startDate: null,
  nextPaymentDate: null,
  contactDetails: {
    email: '',
    emailVerificationStatus: '',
    phoneNumbers: [],
    addresses: [
      {
        type: 'Home',
        street1: '',
        street2: '',
        city: '',
        state: '',
        country: '',
        postalCode: '',
        geoCoordinates: {
          longitude: 0,
          latitude: 0,
          altitude: 0,
        },
        timeZoneId: '',
      },
      {
        type: 'Mailing',
        street1: '',
        street2: '',
        city: '',
        state: '',
        country: '',
        postalCode: '',
        geoCoordinates: {
          longitude: 0,
          latitude: 0,
          altitude: 0,
        },
        timeZoneId: '',
      },
    ],
    isMailingAddressSameAsPrimary: false,
  },
  recordStatus: 'Active',
  isTest: false,
  paymentStatus: '',
  totalUserIds: 0,
  familiesCount: 0,
  couplesCount: 0,
  individualsCount: 0,
})

const calculateDerivedValues = ({
  individualsCount = 0,
  couplesCount = 0,
  familiesCount = 0,
  individualRate = 0,
  coupleRate = 0,
  familyRate = 0,
  billingFrequency = 'Monthly',
}: {
  individualsCount?: number
  couplesCount?: number
  familiesCount?: number
  individualRate?: number
  coupleRate?: number
  familyRate?: number
  billingFrequency?: BillingFrequency
}) => {
  const familySize = 3
  const months = billingFrequency === 'Monthly' ? 1 : 12

  const totalUsers =
    individualsCount + couplesCount * 2 + familiesCount * familySize

  const totalUserIds = individualsCount + couplesCount + familiesCount

  const plusChargeAmount =
    (individualsCount * individualRate +
      couplesCount * coupleRate +
      familiesCount * familyRate) *
    months

  return {
    totalUsers,
    totalUserIds,
    plusChargeAmount,
  }
}

export { calculateDerivedValues, getInitialValues }
