import { addDays, eachDayOfInterval, format } from 'date-fns'
import toast from 'react-hot-toast'
import { create } from 'zustand'
import { Appointment } from '@/types'
import { getUnitsGroupsAction } from '../actions'
import { AppointmentDate } from '../scheduler-view/types'
import { AppointmentParams, GetUnitsGroupsResponse } from '../types'
import { getAppointmentsAction } from './actions/get-appointments'
import { DayString, MergedRecord, WeekDay, WeekdayData } from './types'
import { extractWeekDay } from './util'

interface Store {
  data?: MergedRecord[]
  error?: string
  loading?: boolean
  providerCodingFilters: string[]
  tableFilters: string[]
  currentWeekDays: WeekDay[]
  dates: AppointmentDate[]
  unitsandgroupslist: GetUnitsGroupsResponse
  formData: AppointmentParams
  fetchProviderCodingView: (formValues?: AppointmentParams) => void
  saveProviderCodingFilters: (filters: string[]) => void
  generateCurrentWeekDays: (value: Date) => void
  setDates: (value: Date) => void
  fetchUnitsAndGroups: (arg: string[]) => void
  setFormData: (data: AppointmentParams) => void
}

const useStore = create<Store>((set, get) => ({
  data: [],
  error: undefined,
  loading: false,
  providerCodingFilters: [],
  formData: {},
  tableFilters: [],
  currentWeekDays: [],
  dates: [],
  unitsandgroupslist: { serviceGroups: [], serviceUnits: [], serviceRooms: [] },
  generateCurrentWeekDays: (startDate) => {
    const weekDays = []
    const firstDayOfWeek = new Date(startDate)
    const dayOfWeek = firstDayOfWeek.getDay()
    const offset = dayOfWeek === 0 ? -6 : 1 - dayOfWeek
    firstDayOfWeek.setDate(startDate.getDate() + offset)
    for (let i = 0; i < 7; i++) {
      const date = new Date(firstDayOfWeek)
      date.setDate(firstDayOfWeek.getDate() + i)
      const dayLabel = date.toLocaleString('default', {
        weekday: 'short',
      }) as DayString
      const formattedDate = `${dayLabel} ${
        date.getMonth() + 1
      }/${date.getDate()}`

      weekDays.push({ id: formattedDate, label: formattedDate })
    }
    set({ currentWeekDays: weekDays })
  },
  fetchProviderCodingView: async (formValues) => {
    const dates = get().dates
    const startDateUtc = dates[0].date.toISOString()

    const payload = {
      startingDate: startDateUtc,
      ...(formValues ?? {}),
    }
    set({
      error: undefined,
      loading: true,
    })

    const result = await getAppointmentsAction(payload)
    if (result.state === 'error') {
      toast.error(result.error || 'Error while fetching Provider coding view')
      return set({
        error: result.error,
        loading: false,
      })
    }
    set({
      data: mergeDataByFacilityAdmissionId(result.data),
      loading: false,
    })
  },

  saveProviderCodingFilters: (filters: string[]) => {
    set({
      providerCodingFilters: filters,
    })
  },
  updateTableFilters: (filters: string[]) => {
    set({
      tableFilters: filters,
    })
  },
  setDates: (startDate) => {
    set({
      dates: createDays(startDate),
    })
    get().generateCurrentWeekDays(startDate)
  },

  fetchUnitsAndGroups: async (serviceIds) => {
    set({
      error: undefined,
    })
    const result = await getUnitsGroupsAction(serviceIds)
    if (result.state === 'error') {
      toast.error('Failed to retrieve units and groups')
      return set({
        error: result.error,
      })
    }

    set({
      unitsandgroupslist: result.data,
    })
  },
  setFormData: (data) => {
    set({
      formData: data,
    })
  },
}))

const createDays = (startDate: Date): AppointmentDate[] => {
  const dates = eachDayOfInterval({
    start: startDate,
    end: addDays(startDate, 6),
  })

  return dates.map((date) => ({
    date: date,
    day: format(date, 'EEE'),
    monthAndDay: format(date, 'MM/dd'),
  }))
}

const mergeDataByFacilityAdmissionId = (
  data: Appointment[],
): MergedRecord[] => {
  const mergedData: MergedRecord[] = []
  const map = new Map<string, MergedRecord>()

  data.forEach((record) => {
    const {
      facilityAdmissionId,
      appointmentDate,
      diagnosis,
      visitMedium,
      visitSequence,
      visitStatus,
      visitType,
      noteSignedStatus,
      providerType,
      isPrimaryProviderType,
      cptCodes,
      appointmentId,
      ...otherFields
    } = record

    const timezone = otherFields.locationTimezoneId
    const weekdayName = extractWeekDay(appointmentDate, timezone)

    if (
      facilityAdmissionId === undefined) {
      return
    }

    const newRecord: MergedRecord = {
      facilityAdmissionId,
      appointmentDate,
      providerType,
      ...otherFields,
      weekDays: {
        [weekdayName]: {
          diagnosis: diagnosis ? [...diagnosis] : [],
          visitMedium,
          visitSequence,
          appointmentId,
          isPrimaryProviderType,
          visitStatus,
          visitType,
          noteSignedStatus,
          cptCodes: cptCodes || [],
        } as WeekdayData,
      }
    }
    const key = `${facilityAdmissionId}-${providerType}`
    if (!map.has(key)) {
      map.set(key, newRecord)
    } else {
      const existingRecord = map.get(key)

      if (existingRecord) {
        if (existingRecord.weekDays[weekdayName]) {
          existingRecord.weekDays[weekdayName].diagnosis.push(...(diagnosis || []))
          existingRecord.weekDays[weekdayName].visitMedium = visitMedium
          existingRecord.weekDays[weekdayName].visitSequence = visitSequence
          existingRecord.weekDays[weekdayName].appointmentId = appointmentId
          existingRecord.weekDays[weekdayName].visitStatus = visitStatus
          existingRecord.weekDays[weekdayName].isPrimaryProviderType =
            isPrimaryProviderType
          existingRecord.weekDays[weekdayName].visitType = visitType
          existingRecord.weekDays[weekdayName].noteSignedStatus = noteSignedStatus
          existingRecord.weekDays[weekdayName].cptCodes = cptCodes || []
        } else {
          existingRecord.weekDays[weekdayName] = {
            diagnosis: diagnosis ? [...diagnosis] : [],
            visitMedium,
            visitSequence,
            appointmentId,
            visitStatus,
            isPrimaryProviderType,
            visitType,
            noteSignedStatus,
            cptCodes: cptCodes || [],
          } as WeekdayData
        }
      }
    }
  })

  map.forEach((value) => {
    mergedData.push(value)
  })

  return mergedData
}

export { useStore }
