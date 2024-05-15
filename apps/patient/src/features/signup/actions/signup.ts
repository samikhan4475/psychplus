'use server'

import * as api from '@psychplus-v2/api'
import { ActionResult } from '@psychplus-v2/api'
import { API_URL } from '@psychplus-v2/env'
import { PatientProfile } from '@psychplus-v2/types'
import { loginAction } from '@/actions'
import { SignupUserParams } from '../types'

const signupAction = async (
  params: SignupUserParams,
): Promise<ActionResult<void>> => {
  const result = await api.POST<PatientProfile>(
    `${API_URL}/api/users/signup`,
    params,
  )

  if (result.state === 'error') {
    return {
      state: 'error',
      error: result.error || 'Something went wrong',
    }
  }

  const loginResponse = await loginAction({
    username: params.contactInfo.email,
    password: params.password,
    next: null,
  })

  if (loginResponse.state === 'error') {
    return {
      state: 'error',
      error: loginResponse.error,
    }
  }

  return {
    state: 'success',
    data: undefined,
  }
}

export { signupAction }
