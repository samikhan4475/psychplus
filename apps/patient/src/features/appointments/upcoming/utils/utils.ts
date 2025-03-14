import { Address } from '@psychplus-v2/types'
import { InsuranceChipVariantType, VerificationStatus } from '../constants'

const getClinicAddressDirectionMapUrl = (addresses?: Address[]) => {
  const address = addresses?.[0]

  if (!address) return ''

  const query = encodeURIComponent(
    `${address.street1}, ${address.city}, ${address.state} ${address.postalCode}`,
  )

  return `https://www.google.com/maps/search/?api=1&query=${query}`
}

const mapVerificationStatusToChipVariant = (
  status: VerificationStatus,
): InsuranceChipVariantType => {
  const mapping = {
    [VerificationStatus.Pending]: InsuranceChipVariantType.Warning,
    [VerificationStatus.Unverified]: InsuranceChipVariantType.Danger,
    [VerificationStatus.Verified]: InsuranceChipVariantType.Success,
    [VerificationStatus.NotRequested]: InsuranceChipVariantType.Warning,
  }

  return mapping[status]
}

const isWithin48HoursUTC = (appointmentDate: string) => {
  if (!appointmentDate) return false;
  const appointmentTimeUTC = new Date(appointmentDate).getTime();
  const nowUTC = Date.now();
  const hoursDifference = (appointmentTimeUTC - nowUTC) / (1000 * 60 * 60);
  return hoursDifference > 0 && hoursDifference <= 48;
};

export { getClinicAddressDirectionMapUrl, mapVerificationStatusToChipVariant, isWithin48HoursUTC }
