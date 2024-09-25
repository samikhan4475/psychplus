import * as api from '@/api'
import { EmailRecipients } from '../types'

const getAllRecipientSuggestionsAction = async (): Promise<
  api.ActionResult<EmailRecipients[]>
> => {
  const response = await mockFetchAllRecipientSuggestions()
  if (response.state === 'error') {
    return {
      state: 'error',
      error: response.error,
    }
  }
  return {
    state: 'success',
    data: response.data,
  }
}

const mockFetchAllRecipientSuggestions = async (): Promise<
  api.NetworkResult<EmailRecipients[]>
> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        headers: new Headers({}),
        state: 'success',
        data: [
          {
            id: 1,
            metadata: {
              createdOn: '2024-09-23T12:34:56Z',
              createdBy: 101,
              createdByFullName: 'John Doe',
              updatedOn: '2024-09-23T14:00:00Z',
              updatedBy: 102,
              updatedByFullName: 'Jane Smith',
              deletedOn: '',
              deletedBy: 0,
              deletedByFullName: '',
            },
            legalName: {
              firstName: 'salman',
              middleName: 'M',
              lastName: 'bajwa',
              preferredName: 'Aly',
              title: 'Ms.',
              suffix: 'Jr.',
              honors: 'PhD',
            },
            userRoleCode: 'STAFF',
            contactInfo: {
              email: 'salman@example.com',
              emailVerificationStatus: 'Verified',
              phoneNumbers: [
                {
                  type: 'Home',
                  number: '123-456-7890',
                  extension: '',
                  comment: 'Primary contact number',
                },
                {
                  type: 'Home',
                  number: '987-654-3210',
                  extension: '123',
                  comment: 'Work contact number',
                },
              ],
              addresses: [
                {
                  type: 'Primary',
                  street1: '123 Main St',
                  street2: 'Apt 4B',
                  city: 'New York',
                  state: 'NY',
                  country: 'USA',
                  postalCode: '10001',
                  geoCoordinates: {
                    longitude: -73.935242,
                    latitude: 40.73061,
                    altitude: 0,
                  },
                  timeZoneId: 'America/New_York',
                },
              ],
              isMailingAddressSameAsPrimary: true,
            },
            staffId: 2001,
            patientId: 0,
          },
          {
            id: 2,
            metadata: {
              createdOn: '2024-09-23T12:34:56Z',
              createdBy: 101,
              createdByFullName: 'john',
              updatedOn: '2024-09-23T14:00:00Z',
              updatedBy: 102,
              updatedByFullName: 'Jane Smith',
              deletedBy: 0,
              deletedOn: '',
              deletedByFullName: '',
            },
            legalName: {
              firstName: 'Jane Smith',
              middleName: 'M',
              lastName: 'Jane Smith',
              preferredName: 'Aly',
              title: 'Ms.',
              suffix: 'Jr.',
              honors: 'PhD',
            },
            userRoleCode: 'STAFF',
            contactInfo: {
              email: 'alice.johnson@example.com',
              emailVerificationStatus: 'Verified',
              phoneNumbers: [
                {
                  type: 'Home',
                  number: '123-456-7890',
                  extension: '',
                  comment: 'Primary contact number',
                },
                {
                  type: 'Home',
                  number: '987-654-3210',
                  extension: '123',
                  comment: 'Work contact number',
                },
              ],
              addresses: [
                {
                  type: 'Primary',
                  street1: '123 Main St',
                  street2: 'Apt 4B',
                  city: 'New York',
                  state: 'NY',
                  country: 'USA',
                  postalCode: '10001',
                  geoCoordinates: {
                    longitude: -73.935242,
                    latitude: 40.73061,
                    altitude: 0,
                  },
                  timeZoneId: 'America/New_York',
                },
              ],
              isMailingAddressSameAsPrimary: true,
            },
            staffId: 2323,
            patientId: 1,
          },
        ],
      })
    }, 2000)
  })
}

export { getAllRecipientSuggestionsAction }
