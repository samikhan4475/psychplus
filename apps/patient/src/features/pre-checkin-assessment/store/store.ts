import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import {
  PRE_CHECKIN_ASSESSMENT_KEY,
  PreCheckinAssessmentTabs,
  SaveAction,
  TabDirection,
} from '../constants'

interface Store {
  activeTab: PreCheckinAssessmentTabs
  completedTabs: PreCheckinAssessmentTabs[]
  isSaveButtonPressed: boolean
  saveAction: SaveAction | null
  hydrated: boolean
  setActiveTab: (activeTab: PreCheckinAssessmentTabs) => void
  markTabAsCompleted: (tab: PreCheckinAssessmentTabs) => void
  setSaveButtonPressed: (pressed: boolean) => void
  setSaveAction: (action: SaveAction | null) => void
  save: () => Promise<void>
  skip: () => void
  handleTabNavigation: (
    direction: TabDirection,
    isSkip?: boolean,
  ) => Promise<void>
  setHydrated: (hydrated: boolean) => void
  tabsToShow: PreCheckinAssessmentTabs[]
  setTabsToShow: (tabsToShow: PreCheckinAssessmentTabs[]) => void
}

const useStore = create<Store>()(
  persist(
    (set, get) => ({
      activeTab: PreCheckinAssessmentTabs.PatientInfo,
      completedTabs: [],
      isSaveButtonPressed: false,
      saveAction: null,
      hydrated: false,
      setActiveTab: (activeTab) => set({ activeTab }),
      markTabAsCompleted: (tab) =>
        set((state) => ({
          completedTabs: state.completedTabs.includes(tab)
            ? state.completedTabs
            : [...state.completedTabs, tab],
        })),
      setSaveButtonPressed: (pressed) => set({ isSaveButtonPressed: pressed }),
      setSaveAction: (action) => set({ saveAction: action }),
      skip: () => {
        const { handleTabNavigation, activeTab, tabsToShow } = get()
        handleTabNavigation(TabDirection.Next, true)
        if (activeTab === tabsToShow.at(-1)) window.location.replace('/')
      },
      save: async () => {
        const { saveAction, handleTabNavigation } = get()
        await handleTabNavigation(TabDirection.Next)
        if (saveAction === SaveAction.Exit) window.location.href = '/'
      },
      handleTabNavigation: async (direction: TabDirection, isSkip = false) => {
        const {
          activeTab,
          setActiveTab,
          markTabAsCompleted,
          setSaveButtonPressed,
          setSaveAction,
          tabsToShow,
        } = get()
        const currentIndex = tabsToShow.findIndex((tab) => tab === activeTab)
        const newIndex =
          direction === TabDirection.Next ? currentIndex + 1 : currentIndex - 1

        if (newIndex >= 0 && newIndex < tabsToShow.length)
          setActiveTab(tabsToShow[newIndex])

        if (!isSkip && currentIndex >= 0 && currentIndex < tabsToShow.length)
          markTabAsCompleted(tabsToShow[currentIndex])

        setSaveButtonPressed(false)
        setSaveAction(null)
      },
      setHydrated: (hydrated) => set({ hydrated }),
      tabsToShow: [],
      setTabsToShow: (tabsToShow) => set({ tabsToShow }),
    }),
    {
      name: PRE_CHECKIN_ASSESSMENT_KEY,
      storage: createJSONStorage(() => localStorage),
      onRehydrateStorage: () => (state) => {
        if (state) {
          state.setHydrated(true)
        }
      },
      partialize: (state) => ({
        activeTab: state.activeTab,
        completedTabs: state.completedTabs,
        hydrated: state.hydrated,
      }),
    },
  ),
)

export { useStore }
