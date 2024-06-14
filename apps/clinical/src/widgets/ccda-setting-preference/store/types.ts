import { UserSetting } from '../types'

export interface UserSettingPreferenceState {
  user_settings: UserSetting[]
  setUserSettings: (user_settings: UserSetting[]) => void
}
