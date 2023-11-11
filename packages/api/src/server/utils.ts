import { headers as nextHeaders } from 'next/headers'
import type { TokenParams } from '@psychplus/types'
import { getAuthToken } from '@psychplus/auth'

const createCommonHeaders = (params: Partial<TokenParams>) => {
  const headers = new Headers()

  // Set Authorization header. By default, the provided token is used if it exists.
  // If it does not exist, it will fallback to using the token from request cookies.
  headers.set('Authorization', `Bearer ${params.token ?? getAuthToken()}`)

  // Set required PsychPlus headers.
  headers.set('PsychPlus-Application', `${process.env.APP_CODE ?? ''}`)
  headers.set(
    'PsychPlus-AppVersion',
    `${process.env.npm_package_version ?? ''}`,
  )
  headers.set('PsychPlus-RunEnvironment', `${process.env.NODE_ENV ?? ''}`)
  headers.set('PsychPlus-Device', `${nextHeaders().get('user-agent') ?? ''}`)

  return headers
}

export { createCommonHeaders }
