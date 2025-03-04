import toast from 'react-hot-toast'
import { create } from 'zustand'
import { getUserSettingsAction } from '../actions'
import { UserSetting } from '../types'

interface StoreState {
  userSettings: UserSetting[]
  timeZoneSetting: () => UserSetting
  fetchUserSettings: () => void
}

const useUserSettingStore = create<StoreState>((set,get) => ({
  userSettings: [],
  fetchUserSettings: async () => {
    const result = await getUserSettingsAction()
    if (result.state === 'error') {
      return toast.error(result.error)
    }
    
    set({ userSettings: result?.data ?? [] })
  },
  timeZoneSetting: () => {
    return get().userSettings.find(setting => setting.name === 'TimeZoneId') || {
      id: '',
      settingStatusCode: '',
      levelCode: '',
      categoryCode: '',
      categoryValue: '',
      name: 'TimeZoneId',
      content: 'America/Chicago'
    }
  }
}))

export { useUserSettingStore }
