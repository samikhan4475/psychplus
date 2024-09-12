import { parseAbsolute } from '@internationalized/date'
import * as api from '@/api'
import {
  AvailableSlots,
  GetAppointmentSlotsResponse,
  Specialist,
} from '../types'

interface AvailableSlotsMock extends AvailableSlots {
  specialist: Specialist
}

const getAppointmentsAction = async (): Promise<
  api.ActionResult<GetAppointmentSlotsResponse<AvailableSlotsMock>>
> => {
  const response = await mockFetchAllAppointments()

  if (response.state === 'error') {
    return {
      state: 'error',
      error: response.error,
    }
  }

  const total = Number(response.headers.get('psychplus-totalresourcecount'))
  const appointmentsData = response.data.map((slot) => {
    const zonedStartDate = parseAbsolute(slot.startDate, slot.timeZoneId)
    const zonedEndDate = parseAbsolute(slot.endDate, slot.timeZoneId)

    return {
      start: new Date(
        zonedStartDate.year,
        zonedStartDate.month - 1,
        zonedStartDate.day,
        zonedStartDate.hour,
        zonedStartDate.minute,
        zonedStartDate.second,
        zonedStartDate.millisecond,
      ),
      end: new Date(
        zonedEndDate.year,
        zonedEndDate.month - 1,
        zonedEndDate.day,
        zonedEndDate.hour,
        zonedEndDate.minute,
        zonedEndDate.second,
        zonedEndDate.millisecond,
      ),
      title: `${slot.specialist.legalName.firstName} ${slot.specialist.legalName.lastName}`,
      data: slot,
    }
  })

  return {
    state: 'success',
    data: {
      appointments: appointmentsData,
      total,
    },
  }
}

const mockFetchAllAppointments = async (): Promise<
  api.NetworkResult<AvailableSlotsMock[]>
> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        headers: new Headers({}),
        state: 'success',
        data: [
          {
            type: 'in-person',
            isPlusSlot: false,
            startDate: '2024-09-10T06:00:00Z',
            endDate: '2024-09-10T06:20:00Z',
            duration: 20,
            servicesOffered: ['53f6b5cc-6d12-4e09-bca9-713a0ca0c5e1'],
            timeZoneId: 'America/New_York',
            teleState: [],
            specialist: {
              id: 347,
              isTest: false,
              legalName: {
                firstName: 'Annie',
                lastName: 'Shipley',
              },
              staffRoleCode: '1',
            },
          },
          {
            type: 'in-person',
            isPlusSlot: false,
            startDate: '2024-09-10T08:00:00Z',
            endDate: '2024-09-10T08:20:00Z',
            duration: 20,
            servicesOffered: ['53f6b5cc-6d12-4e09-bca9-713a0ca0c5e1'],
            timeZoneId: 'America/New_York',
            teleState: [],
            specialist: {
              id: 347,
              isTest: false,
              legalName: {
                firstName: 'Annie',
                lastName: 'Shipley',
              },
              staffRoleCode: '1',
            },
          },
          {
            type: 'in-person',
            isPlusSlot: false,
            startDate: '2024-09-10T08:20:00Z',
            endDate: '2024-09-10T08:40:00Z',
            duration: 20,
            servicesOffered: ['53f6b5cc-6d12-4e09-bca9-713a0ca0c5e1'],
            timeZoneId: 'America/New_York',
            teleState: [],
            specialist: {
              id: 347,
              isTest: false,
              legalName: {
                firstName: 'Annie',
                lastName: 'Shipley',
              },
              staffRoleCode: '1',
            },
          },
          {
            type: 'in-person',
            isPlusSlot: false,
            startDate: '2024-09-10T10:00:00Z',
            endDate: '2024-09-10T10:20:00Z',
            duration: 20,
            servicesOffered: ['53f6b5cc-6d12-4e09-bca9-713a0ca0c5e1'],
            timeZoneId: 'America/New_York',
            teleState: [],
            specialist: {
              id: 347,
              isTest: false,
              legalName: {
                firstName: 'Annie',
                lastName: 'Shipley',
              },
              staffRoleCode: '1',
            },
          },
          {
            type: 'in-person',
            isPlusSlot: false,
            startDate: '2024-09-10T10:20:00Z',
            endDate: '2024-09-10T10:40:00Z',
            duration: 20,
            servicesOffered: ['53f6b5cc-6d12-4e09-bca9-713a0ca0c5e1'],
            timeZoneId: 'America/New_York',
            teleState: [],
            specialist: {
              id: 347,
              isTest: false,
              legalName: {
                firstName: 'Annie',
                lastName: 'Shipley',
              },
              staffRoleCode: '1',
            },
          },
          {
            type: 'video',
            isPlusSlot: false,
            startDate: '2024-09-14T08:20:00Z',
            endDate: '2024-09-14T08:40:00Z',
            duration: 20,
            servicesOffered: ['53f6b5cc-6d12-4e09-bca9-713a0ca0c5e1'],
            timeZoneId: 'America/New_York',
            teleState: [],
            specialist: {
              id: 347,
              isTest: false,
              legalName: {
                firstName: 'Annie',
                lastName: 'Shipley',
              },
              staffRoleCode: '1',
            },
          },
        ],
      })
    }, 2000)
  })
}

export { getAppointmentsAction }
