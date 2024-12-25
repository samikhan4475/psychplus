'use server'

import * as api from '@/api'
import { ClinicalStaffList, VisitPayload } from '../types'

interface ClinicalStaffListParams {
  staffId: number
  payload?: VisitPayload
}

const getClinicalStaffAction = async ({
  payload,
}: ClinicalStaffListParams): Promise<api.ActionResult<ClinicalStaffList[]>> => {
  const mockVisitsList: ClinicalStaffList[] = [
    {
      clinicalStaff: 'Ronald Dev, MD',
      addedOn: '2024-11-21T14:30:00Z',
      status: 'Active',
    },
    {
      clinicalStaff: 'Ronald Dev, MD',
      addedOn: '2024-11-21T14:30:00Z',
      status: 'Active',
    },
    {
      clinicalStaff: 'Ronald Dev, MD',
      addedOn: '2024-11-21T14:30:00Z',
      status: 'Active',
    },
    {
      clinicalStaff: 'Ronald Dev, MD',
      addedOn: '2024-11-21T14:30:00Z',
      status: 'Active',
    },
    {
      clinicalStaff: 'Ronald Dev, MD',
      addedOn: '2024-11-21T14:30:00Z',
      status: 'Active',
    },
  ]

  return {
    state: 'success',
    data: mockVisitsList,
  }
}

export { getClinicalStaffAction }
