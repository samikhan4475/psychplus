'use server'

import * as api from '@/api'
import { ClinicalStaffList } from '../types'

interface ClinicalStaffListParams {
  staffId: number
}

const getClinicalStaffAction = async ({
  staffId,
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
