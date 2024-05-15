'use server'

import { revalidatePath } from 'next/cache'
import * as api from '@psychplus-v2/api'
import { ActionResult } from '@psychplus-v2/api'
import { getAuthCookies } from '@psychplus-v2/auth'
import { API_URL } from '@psychplus-v2/env'
import type { PolicyType } from '@psychplus-v2/types'

type AddConsentParams = { type: PolicyType }

const addPolicyConsent = async ({
  type,
}: AddConsentParams): Promise<ActionResult<void>> => {
  const auth = getAuthCookies()
  const signatureName = auth?.user?.firstName + ' ' + auth?.user?.lastName

  const result = await api.POST(`${API_URL}/api/patients/self/consents`, {
    type,
    signatureName,
  })

  if (result.state === 'error') {
    return {
      state: 'error',
      error: result.error,
    }
  }

  revalidatePath('appointments/search', 'layout')

  return {
    state: 'success',
    data: undefined,
  }
}

export { addPolicyConsent }
