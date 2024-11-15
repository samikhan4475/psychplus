import toast from 'react-hot-toast'
import { create } from 'zustand'
import { saveWidgetAction } from '@/actions/save-widget'
import { QuickNoteHistory } from '@/types'
import { QuickNoteSectionName } from '../quicknotes/constants'
import { QuestionnaireTabs } from './constants'
import {
  getQuestionnairesAddToNotes,
  getQuestionnairesHistories,
} from './questionnaires-widget/actions'
import {
  transformAddToNotesData,
  transformHistories,
} from './questionnaires-widget/data'

interface Store {
  activeQuestionnaireTab: string
  viewedQuestionnaireTabs: Set<string>
  setQuestionnaireActiveTab: (tab: string) => void
  // state for the widget tabs
  activeTab: string
  viewedTabs: Set<string>
  setActiveTab: (tab: string) => void
  // state for the questionnaires widget
  selectedTabs: string[]
  setSelectedTabs: (tabId: string) => void
  handleAddToNotes: (
    data: QuickNoteHistory[],
    questionnaire: string,
    patientId: string | number,
  ) => void
  initializeQuestionnaires: (patientId: string) => void
  histories: { [key: string]: QuickNoteHistory[] }
  addedToNotes: { [key: string]: string[] }
}

const initialState = {
  selectedTabs: [],
  histories: {},
  addedToNotes: {},
}

const useStore = create<Store>((set, get) => ({
  ...initialState,
  activeQuestionnaireTab: QuestionnaireTabs.DASHBOARD_TAB,
  viewedQuestionnaireTabs: new Set([QuestionnaireTabs.DASHBOARD_TAB]),
  setQuestionnaireActiveTab: (activeQuestionnaireTab) => {
    const viewedQuestionnaireTabs = get().viewedQuestionnaireTabs
    viewedQuestionnaireTabs.add(activeQuestionnaireTab)

    set({
      activeQuestionnaireTab,
      viewedQuestionnaireTabs,
    })
  },
  // store for the widget tabs
  activeTab: 'ListView',
  viewedTabs: new Set('ListView'),
  setActiveTab: (activeTab) => {
    const viewedTabs = get().viewedTabs
    viewedTabs.add(activeTab)

    set({
      activeTab,
      viewedTabs,
    })
  },
  // store for the questionnaires widget
  setSelectedTabs: (tabId: string) => {
    const selectedTabs = get().selectedTabs
    if (!selectedTabs.includes(tabId)) {
      set({ selectedTabs: [...selectedTabs, tabId] })
    } else {
      set({ selectedTabs: selectedTabs.filter((tab) => tab !== tabId) })
    }
  },
  handleAddToNotes: async (data, questionnaire, patientId) => {
    const filterd = Array.isArray(data)
      ? data.filter((item) => item.addToNote)
      : []
    const addToNoteData = [] as string[]
    filterd.forEach((element) => {
      addToNoteData.push(element.createdOn)
    })

    if (addToNoteData.length > 10) {
      toast.error('You can only add up to 10 notes at a time!')
      return
    }

    const payload = [
      {
        pid: Number(patientId),
        sectionName: `${QuickNoteSectionName.AddToNoteQuestionnaire}-${questionnaire}`,
        sectionItem: questionnaire,
        sectionItemValue: addToNoteData?.toString() || 'empty',
      },
    ]

    const result = await saveWidgetAction({
      patientId: patientId.toString(),
      data: payload,
    })

    if (result.state === 'success') {
      toast.success('Saved!')
      set({
        addedToNotes: {
          ...get().addedToNotes,
          [questionnaire]: addToNoteData,
        },
      })
    } else {
      toast.error('Failed to save!')
    }
  },
  initializeQuestionnaires: async (patientId) => {
    set(initialState)
    const [addToNotesResponse, historiesResponse] = await Promise.all([
      getQuestionnairesAddToNotes({ patientId }),
      getQuestionnairesHistories({ patientId }),
    ])
    const histories = transformHistories(
      historiesResponse.state === 'success' ? historiesResponse.data : [],
    )

    const { addedToNotes, autoUpdateAddToNotes } = transformAddToNotesData(
      addToNotesResponse.state === 'success' ? addToNotesResponse.data : [],
      histories,
      patientId,
    )

    if (autoUpdateAddToNotes.length > 0) {
      await saveWidgetAction({
        patientId: patientId.toString(),
        data: autoUpdateAddToNotes,
      })
    }

    set({ histories, addedToNotes, selectedTabs: Object.keys(addedToNotes) })
  },
}))

export { useStore }
