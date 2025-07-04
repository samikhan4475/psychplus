import {
  AppointmentType,
  ProviderType,
  ServiceOffered,
} from '@psychplus-v2/constants'
import {
  AppointmentAvailability,
  AppointmentClinic,
  AppointmentSlot,
  LocationProvidersPayloadParams,
  SearchLocationsProvidersParams,
  SlotsByDay,
  TransformLocationProvidersParams,
  TransformStaffAvailabilityParams,
} from '@psychplus-v2/types'
import {
  buildClinicContactAddresses,
  getLocalCalendarDate,
  getLocalTimeWithOriginalDate,
} from '.'
import { binaryInsertSorted, compareAsc, compareDesc } from './sort'

const transformLocationProvidersResponse = ({
  response,
  providerType,
  providerTypeLabel,
  appointmentType,
}: TransformLocationProvidersParams): AppointmentAvailability[] => {
  const isInPersonAppointment = appointmentType === AppointmentType.InPerson

  const providerMap = new Map<number, AppointmentAvailability>()
  const sortedProviders: AppointmentAvailability[] = []

  const compareByRatingDesc = compareDesc<AppointmentAvailability>(
    (p) => p.specialist.rating ?? 0,
  )
  const compareClinicsByDistanceAsc = compareAsc<AppointmentClinic>(
    (c) => c.distanceInMiles ?? Infinity,
  )

  for (const { location, providers } of response) {
    const addresses = buildClinicContactAddresses(
      location.locationAddress,
      appointmentType === AppointmentType.InPerson,
    )
    const clinic = {
      name: location.locationName,
      id: location.locationId,
      serviceId: location.serviceId,
      contact: {
        addresses,
      },
      ...(isInPersonAppointment &&
        location.distanceInMiles && {
          distanceInMiles: location.distanceInMiles,
        }),
      slotsByDay: {},
    }

    for (const provider of providers) {
      const existing = providerMap.get(provider.staffId)

      if (existing) {
        if (isInPersonAppointment) {
          binaryInsertSorted(
            existing.clinics,
            clinic,
            compareClinicsByDistanceAsc,
          )
        } else {
          existing.clinics.push(clinic)
        }
      } else {
        const newProvider: AppointmentAvailability = {
          allSlotsByDay: {},
          clinics: [clinic],
          specialist: {
            id: provider.staffId,
            legalName: provider.name,
            hasPhoto: provider.hasProfilePicture,
            spokenLanguages: provider.spokenLanguages,
            rating: provider.averageRating ?? 0,
          },
          providerType: providerTypeLabel,
          specialistTypeCode: providerType,
        }

        providerMap.set(provider.staffId, newProvider)
        binaryInsertSorted(sortedProviders, newProvider, compareByRatingDesc)
      }
    }
  }

  return sortedProviders
}

const transformLocationProvidersRequest = ({
  appointmentType,
  providerType,
  providerTypeLabel,
  zipCode,
  stateCode,
  maxDistanceInMiles = '20',
}: LocationProvidersPayloadParams): SearchLocationsProvidersParams => {
  const isInPersonVisit = appointmentType === AppointmentType.InPerson
  return {
    appointmentType,
    ...(providerType && {
      providerType: providerTypeLabel,
    }),
    serviceOffered:
      providerType === ProviderType.Psychiatrist
        ? ServiceOffered.Psychiatry
        : ServiceOffered.Therapy,
    postalCode: zipCode,
    ...(stateCode && { stateCodes: [stateCode] }),
    ...(isInPersonVisit && { maxDistanceInMiles: Number(maxDistanceInMiles) }),
  }
}

const transformStaffAvailabilityResponse = ({
  response,
  clinicId,
  timeZone,
}: TransformStaffAvailabilityParams): AppointmentSlot[] => {
  return response.map((slot) => ({
    duration: slot.durationMinutes,
    isPlusSlot: slot?.isPlusSlot ?? false,
    servicesOffered: [slot.serviceId],
    startDate: getLocalTimeWithOriginalDate(slot.startDate,timeZone),
    startDateUtc: slot.startDate,
    endDate: slot.endDate,
    type: slot.type,
    clinicId,
  }))
}

const transformSlotsByDay = (data: AppointmentSlot[]): SlotsByDay => {
  const slotsByDay: SlotsByDay = {}

  for (const slot of data) {
    const dayKey = getLocalCalendarDate(slot.startDate).toString()
    slotsByDay[dayKey] ??= []
    slotsByDay[dayKey].push(slot)
  }

  return slotsByDay
}

export {
  transformLocationProvidersResponse,
  transformLocationProvidersRequest,
  transformStaffAvailabilityResponse,
  transformSlotsByDay,
}
