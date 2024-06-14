'use client'

import { shallow } from 'zustand/shallow'
import { createWithEqualityFn } from 'zustand/traditional'
import { combineStateCreators } from '@psychplus/utils/store'
import { ccdaSettingPreferenceStore, UserSettingPreferenceState } from '.'

type UserSettingPreferenceStoreType = UserSettingPreferenceState

const useStore = createWithEqualityFn<UserSettingPreferenceStoreType>(
  combineStateCreators(ccdaSettingPreferenceStore),
  shallow,
)

export { useStore, type UserSettingPreferenceStoreType }
