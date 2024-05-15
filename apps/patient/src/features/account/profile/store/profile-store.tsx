'use client'

import { createContext, useContext, useRef } from 'react'
import type { PatientProfile } from '@psychplus-v2/types'
import { create, useStore, type StoreApi } from 'zustand'

const ProfileStoreContext = createContext<StoreApi<ProfileStore> | undefined>(
  undefined,
)

interface ProfileStore {
  profile: PatientProfile
  setProfile: (profile: PatientProfile) => void
}

const createProfileStore = (profile: PatientProfile) =>
  create<ProfileStore>((set) => ({
    profile,
    setProfile: (profile) => {
      set({ profile })
    },
  }))

interface ProfileStoreProviderProps {
  profile: PatientProfile
}

const ProfileStoreProvider = ({
  profile,
  children,
}: React.PropsWithChildren<ProfileStoreProviderProps>) => {
  const storeRef = useRef<StoreApi<ProfileStore>>()

  if (!storeRef.current) {
    storeRef.current = createProfileStore(profile)
  }

  return (
    <ProfileStoreContext.Provider value={storeRef.current}>
      {children}
    </ProfileStoreContext.Provider>
  )
}

const useProfileStore = <T,>(selector: (store: ProfileStore) => T): T => {
  const context = useContext(ProfileStoreContext)

  if (!context) {
    throw new Error(`useProfileStore must be use within ProfileStoreProvider`)
  }

  return useStore(context, selector)
}

export { useProfileStore, ProfileStoreProvider }
