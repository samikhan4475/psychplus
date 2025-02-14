import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import { PatientPharmacy } from '@/features/pharmacy/types'
import {
  PRE_CHECKIN_ASSESSMENT_KEY,
  PreCheckinAssessmentTabs,
  SaveAction,
  TabDirection,
} from '../constants'
import { shouldIncludeTab } from '../utils'

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
  pharmacies: PatientPharmacy[]
  setPharmacies: (pharmacies: PatientPharmacy[]) => void
  isDawSystemFeatureFlagEnabled: boolean
  setIsDawSystemFeatureFlagEnabled: (
    isDawSystemFeatureFlagEnabled?: boolean,
  ) => void
  isPreCheckinAssessmentCompleted: () => boolean
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
        const { handleTabNavigation, activeTab } = get()
        handleTabNavigation(TabDirection.Next, true)
        if (activeTab === PreCheckinAssessmentTabs.Questionnaire)
          window.location.replace('/')
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
          isDawSystemFeatureFlagEnabled,
          pharmacies,
        } = get()
        const tabs = Object.values(PreCheckinAssessmentTabs).filter((tab) =>
          shouldIncludeTab({
            tabId: tab,
            pharmacies,
            isDawSystemFeatureFlagEnabled,
          }),
        )
        const currentIndex = tabs.findIndex((tab) => tab === activeTab)
        const newIndex =
          direction === TabDirection.Next ? currentIndex + 1 : currentIndex - 1

        if (newIndex >= 0 && newIndex < tabs.length)
          setActiveTab(tabs[newIndex])

        if (!isSkip && currentIndex >= 0 && currentIndex < tabs.length)
          markTabAsCompleted(tabs[currentIndex])

        setSaveButtonPressed(false)
        setSaveAction(null)
      },
      setHydrated: (hydrated) => set({ hydrated }),
      pharmacies: [],
      setPharmacies: (pharmacies) => set({ pharmacies }),
      isDawSystemFeatureFlagEnabled: false,
      setIsDawSystemFeatureFlagEnabled: (isDawSystemFeatureFlagEnabled) =>
        set({ isDawSystemFeatureFlagEnabled }),
      isPreCheckinAssessmentCompleted: () => {
        const { completedTabs, pharmacies, isDawSystemFeatureFlagEnabled } =
          get()
        const totalTabs = Object.values(PreCheckinAssessmentTabs).filter(
          (tab) =>
            shouldIncludeTab({
              tabId: tab,
              pharmacies,
              isDawSystemFeatureFlagEnabled,
            }),
        )
        return completedTabs.length === totalTabs.length
      },
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
