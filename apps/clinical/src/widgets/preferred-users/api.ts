import { handleRequest } from '@psychplus/utils/api'
import { createHeaders } from '@psychplus/utils/client'

interface PostPreferedUserSheet {
  partnerId: string | null
  file: object
}

interface WorklistUserData {
  id: string
  metadata: {
    createdOn: string
    createdBy: number
    createdByFullName: string
    updatedBy: number
  }
  name: string
  gender: string
  dob: string
  mrn: string
  patientStatus: string
  contactDetails: {
    email: string
    phoneNumbers: [
      {
        type: string
        number: string
      },
    ]
    addresses: [
      {
        type: string
        street1: string
        street2: string
        city: string
        state: string
        country: string
        postalCode: string
      },
    ]
  }
  partnerId: string
  pid: number
  userType: string
  userNumber: number
  userStatus: string
  isPrimaryPartner: true
  addDate: string
  termDate: string
  recordStatus: string
}

const preferedUserUpload = (request: PostPreferedUserSheet): Promise<void> =>
  handleRequest(
    fetch(
      `/api/preferredpartners/${request.partnerId}/worklists/actions/upload/xlsx`,
      {
        method: 'POST',
        body: request.file as File,
      },
    ),
  )

const updateWorklistUser = (data: any): Promise<void> =>
  handleRequest(
    fetch(`/api/preferredpartners/${data.partnerId}/worklists/${data.id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
      headers: createHeaders(),
    }),
  )

const deleteWorklistUser = (
  preferredPartnerId: string,
  worklistUserId: string,
): Promise<void> =>
  handleRequest(
    fetch(
      `/api/preferredpartners/${preferredPartnerId}/worklists/${worklistUserId}`,
      {
        method: 'DELETE',
        headers: createHeaders(),
      },
    ),
  )

const deleteActiveUser = (
  preferredPartnerId: string,
  activeUserId: string,
): Promise<void> =>
  handleRequest(
    fetch(
      `/api/preferredpartners/${preferredPartnerId}/partnerpatients/${activeUserId}`,
      {
        method: 'DELETE',
        headers: createHeaders(),
      },
    ),
  )

export {
  preferedUserUpload,
  updateWorklistUser,
  deleteWorklistUser,
  deleteActiveUser,
}
