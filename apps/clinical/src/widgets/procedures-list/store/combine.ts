'use client'

import { shallow } from 'zustand/shallow'
import { createWithEqualityFn } from 'zustand/traditional'
import { combineStateCreators } from '@psychplus/utils/store'
import { procedureStore } from './procedure-store'
import { ProcedureStoreType } from './types'

const useStore = createWithEqualityFn<ProcedureStoreType>(
  combineStateCreators(procedureStore),
  shallow,
)

export { useStore }
