'use server'

import * as api from '@/api'
import { AdminList } from '../types'

interface AdminListParams {
  staffId: number
}

const getAdminsAction = async ({
  staffId,
}: AdminListParams): Promise<api.ActionResult<AdminList[]>> => {
  const adminList: AdminList[] = [
    {
      admin: 'Admin Dev, MD',
      addedOn: '2024-11-21T14:30:00Z',
      status: 'Active',
    },
    {
      admin: 'Ronald Dev, MD',
      addedOn: '2024-11-21T14:30:00Z',
      status: 'Active',
    },
    {
      admin: 'Ronald Dev, MD',
      addedOn: '2024-11-21T14:30:00Z',
      status: 'Active',
    },
    {
      admin: 'Ronald Dev, MD',
      addedOn: '2024-11-21T14:30:00Z',
      status: 'Active',
    },
    {
      admin: 'Ronald Dev, MD',
      addedOn: '2024-11-21T14:30:00Z',
      status: 'Active',
    },
  ]

  return {
    state: 'success',
    data: adminList,
  }
}

export { getAdminsAction }
