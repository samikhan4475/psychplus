'use client'

import { shallow } from 'zustand/shallow'
import { createWithEqualityFn } from 'zustand/traditional'
import { AuthorityCodeSet, CodeSetState, ParameterCodeSet, createCodeSetStore } from '@psychplus/codeset'
import { createPatientStore } from '@psychplus/patient'
import { createUserStore, type UserState } from '@psychplus/user'
import { combineStateCreators } from '@psychplus/utils/store'
import { StateCreator } from 'zustand'
import { Template } from '@psychplus/reports'

interface State {
  reportCategories: AuthorityCodeSet
  setReportCategories: (value: AuthorityCodeSet) => void
}

const createReportCategoriesStore: StateCreator<State> = (set) => ({
  reportCategories: {} as AuthorityCodeSet,
  setReportCategories: (reportCategories) => set({ reportCategories }),
})
type TemplateIndex = { [key: string]: Template[] | undefined }

interface TemplatesState {
  reportTemplates: Template[]
  setReportTemplates: (value: Template[]) => void
  templatesIndex: TemplateIndex
}

const createTemplatesStore: StateCreator<TemplatesState> = (set) => ({
  reportTemplates: [],
  templatesIndex: {},
  setReportTemplates: (reportTemplates) => set({ 
    reportTemplates,
    templatesIndex: createTemplatesIndex(reportTemplates),
  })
})


const createTemplatesIndex = (templates: Template[]) =>
  templates.reduce(
    (acc, template) => ({
      ...acc,
      [template.reportCategoryCode]: [ ...acc[template.reportCategoryCode]?? [], template]
    }),
    {} as TemplateIndex,
  )

interface ParametersState {
  parameterCodeSets: ParameterCodeSet[]
  setParameterCodeSets: (value: ParameterCodeSet[]) => void
}

const createParametersCodeSetStore: StateCreator<ParametersState> = (set) => ({
  parameterCodeSets: [],
  setParameterCodeSets: (parameterCodeSets) => set({
    parameterCodeSets,
  })
})

type ReportsStoreType = UserState & State & TemplatesState & ParametersState & CodeSetState

const useStore = createWithEqualityFn<ReportsStoreType>(
  combineStateCreators(
    createUserStore,
    createPatientStore,
    createCodeSetStore,
    createReportCategoriesStore,
    createTemplatesStore,
    createParametersCodeSetStore,
  ),
  shallow,
)

export { useStore, type ReportsStoreType, createParametersCodeSetStore }
