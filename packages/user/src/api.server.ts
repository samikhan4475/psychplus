import { cache } from 'react'
import { APP_HOST } from '@psychplus/utils/constants'
import { forwardQuery } from '@psychplus/utils/server'
import { type User } from './types'

const getUser = async (): Promise<User> =>
  fetch(forwardQuery(`${APP_HOST}/api/user`), {
    cache: 'no-store',
  }).then((res) => res.json())

const getUserCached = cache(getUser)

export { getUserCached as getUser }
