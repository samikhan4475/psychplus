import * as api from '@/api'
import { PATIENT_REFERRALS_TABLE_PAGE_SIZE } from '../constants'
import type { GetPatientReferralsResponse, PatientReferral } from '../types'

interface GetPatientReferralsParams {
  patientId: string
  page?: number
}

const getPatientReferralsAction = async ({
  patientId,
  page = 1,
}: GetPatientReferralsParams): Promise<
  api.ActionResult<GetPatientReferralsResponse>
> => {
  const offset = (page - 1) * PATIENT_REFERRALS_TABLE_PAGE_SIZE

  const response = await mockFetchPatientReferrals()

  if (response.state === 'error') {
    return {
      state: 'error',
      error: response.error,
    }
  }

  const total = Number(response.headers.get('psychplus-totalresourcecount'))

  return {
    state: 'success',
    data: {
      referrals: response.data,
      total,
    },
  }
}

const mockFetchPatientReferrals = async (): Promise<
  api.NetworkResult<PatientReferral[]>
> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        headers: new Headers({}),
        state: 'success',
        data: [
          {
            dateTime: '08/16/2013 13:38',
            serviceName: 'Individual Therapy',
            serviceStatus: 'Routine',
            initiatedBy: 'Ronald',
            referringProvider: 'Richards',
            contactStatus: 'Auth in Process',
            visitDate: undefined,
            referralStatus: 'Incomplete',
            comments: '',
          },
          {
            dateTime: '05/27/2015 12:18',
            serviceName: 'Transcranial Magnetic Stimulation',
            serviceStatus: 'Routine',
            initiatedBy: 'Devon',
            referringProvider: 'Dane',
            contactStatus: 'Not Contacted',
            visitDate: undefined,
            referralStatus: 'Incomplete',
            comments: '',
          },
          {
            dateTime: '10/28/2012 09:50',
            serviceName: 'Emergency Room',
            serviceStatus: 'Emergency',
            initiatedBy: 'Fox',
            referringProvider: 'McCoy',
            contactStatus: 'Admitted',
            visitDate: undefined,
            referralStatus: 'Incomplete',
            comments: 'Some comments regarding the emergency room referral',
          },
          {
            dateTime: '02/11/2012 08:12',
            serviceName: 'Inpatient Psychiatry',
            serviceStatus: 'Routine',
            initiatedBy: 'Guy',
            referringProvider: 'Hawkins',
            contactStatus: 'Scheduled',
            visitDate: '08/16/2013',
            referralStatus: 'Completed',
            comments: '',
          },
          {
            dateTime: '08/30/2014 11:44',
            serviceName: 'Group Therapy',
            serviceStatus: 'Routine',
            initiatedBy: 'Alice',
            referringProvider: 'Eve',
            contactStatus: '1st Attempt',
            visitDate: undefined,
            referralStatus: 'Incomplete',
            comments: '',
          },
          {
            dateTime: '08/30/2014 11:44',
            serviceName: 'Group Therapy',
            serviceStatus: 'Routine',
            initiatedBy: 'Ronald',
            referringProvider: 'Richards',
            contactStatus: '1st Attempt',
            visitDate: undefined,
            referralStatus: 'Deleted',
            comments: '',
          },
        ],
      })
    }, 2000)
  })
}

export { getPatientReferralsAction }
