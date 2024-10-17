import { addDays, eachDayOfInterval, format } from 'date-fns'
import toast from 'react-hot-toast'
import { create } from 'zustand'
import { getUnitsGroupsAction } from '../actions'
import { AppointmentDate } from '../scheduler-view/types'
import { AppointmentParams, GetUnitsGroupsResponse } from '../types'
import { getAppointmentsAction } from './actions/get-appointments'
import {
  AppointmentRecord,
  DayString,
  MergedRecord,
  WeekDay,
  WeekdayData,
} from './types'

interface Store {
  data?: MergedRecord[]
  error?: string
  loading?: boolean
  providerCodingFilters: string[]
  tableFilters: string[]
  currentWeekDays: WeekDay[]
  dates: AppointmentDate[]
  unitsandgroupslist: GetUnitsGroupsResponse
  fetchProviderCodingView: (formValues?: AppointmentParams) => void
  saveProviderCodingFilters: (filters: string[]) => void
  generateCurrentWeekDays: (value: Date) => void
  setDates: (value: Date) => void
  fetchUnitsAndGroups: (arg: string[]) => void
}

const useStore = create<Store>((set, get) => ({
  data: [],
  error: undefined,
  loading: false,
  providerCodingFilters: [],
  tableFilters: [],
  currentWeekDays: [],
  dates: [],
  unitsandgroupslist: { serviceGroups: [], serviceUnits: [] },
  generateCurrentWeekDays: (startDate) => {
    const weekDays = []
    const firstDayOfWeek = new Date(startDate)
    const dayOfWeek = firstDayOfWeek.getDay()
    const offset = dayOfWeek === 0 ? -6 : 1 - dayOfWeek
    firstDayOfWeek.setDate(startDate.getDate() + offset)
    for (let i = 0; i < 7; i++) {
      const date = new Date(firstDayOfWeek)
      date.setDate(firstDayOfWeek.getDate() + i)
      const dayLabel = date.toLocaleString('default', { weekday: 'short' })
      const formattedDate = `${dayLabel} ${
        date.getMonth() + 1
      }/${date.getDate()}`

      weekDays.push({ id: dayLabel, label: formattedDate })
    }
    set({ currentWeekDays: weekDays })
  },
  fetchProviderCodingView: async (formValues) => {
    set({
      error: undefined,
      loading: true,
    })
    const result = await getAppointmentsAction(formValues ?? {})
    if (result.state === 'error') {
      toast.error(result.error ?? 'Error while fetching Provider coding view')
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

const getWeekdayName = (dateString: string): string => {
  const date = new Date(dateString)
  return date.toLocaleString('en-US', { weekday: 'short' })
}

const mergeDataByFacilityAdmissionId = (
  data: AppointmentRecord[],
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
      isNoteSigned,
      cptCodes,
      ...otherFields
    } = record

    const weekdayName = getWeekdayName(appointmentDate) as DayString
    if (facilityAdmissionId === undefined) {
      return
    }

    const newRecord: MergedRecord = {
      facilityAdmissionId,
      appointmentDate,
      ...otherFields,
      [weekdayName]: {
        diagnosis: diagnosis ? [...diagnosis] : [],
        visitMedium,
        visitSequence,
        visitStatus,
        visitType,
        isNoteSigned,
        cptCodes: cptCodes || [],
      } as WeekdayData,
    }
    if (!map.has(facilityAdmissionId)) {
      map.set(facilityAdmissionId, newRecord)
    } else {
      const existingRecord = map.get(facilityAdmissionId)

      if (existingRecord) {
        if (existingRecord[weekdayName]) {
          existingRecord[weekdayName].diagnosis.push(...(diagnosis || []))
          existingRecord[weekdayName].visitMedium = visitMedium
          existingRecord[weekdayName].visitSequence = visitSequence
          existingRecord[weekdayName].visitStatus = visitStatus
          existingRecord[weekdayName].visitType = visitType
          existingRecord[weekdayName].isNoteSigned = isNoteSigned
          existingRecord[weekdayName].cptCodes = cptCodes || []
        } else {
          existingRecord[weekdayName] = {
            diagnosis: diagnosis ? [...diagnosis] : [],
            visitMedium,
            visitSequence,
            visitStatus,
            visitType,
            isNoteSigned,
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
