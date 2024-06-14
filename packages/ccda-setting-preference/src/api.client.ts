// @ts-ignore

import { handleRequest } from '@psychplus/utils/api'
import { createHeaders } from '@psychplus/utils/client'
import { payload, UserSetting } from '.'

const getUserSettings = (payload: payload): Promise<UserSetting[]> =>
  handleRequest(
    fetch(`/galaxy/api/settings/actions/search`, {
      method: 'POST',
      body: JSON.stringify(payload),
      cache: 'no-store',
      headers: createHeaders(),
    }),
  )

const updateUserSettings = (payload: UserSetting[]): Promise<UserSetting[]> =>
  handleRequest(
    fetch(`/galaxy/api/users/self/settings`, {
      method: 'POST',
      body: JSON.stringify(payload),
      cache: 'no-store',
      headers: createHeaders(),
    }),
  )

export { getUserSettings, updateUserSettings }
