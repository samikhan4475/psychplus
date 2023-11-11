'use client'

import { shallow } from 'zustand/shallow'
import { createWithEqualityFn } from 'zustand/traditional'
import { createUserStore, type UserState } from '@psychplus/store/user'
import { combineStateCreators } from '@psychplus/store/utils'

type StoreType = UserState

const useStore = createWithEqualityFn<StoreType>(
  combineStateCreators(createUserStore),
  shallow,
)

export { useStore }
