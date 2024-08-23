import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import { GALAXY_APP_LOCAL_STORAGE_KEY } from '@/constants'

interface NavigationTab {
  href: string
  label: string
}

interface Store {
  tabs: NavigationTab[]
  addTab: (tab: NavigationTab) => void
  removeTab: (name: string) => void
}

const useStore = create<Store>()(
  persist(
    (set, get) => ({
      tabs: [],
      addTab: (tab) => set(addTabReducer(tab)),
      removeTab: (name) => set(removeTabReducer(name)),
    }),
    {
      name: GALAXY_APP_LOCAL_STORAGE_KEY,
      storage: createJSONStorage(() => localStorage),
    },
  ),
)

const addTabReducer =
  (tab: NavigationTab) =>
  (prev: Store): Partial<Store> => {
    if (prev.tabs.find((_tab) => _tab.href === tab.href)) {
      return {}
    }

    return {
      tabs: [...prev.tabs, tab],
    }
  }

const removeTabReducer =
  (name: string) =>
  (prev: Store): Partial<Store> => {
    return {
      tabs: prev.tabs.filter((tab) => tab.href !== name),
    }
  }

export { useStore }
