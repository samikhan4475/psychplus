'use server'

import { redirect } from 'next/navigation'
import * as api from '@psychplus-v2/api'
import { type ActionResult } from '@psychplus-v2/api'
import { login, setAuthCookies, type AuthRequest } from '@psychplus-v2/auth'
import { API_URL } from '@psychplus-v2/env'
import { createAuthzHeader } from '@psychplus-v2/headers'
import { scriptSurePatientLogin, setCookie } from '@psychplus-v2/scriptsure'
import { getUserFullName } from '@psychplus-v2/utils'
import { jwtDecode } from 'jwt-decode'

const SELF_PROFILE_URL = `${API_URL}/api/patients/self/profile`
const PATIENT_ROLE = 'Patient'

interface LoginRequest extends AuthRequest {
  next: string | null
  shouldRedirect?: boolean
}

const loginAction = async ({
  next,
  shouldRedirect = true,
  ...request
}: LoginRequest): Promise<ActionResult<void>> => {
  const loginResponse = await login(request)

  if (loginResponse.state === 'error') {
    return {
      state: 'error',
      error: loginResponse.error,
    }
  }

  const decoded = jwtDecode<{ role: string }>(loginResponse.data.accessToken)

  const roles = Array.isArray(decoded.role) ? decoded.role : [decoded.role]

  if (!roles.includes(PATIENT_ROLE)) {
    return {
      state: 'error',
      error: 'Invalid credentials',
    }
  }

  const profileResponse = await api.GET<{
    id: number
    legalName: { firstName: string; lastName: string }
  }>(SELF_PROFILE_URL, {
    headers: createAuthzHeader(loginResponse.data.accessToken),
  })

  if (profileResponse.state === 'error') {
    return {
      state: 'error',
      error: profileResponse.error,
    }
  }

  setAuthCookies(loginResponse.data)

  const scriptSureSession = await scriptSurePatientLogin(
    String(profileResponse.data.id),
    getUserFullName(profileResponse.data.legalName),
  )

  if (scriptSureSession) {
    setCookie(scriptSureSession)
  }

  if (!shouldRedirect) {
    return {
      state: 'success',
      data: undefined,
    }
  }

  const redirectUrl = next ? next : '/'
  redirect(redirectUrl)
}

export { loginAction }
