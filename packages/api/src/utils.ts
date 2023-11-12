import { type ApiOptions } from './api'

const createCommonHeaders = (options: ApiOptions) => {
  const headers = new Headers()

  // Set Authorization header with token if provided.
  if (options.token) {
    headers.set('Authorization', `Bearer ${options.token}`)
  }

  // Set required PsychPlus headers.
  headers.set('PsychPlus-Application', `${process.env.APP_CODE ?? ''}`)
  headers.set(
    'PsychPlus-AppVersion',
    `${process.env.npm_package_version ?? ''}`,
  )
  headers.set('PsychPlus-RunEnvironment', `${process.env.NODE_ENV ?? ''}`)
  headers.set('PsychPlus-Device', `${options.userAgent ?? ''}`)

  return headers
}

export { createCommonHeaders }
