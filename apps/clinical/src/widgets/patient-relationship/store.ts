'use client'

import { shallow } from 'zustand/shallow'
import { createWithEqualityFn } from 'zustand/traditional'
import { createUserStore, type UserState } from '@psychplus/user'
import { combineStateCreators } from '@psychplus/utils/store'

type LinkAccountStoreType = UserState 

const useStore = createWithEqualityFn<LinkAccountStoreType>(
  combineStateCreators(createUserStore),
  shallow,
)

export { useStore, type LinkAccountStoreType }
