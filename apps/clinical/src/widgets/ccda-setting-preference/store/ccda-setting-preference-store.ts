import { StateCreator } from 'zustand'
import { UserSettingPreferenceState } from '.'

const ccdaSettingPreferenceStore: StateCreator<UserSettingPreferenceState> = (
  set,
) => ({
  user_settings: [],
  setUserSettings: (user_settings) => {
    set({ user_settings })
  },
})

export { ccdaSettingPreferenceStore }
