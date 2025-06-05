import { convertToCalendarDate, getPaddedDateString } from '@/utils'
import { SchemaType } from '../preferred-partner/dialogs/add-preferred-partner/schema'
import { PreferredPartnerItem } from '../preferred-partner/types'

const transformIn = (profile: PreferredPartnerItem): SchemaType => {
  return {
    id: profile.id ?? '',
    name: profile.name ?? '',
    totalUserIds: profile.totalUserIds ?? 0,
    totalUsers: profile.totalUsers ?? 0,
    subscriptionStatus: `${profile.subscriptionStatus}_${profile.payerStatus}`,
    payerStatus: profile.payerStatus ?? '',
    individualsCount: profile.individualsCount ?? 0,
    individualRate: profile.individualRate ?? 0,
    couplesCount: profile.couplesCount ?? 0,
    coupleRate: profile.coupleRate ?? 0,
    familiesCount: profile.familiesCount ?? 0,
    familyRate: profile.familyRate ?? 0,
    plusChargeAmount: profile.plusChargeAmount ?? 0,
    serviceChargeAmount: profile.serviceChargeAmount ?? 0,
    billingFrequency: profile.billingFrequency ?? 'Month',
    contactDetails: {
      ...profile.contactDetails,
      addresses: profile.contactDetails.addresses.map((addr) => ({
        ...addr,
        timeZoneId: addr.timeZoneId ?? '',
        zipLast4: addr.zipLast4 ?? '',
      })),
      isMailingAddressSameAsPrimary:
        profile.contactDetails?.isMailingAddressSameAsPrimary ?? false,
    },
    startDate: profile.startDate
      ? convertToCalendarDate(profile.startDate)
      : null,
    nextPaymentDate: profile.nextPaymentDate
      ? convertToCalendarDate(profile.nextPaymentDate)
      : null,
    fixedPaymentType: profile.fixedPaymentType ?? '',
    recordStatus: profile.recordStatus ?? 'Active',
    isTest: profile.isTest ?? false,
    paymentStatus: profile.paymentStatus ?? 'Successful',
    isMailingAddressSameAsPrimary: profile.contactDetails
      ?.isMailingAddressSameAsPrimary
      ? 'yes'
      : 'no',
  }
}

const transformOut = (data: SchemaType): Partial<PreferredPartnerItem> => {
  const {
    startDate,
    nextPaymentDate,
    subscriptionStatus,
    isMailingAddressSameAsPrimary,
  } = data

  const isSameAddress = isMailingAddressSameAsPrimary === 'yes'

  let addresses = data.contactDetails.addresses

  if (!addresses || addresses.length === 0) {
    addresses = [
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
        zipLast4: '',
      },
      {
        type: 'Billing',
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
        zipLast4: '',
      },
    ]
  }

  if (isSameAddress && addresses.length >= 2) {
    const primary = addresses[0]
    addresses = [
      primary,
      {
        ...primary,
        type: 'Billing',
      },
    ]
  }

  const cleanedAddresses = addresses.map((address) => {
    return {
      type: address.type,
      street1: address.street1,
      street2: address.street2,
      city: address.city,
      state: address.state,
      country: address.country,
      postalCode: address.postalCode,
      zipLast4: address.zipLast4 ?? '',
      geoCoordinates: address.geoCoordinates,
      timeZoneId: address.timeZoneId ?? '',
    }
  })

  const result: Partial<PreferredPartnerItem> = {
    id: data.id,
    name: data.name,
    totalUserIds: data.totalUserIds,
    totalUsers: data.totalUsers,
    subscriptionStatus: subscriptionStatus.includes('_')
      ? subscriptionStatus.split('_')[0]
      : '',
    payerStatus: data.payerStatus,
    individualsCount: data.individualsCount,
    individualRate: data.individualRate ?? 0,
    couplesCount: data.couplesCount,
    coupleRate: data.coupleRate ?? 0,
    familiesCount: data.familiesCount,
    familyRate: data.familyRate ?? 0,
    plusChargeAmount: data.plusChargeAmount ?? 0,
    serviceChargeAmount: data.serviceChargeAmount ?? 0,
    billingFrequency: data.billingFrequency,
    startDate: startDate ? getPaddedDateString(startDate) : null,
    nextPaymentDate: nextPaymentDate
      ? getPaddedDateString(nextPaymentDate)
      : null,
    contactDetails: {
      ...data.contactDetails,
      addresses: cleanedAddresses,
      isMailingAddressSameAsPrimary: isSameAddress,
    },
    recordStatus: data.recordStatus,
    isTest: data.isTest,
    paymentStatus: data.paymentStatus,
  }

  return result
}

export { transformIn, transformOut }
