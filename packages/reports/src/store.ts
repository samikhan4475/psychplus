'use client'

import { UserState, createUserStore } from "@psychplus/user"
import { combineStateCreators } from "@psychplus/utils/store"
import { shallow } from "zustand/shallow"
import { createWithEqualityFn } from "zustand/traditional"
import { StateCreator } from "zustand"
import { AuthorityCodeSet, ParameterCodeSet } from "@psychplus/codeset"


interface ReportCategoriesState {
  reportCategories: AuthorityCodeSet
  setReportCategories: (value: AuthorityCodeSet) => void
}

const createCategoriesStore: StateCreator<ReportCategoriesState> = (set) => ({
  reportCategories: {} as AuthorityCodeSet,
  setReportCategories: (reportCategories) => set({ reportCategories }),
})

interface ParametersCodesetState {
  parameterCodeSets: ParameterCodeSet[]
  setParameterCodeSets: (value: ParameterCodeSet[]) => void
}

const createParametersCodeSetStore: StateCreator<ParametersCodesetState> = (set) => ({
  parameterCodeSets: [],
  setParameterCodeSets: (parameterCodeSets) => set({
    parameterCodeSets,
  })
})

type TemplateStoreType = UserState & ReportCategoriesState & ParametersCodesetState

const useStore = createWithEqualityFn<TemplateStoreType>(
    combineStateCreators(createUserStore, createCategoriesStore, createParametersCodeSetStore),
    shallow
)

export { useStore, type TemplateStoreType}