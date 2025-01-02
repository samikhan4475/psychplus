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
  handleDeleteQuestionnaire: (
    questionnaireDate: string,
    questionnaire: string,
    patientId: string,
  ) => void
  initializeQuestionnaires: (patientId: string) => void
  histories: { [key: string]: QuickNoteHistory[] }
  addedToNotes: { [key: string]: string[] }
  showNoteViewValue: string | null
  updateShowNoteView: (checked: boolean, patientId: string) => Promise<void>
  initializeNotesQuesionnaires: (
    patientId: string,
    addedToNotesData: { [key: string]: string[] | string },
  ) => void
}

const initialState = {
  selectedTabs: [],
  histories: {},
  addedToNotes: {},
  showNoteViewValue: null,
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
    const filtered = Array.isArray(data)
      ? data.filter((item) => item.addToNote)
      : []
    const addToNoteData = [] as string[]
    filtered.forEach((element) => {
      addToNoteData.push(element.createdOn)
    })

    if (addToNoteData.length > 10) {
      toast.error('You can only add maximums 10 scores in note.')
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

    if (addToNotesResponse.state === 'success') {
      const addedToNotes = transformAddToNotesData(addToNotesResponse.data)
      const showNoteViewValue =
        addedToNotes['ShowNoteView']?.[0] === 'show' ? 'show' : 'hide'
      const addedToNotesKeys = Object.keys(addedToNotes)
      set({ showNoteViewValue, addedToNotes, selectedTabs: addedToNotesKeys })
    }

    if (historiesResponse.state === 'success') {
      const histories = transformHistories(historiesResponse.data)
      set({ histories })
    }
  },

  initializeNotesQuesionnaires: async (patientId, addedToNotesData) => {
    set(initialState)
    const [historiesResponse] = await Promise.all([
      getQuestionnairesHistories({ patientId }),
    ])
    const showNoteViewValue =
      addedToNotesData['ShowNoteView'] === 'show' ? 'show' : 'hide'
    set({ showNoteViewValue })

    if (historiesResponse.state === 'success') {
      const histories = transformHistories(historiesResponse.data)
      set({ histories })
    }
  },
  updateShowNoteView: async (checked, patientId) => {
    const result = await saveWidgetAction({
      patientId: patientId.toString(),
      data: [
        {
          pid: Number(patientId),
          sectionName: QuickNoteSectionName.QuestionnaireActualNoteView,
          sectionItem: 'ShowNoteView',
          sectionItemValue: checked ? 'show' : 'hide',
        },
      ],
    })

    if (result.state === 'success') {
      set({ showNoteViewValue: checked ? 'show' : 'hide' })
      toast.success(
        checked
          ? 'Added in Actual Note View!'
          : 'Removed from Actual Note View!!',
      )
    } else {
      toast.error('Failed to save!')
    }
  },
  handleDeleteQuestionnaire: async (
    questionnaireDate: string,
    questionnaire: string,
    patientId: string,
  ) => {
    const filtered = get().addedToNotes[questionnaire].filter(
      (item) => item !== questionnaireDate,
    )
    const payload = [
      {
        pid: Number(patientId),
        sectionName: `${QuickNoteSectionName.AddToNoteQuestionnaire}-${questionnaire}`,
        sectionItem: questionnaire,
        sectionItemValue: filtered?.toString() || 'empty',
      },
    ]
    const result = await saveWidgetAction({
      patientId: patientId.toString(),
      data: payload,
    })
    if (result.state === 'success') {
      toast.success('Deleted!')
      set({
        addedToNotes: {
          ...get().addedToNotes,
          [questionnaire]: filtered,
        },
      })
    } else {
      toast.error('Failed to delete!')
    }
  },
}))

export { useStore }
