import { APP_CODE, APP_ENV, APP_VERSION } from '@psychplus/utils/constants'
import { type ApiOptions } from './api'

const createCommonHeaders = (options: ApiOptions) => {
  const headers = new Headers()

  // Set Authorization header with token if provided.
  if (options.token) {
    headers.set('Authorization', `Bearer ${options.token}`)
  }

  // Set required PsychPlus headers.
  headers.set('PsychPlus-Application', `${APP_CODE ?? ''}`)
  headers.set('PsychPlus-AppVersion', `${APP_VERSION ?? ''}`)
  headers.set('PsychPlus-RunEnvironment', `${APP_ENV ?? ''}`)
  headers.set('PsychPlus-Device', `${options.userAgent ?? ''}`)

  return headers
}

export { createCommonHeaders }
