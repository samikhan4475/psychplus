import { SchemaType } from './schema'

type BillingFrequency = 'Monthly' | 'Annual'

const getInitialValues = (): SchemaType => ({
  id: '',
  name: '',
  individualRate: 0,
  coupleRate: 0,
  familyRate: 0,
  subscriptionStatus: '',
  payerStatus: '',
  billingFrequency: 'Month',
  totalUsers: 0,
  plusChargeAmount: 0,
  serviceChargeAmount: 0,
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
        zipLast4: '',
        geoCoordinates: {
          longitude: 0,
          latitude: 0,
          altitude: 0,
        },
        timeZoneId: '',
      },
      {
        type: 'Billing',
        street1: '',
        street2: '',
        city: '',
        state: '',
        country: '',
        postalCode: '',
        zipLast4: '',
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
  fixedPaymentType: '',
  isMailingAddressSameAsPrimary: 'no',
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
