import type { Provider } from '../../types'
import { extractDay, extractMonthDay } from './date-utils'

interface GenerateDay {
  date: string
  day: string
  monthDay: string
  time: string
}

const generateDay = (dateString: string): GenerateDay => {
  return ({
    date: dateString,
    day: extractDay(dateString),
    monthDay: extractMonthDay(dateString),
    time: '00:20',
  })
}

export const days = [
  generateDay('2024-07-15T09:15:43Z'),
  generateDay('2024-07-16T09:15:43Z'),
  generateDay('2024-07-17T09:15:43Z'),
  generateDay('2024-07-18T09:15:43Z'),
  generateDay('2024-07-19T09:15:43Z'),
  generateDay('2024-07-20T09:15:43Z'),
  generateDay('2024-07-21T09:15:43Z'),
  generateDay('2024-07-22T09:15:43Z'),
  generateDay('2024-07-23T09:15:43Z'),
  generateDay('2024-07-24T09:15:43Z'),
  generateDay('2024-07-25T09:15:43Z'),
  generateDay('2024-07-26T09:15:43Z'),
  generateDay('2024-07-27T09:15:43Z'),
  generateDay('2024-07-28T09:15:43Z'),
]

const slotsData =  [
  {
    id: 1,
    duration: '00:20',
  },
  {
    id: 2,
    duration: '00:20',
  },
  {
    id: 3,
    duration: '00:20',
  },
  {
    id: 4,
    duration: '00:20',
  },
  {
    id: 5,
    duration: '00:20',
  },
  {
    id: 6,
    duration: '00:20',
  },
  {
    id: 7,
    duration: '00:20',
  },
  {
    id: 8,
    duration: '00:20',
  },
  {
    id: 9,
    duration: '00:20',
  },
]

const providerData = {
  id: 1,
  speciality: 'Psychiatrist',
  nextAvailability: [
    generateDay('2024-08-12T09:15:43Z'),
    generateDay('2024-08-13T09:15:43Z'),
    generateDay('2024-08-14T09:15:43Z'),
    generateDay('2024-08-15T09:15:43Z'),
  ],
  slots: {
    'Mon07/15': slotsData,
    'Tue07/16': slotsData,
    'Wed07/17': slotsData,
    'Thu07/18': slotsData,
    'Fri07/19': slotsData,
    'Sat07/20': slotsData,
    'Sun07/21': slotsData,
    'Mon07/22': slotsData,
    'Tue07/23': slotsData,
    'Wed07/24': slotsData,
    'Thu07/25': slotsData,
    'Fri07/26': slotsData,
    'Sat07/27': slotsData,
    'Sun07/28': slotsData,
  },
}

export const PROVIDERS: Provider[] = [
  { ...providerData, id: 1 },
  { ...providerData, id: 2 },
  { ...providerData, id: 3 },
  { ...providerData, id: 4 },
]
