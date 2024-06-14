import { handleRequest } from '@psychplus/utils/api'
import { API_URL } from '@psychplus/utils/constants'
import { createHeaders } from '@psychplus/utils/server'
import { payload, UserSetting } from '.'

const getUserSettings = (): Promise<UserSetting[]> =>
  handleRequest(
    fetch(
      `${API_URL}/api/users/self/settings?useHierarchicalQuery=false&level=User&settingsCategory=Application&categoryValue=CcdaModules&includeMetadata=false`,
      {
        cache: 'no-store',
        headers: createHeaders(),
      },
    ),
  )

const getSystemSettings = (payload: payload): Promise<UserSetting[]> =>
  handleRequest(
    fetch(`${API_URL}/api/settings/actions/search`, {
      method: 'POST',
      body: JSON.stringify(payload),
      cache: 'no-store',
      headers: createHeaders(),
    }),
  )

const updateUserSettings = (payload: UserSetting[]): Promise<UserSetting[]> =>
  handleRequest(
    fetch(`${API_URL}/api/users/self/settings`, {
      method: 'POST',
      body: JSON.stringify(payload),
      cache: 'no-store',
      headers: createHeaders(),
    }),
  )

export { getUserSettings, updateUserSettings, getSystemSettings }
