'use client'

import * as api from '@/api'
import { CommentSchemaType } from '../shared'
import type { GetCommentsData, StaffComment } from '../types'

const getStaffCommentsAction = async ({
  ...rest
}: Partial<CommentSchemaType>): Promise<api.ActionResult<GetCommentsData>> => {
  const response = await mockFetchStaffComments()
  if (response.state === 'error') {
    return {
      state: 'error',
      error: response.error,
    }
  }
  return {
    state: 'success',
    data: {
      comments: response.data,
    },
  }
}

const mockFetchStaffComments = async (): Promise<
  api.NetworkResult<StaffComment[]>
> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        headers: new Headers({}),
        state: 'success',
        data: [...Array(10)].map((_, ind) => ({
          comments:
            ind === 0
              ? "The EHR's scheduling module has made appointment management much easier and more organized. It’s great to have automated reminders for both patients and staff."
              : 'Nill',
          data_time: '03/12/24 00:00',
          organization: 'Psychplus',
          staff: 'John Smith, MD',
        })),
      })
    }, 2000)
  })
}

export { getStaffCommentsAction }
