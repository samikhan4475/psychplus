import {
  AppointmentType,
  ProviderType,
  ServiceOffered,
} from '@psychplus-v2/constants'

const APPOINTMENT_TYPE_LABELS: Record<AppointmentType, string> = {
  [AppointmentType.InPerson]: 'In-Person',
  [AppointmentType.Virtual]: 'Virtual',
  [AppointmentType.Either]: 'Either',
}

const getAppointmentTypeLabel = (appointmentType: AppointmentType) => {
  return APPOINTMENT_TYPE_LABELS[appointmentType]
}

const getSlotsCacheKey = ({
  startingDate,
  appointmentType,
  providerType,
  clinicId,
  providerId,
  zipCode,
}: {
  startingDate?: string
  appointmentType?: string
  providerType?: ProviderType | string
  clinicId?: string
  providerId?: number
  zipCode?: string
}): string | null => {
  const hasAllValues =
    startingDate &&
    appointmentType &&
    providerType &&
    clinicId &&
    providerId !== undefined &&
    zipCode

  if (!hasAllValues) return null

  return `${startingDate}-${appointmentType}-${providerType}-${clinicId}-${providerId}-${zipCode}`
}

function normalizeLanguageFilter(lang: string): string {
  return lang === 'HindiUrdu' ? 'Hindi/Urdu' : lang
}
function getServiceOfferedByProviderType(
  providerType: ProviderType,
): ServiceOffered {
  return providerType === ProviderType.Psychiatrist
    ? ServiceOffered.Psychiatry
    : ServiceOffered.Therapy
}
export {
  getAppointmentTypeLabel,
  getSlotsCacheKey,
  normalizeLanguageFilter,
  getServiceOfferedByProviderType,
}
