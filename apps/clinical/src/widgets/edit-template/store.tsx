'use client'

import { UserState, createUserStore } from "@psychplus/user"
import { combineStateCreators } from "@psychplus/utils/store"
import { shallow } from "zustand/shallow"
import { createWithEqualityFn } from "zustand/traditional"
import { Parameter } from "./types"
import { StateCreator } from "zustand"
import { AuthorityCodeSet } from "@psychplus/codeset"

interface ParametersState {
  parameters: Parameter[]
  setParameters: (value: Parameter[]) => void
}

interface ReportCategoriesState {
  reportCategories: AuthorityCodeSet
  setReportCategories: (value: AuthorityCodeSet) => void
}

const createStore: StateCreator<ParametersState> = (set) => ({
  parameters: [],
  setParameters: (parameters) => set({ parameters })
})

const createCategoriesStore: StateCreator<ReportCategoriesState> = (set) => ({
  reportCategories: {} as AuthorityCodeSet,
  setReportCategories: (reportCategories) => set({ reportCategories }),
})

type TemplateStoreType = UserState & ParametersState & ReportCategoriesState

const useStore = createWithEqualityFn<TemplateStoreType>(
    combineStateCreators(createUserStore, createStore, createCategoriesStore),
    shallow
)

export { useStore, type TemplateStoreType}