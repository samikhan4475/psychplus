import { UserSetting } from '@psychplus/ccda-setting-preference'

export const isEmptyResponse = (response: UserSetting[]) =>
  Array.isArray(response) && response.length === 0
