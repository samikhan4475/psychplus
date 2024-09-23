'use server'

import { parseAbsolute } from '@internationalized/date'
import { addDays } from 'date-fns'
import toast from 'react-hot-toast'
import * as api from '@/api'
import { formatDate } from '@/utils'
import {
  StaffAppointmentAvailability,
  StaffAppointmentAvailabilityResponse,
} from '../types/appointments'
import {
  AppointmentEventData,
  AvailableSlotsEvent,
  CalenderViewSchemaType,
} from '../types/calender'
import { BookedAppointment } from '../types/schedule'

const parseZonedDate = (dateString: string, timeZoneId: string): Date => {
  const zonedDate = parseAbsolute(dateString, timeZoneId)
  return new Date(
    zonedDate.year,
    zonedDate.month - 1,
    zonedDate.day,
    zonedDate.hour,
    zonedDate.minute,
    zonedDate.second,
    zonedDate.millisecond,
  )
}

const transformOutAvailableAppointment = (filters: CalenderViewSchemaType) => {
  const payload = {
    maxDaysOutToLook: 7,
    staffIds: filters.provider ? [filters.provider] : null,
    locationIds: filters.location ? [filters.location] : null,
    specialistTypeCode: filters.providerType ?? '',
    startingDate: filters.startDate ? formatDate(filters.startDate) : '',
    stateId: filters.stateId ?? '',
    serviceId: filters.serviceId ?? '',
    gender: filters.gender || '',
    language: filters.language || '',
    isFirstResponder: filters.isFirstResponder || '',
  }

  return Object.fromEntries(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    Object.entries(payload).filter(([_, value]) => value),
  )
}

const transformOutBookedAppointment = (filters: CalenderViewSchemaType) => {
  const payload = {
    isIncludeMetadataResourceChangeControl: true,
    isIncludeMetadataResourceIds: true,
    isIncludeMetadataResourceStatus: true,
    includePatientData: true,
    includeFinancialData: true,
    includeLocation: true,
    includeStaff: true,
    includeSpecialist: true,
    includeEncounterTypes: true,
    includeServiceUnit: true,
    includeServiceGroup: true,
    includeCptCodes: true,
    includePatientTransactions: true,
    includePatientNotes: true,

    // TODO: Backend is working on these required filters.
    // staffIds: filters.provider ? [filters.provider] : null,
    // language: filters.language || '',
    // isFirstResponder: filters.isFirstResponder || '',
    // stateId: filters.stateId ?? '',

    provideType: filters.providerType ?? '',
    visitMedium: filters.visitMedium ?? '',
    serviceId: filters.serviceId ? [filters.serviceId] : null,
    locationId: filters.location ?? '',
    startingDate: filters.startDate ? formatDate(filters.startDate) : '',
    endingDate: filters.startDate
      ? formatDate(addDays(new Date(filters.startDate), 7))
      : '',
    gender: filters.gender || '',
  }

  return Object.fromEntries(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    Object.entries(payload).filter(([_, value]) => value),
  )
}

const transformInAvailableAppointments = (
  data: StaffAppointmentAvailabilityResponse,
) => {
  return data.staffAppointmentAvailabilities.flatMap((provider) =>
    provider.availableSlots.map((slot) => {
      const start = parseZonedDate(slot.startDate, provider.clinic.timeZoneId)
      const end = parseZonedDate(slot.endDate, provider.clinic.timeZoneId)
      const title = `${provider.specialist.legalName.firstName} ${provider.specialist.legalName.lastName}`

      return {
        start,
        end,
        title,
        data: {
          appointmentType: 'available',
          ...provider,
          ...slot,
          timeZoneId: provider.clinic.timeZoneId,
        },
      }
    }),
  )
}

const transformInBookedAppointments = (data: BookedAppointment[]) => {
  return data.map((appointment) => {
    const start = new Date(appointment.appointmentDate)
    const end = new Date(start.getTime() + 20 * 60000) // Assuming 20 mins duration; adjust if needed
    const title = `${appointment.name} (${appointment.visitType})`

    return {
      start,
      end,
      title,
      data: {
        appointmentType: 'booked',
        ...appointment,
      },
    }
  })
}

const getAppointments = async (
  filters: CalenderViewSchemaType,
): Promise<api.ActionResult<AvailableSlotsEvent<AppointmentEventData>[]>> => {
  try {
    const payload = transformOutAvailableAppointment(filters)
    const [availableResponse, bookedResponse] = await Promise.all([
      api.POST(api.GET_AVAILABLE_APPOINTMENT_ENDPOINT, payload),
      api.POST<BookedAppointment[]>(
        api.SEARCH_BOOKED_APPOINTMENTS_ENDPOINT,
        transformOutBookedAppointment(filters),
      ),
    ])

    if (availableResponse.state === 'error') {
      throw new Error(availableResponse.error)
    }

    if (bookedResponse.state === 'error') {
      throw new Error(bookedResponse.error)
    }

    const availableAppointments = transformInAvailableAppointments(
      availableResponse.data as StaffAppointmentAvailabilityResponse,
    ).flat()

    const bookedAppointments = transformInBookedAppointments(
      bookedResponse.data,
    ).flat()

    const data = [...availableAppointments, ...bookedAppointments].sort(
      (a, b) => a.start.getTime() - b.start.getTime(),
    )

    if (availableAppointments.length === 0) {
      toast.error('No slots available!')
    }

    return {
      state: 'success',
      data: data as AvailableSlotsEvent<
        StaffAppointmentAvailability | BookedAppointment
      >[],
    }
  } catch (error) {
    const errorMessage =
      (error as Error).message || 'Failed to fetch appointments!'
    toast.error(errorMessage)
    return {
      state: 'error',
      error: errorMessage,
    }
  }
}

export { getAppointments }
