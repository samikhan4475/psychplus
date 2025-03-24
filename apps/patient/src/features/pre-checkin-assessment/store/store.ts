import { UserSettingName } from '@psychplus-v2/constants'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import {
  saveUserSettings,
  updateUserSettings,
} from '@/features/account/profile/actions'
import { customToast } from '@/providers'
import {
  PRE_CHECKIN_ASSESSMENT_KEY,
  PreCheckinAssessmentTabs,
  SaveAction,
  TabDirection,
} from '../constants'

interface Store {
  preCheckInSettingsId: string
  tabsToShow: PreCheckinAssessmentTabs[]
  activeTab: PreCheckinAssessmentTabs
  completedTabs: PreCheckinAssessmentTabs[]
  isPreCheckInCompleted: boolean | undefined
  saveAction: SaveAction | null
  isSaveButtonDisabled: boolean
  isSaveButtonPressed: boolean
  hydrated: boolean
  showCompletionScreen: boolean

  setPreCheckInSettingsId: (id: string) => void
  setTabsToShow: (tabs: PreCheckinAssessmentTabs[]) => void
  setActiveTab: (tab: PreCheckinAssessmentTabs) => void
  setCompletedTabs: (tabs: PreCheckinAssessmentTabs[]) => void
  setIsPreCheckInCompleted: (status: boolean) => void
  setSaveAction: (action: SaveAction | null) => void
  setIsSaveButtonDisabled: (disabled: boolean) => void
  setIsSaveButtonPressed: (pressed: boolean) => void
  setHydrated: (status: boolean) => void
  setShowCompletionScreen: (showCompletionScreen: boolean) => void

  save: (params: {
    patientId: number
    isTabCompleted?: boolean
  }) => Promise<void>
  handleTabNavigation: (direction: TabDirection) => Promise<void>
  resetSaveButtonState: () => Promise<void>
}

const useStore = create<Store>()(
  persist(
    (set, get) => ({
      preCheckInSettingsId: '',
      tabsToShow: [],
      activeTab: PreCheckinAssessmentTabs.PatientInfo,
      completedTabs: [],
      isPreCheckInCompleted: undefined,
      saveAction: null,
      isSaveButtonDisabled: false,
      isSaveButtonPressed: false,
      hydrated: false,
      showCompletionScreen: false,

      setPreCheckInSettingsId: (id) => set({ preCheckInSettingsId: id }),
      setTabsToShow: (tabs) => set({ tabsToShow: tabs }),
      setActiveTab: (tab) => set({ activeTab: tab }),
      setCompletedTabs: (tabs) => set({ completedTabs: tabs }),
      setIsPreCheckInCompleted: (status) =>
        set({ isPreCheckInCompleted: status }),
      setSaveAction: (action) => set({ saveAction: action }),
      setIsSaveButtonDisabled: (disabled) =>
        set({ isSaveButtonDisabled: disabled }),
      setIsSaveButtonPressed: (pressed) =>
        set({ isSaveButtonPressed: pressed }),
      setHydrated: (status) => set({ hydrated: status }),
      setShowCompletionScreen: (showCompletionScreen) =>
        set({ showCompletionScreen }),

      save: async ({ patientId, isTabCompleted = true }) => {
        const {
          saveAction,
          handleTabNavigation,
          resetSaveButtonState,
          tabsToShow,
          activeTab,
          completedTabs,
          preCheckInSettingsId,
        } = get()

        const updatedTabs = getTabsWithCompletion(
          activeTab,
          completedTabs,
          isTabCompleted,
        )

        const isPreCheckInCompleted = tabsToShow.every((item) =>
          updatedTabs.includes(item),
        )

        const payload = {
          settingStatusCode: 'Active',
          levelCode: 'User',
          categoryCode: 'Resource',
          categoryValue: String(patientId),
          name: UserSettingName.PreCheckIn,
          content: JSON.stringify({
            preCheckInCompletedTabs: updatedTabs,
            isPreCheckInCompleted,
            activeTab:
              saveAction === SaveAction.Next && activeTab !== tabsToShow.at(-1)
                ? tabsToShow[
                    tabsToShow.findIndex((tab) => tab === activeTab) + 1
                  ]
                : activeTab,
          }),
        }
        const apiCall =
          preCheckInSettingsId === undefined ||
          preCheckInSettingsId === null ||
          preCheckInSettingsId === 'undefined'
            ? () => saveUserSettings(payload)
            : () => updateUserSettings(payload, preCheckInSettingsId)

        const res = await apiCall()
        if (res.state === 'error') {
          customToast({
            type: 'error',
            title: res.error ?? 'Failed to save',
          })
          resetSaveButtonState()
          return
        }

        set({ preCheckInSettingsId: res?.data?.id })
        customToast({ type: 'success', title: 'Saved!' })
        set({ completedTabs: updatedTabs })
        set({ isPreCheckInCompleted: isPreCheckInCompleted })
        if (saveAction === SaveAction.Next)
          await handleTabNavigation(TabDirection.Next)
        resetSaveButtonState()
        if (isPreCheckInCompleted && activeTab === tabsToShow.at(-1))
          set({ showCompletionScreen: true })
      },
      handleTabNavigation: async (direction: TabDirection) => {
        const {
          activeTab,
          setActiveTab,
          tabsToShow,
          resetSaveButtonState,
          completedTabs,
        } = get()
        const isPreCheckInCompleted = tabsToShow.every((item) =>
          completedTabs.includes(item),
        )
        const currentIndex = tabsToShow.findIndex((tab) => tab === activeTab)
        const newIndex =
          direction === TabDirection.Next ? currentIndex + 1 : currentIndex - 1

        if (newIndex >= 0 && newIndex < tabsToShow.length)
          setActiveTab(tabsToShow[newIndex])

        resetSaveButtonState()

        if (
          (direction === TabDirection.Next &&
            activeTab === tabsToShow.at(-1) &&
            !isPreCheckInCompleted) ||
          newIndex < 0
        ) {
          window.location.replace('/')
        }
      },
      resetSaveButtonState: async () =>
        set({
          isSaveButtonDisabled: false,
          isSaveButtonPressed: false,
          saveAction: null,
        }),
    }),
    {
      name: PRE_CHECKIN_ASSESSMENT_KEY,
      storage: createJSONStorage(() => localStorage),
      onRehydrateStorage: () => (state) => {
        if (state) state.setHydrated(true)
      },
      partialize: (state) => ({
        activeTab: state.activeTab,
        completedTabs: state.completedTabs,
        hydrated: state.hydrated,
      }),
    },
  ),
)

const getTabsWithCompletion = (
  activeTab: PreCheckinAssessmentTabs,
  completedTabs: PreCheckinAssessmentTabs[],
  isTabCompleted: boolean,
) => {
  if (isTabCompleted)
    return completedTabs.includes(activeTab)
      ? completedTabs
      : [...completedTabs, activeTab]

  return completedTabs.filter((tab) => tab !== activeTab)
}

export { useStore }
