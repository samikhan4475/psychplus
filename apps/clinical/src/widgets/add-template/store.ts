'use client'

import { UserState, createUserStore } from "@psychplus/user"
import { combineStateCreators } from "@psychplus/utils/store"
import { shallow } from "zustand/shallow"
import { createWithEqualityFn } from "zustand/traditional"

type TemplateStoreType = UserState

const useStore = createWithEqualityFn<TemplateStoreType>(
    combineStateCreators(createUserStore),
    shallow
)

export { useStore, type TemplateStoreType}