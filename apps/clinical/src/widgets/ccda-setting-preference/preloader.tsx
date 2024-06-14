'use client'

import { useRef } from 'react'
import { type StoreApi, type UseBoundStore } from 'zustand'
import { UserSetting } from '@psychplus/ccda-setting-preference'
import { UserSettingPreferenceStoreType } from './store'

type BoundStoreType = UseBoundStore<StoreApi<UserSettingPreferenceStoreType>>

interface PreloaderProps {
  store: BoundStoreType
  user_settings: UserSetting[]
}

const Preloader = ({ store, user_settings }: PreloaderProps) => {
  const loaded = useRef(false)

  const { setUserSettings } = store((state) => ({
    setUserSettings: state.setUserSettings,
  }))

  if (!loaded.current) {
    loaded.current = true
    setUserSettings(user_settings)
  }

  return null
}

export { Preloader }
