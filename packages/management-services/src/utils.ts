import type { Service } from './types'

const data: Service[] = [...Array(100)].map(() => {
  return {
    id: '1234567890',
    locationType: 'Facility',
    locationName: 'Willowbrook',
    service: 'Therapy/Counseling',
    pos: 1,
    address: {
      address1: 'St 10, Willow Brook',
      address2: '',
      city: 'Houston',
      state: 'Taxes',
      zip: 77002,
    },
    psychplusPolicy: '',
    reminders: {
      provNotes: '',
      ptVisit: '',
    },
    ehrCode: 0,
    cosigner: '',
    cosignerType: '',
    primaryProvider: '',
    visitType: '',
    status: 'Active',
  }
})

const handleMockRequest = (): Promise<Service[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(data)
    }, 1000)
  })
}

const getServices = (): Promise<Service[]> => handleMockRequest()

export { getServices }
