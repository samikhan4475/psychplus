import { cache } from 'react'
import { handleRequest } from '@psychplus/utils/api'
import { APP_HOST } from '@psychplus/utils/constants'
import { forwardQuery } from '@psychplus/utils/server'
import { type User } from './types'

const getUser = async (): Promise<User> =>
  handleRequest(
    fetch(forwardQuery(`${APP_HOST}/api/user`), {
      cache: 'no-store',
    }),
  )

const getUserCached = cache(getUser)

export { getUserCached as getUser }
