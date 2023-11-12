'use client'

import { shallow } from 'zustand/shallow'
import { createWithEqualityFn } from 'zustand/traditional'
import { createUserStore, type UserState } from '@psychplus/user'
import { combineStateCreators } from '@psychplus/utils/store'

type StoreType = UserState

const useStore = createWithEqualityFn<StoreType>(
  combineStateCreators(createUserStore),
  shallow,
)

export { useStore }
