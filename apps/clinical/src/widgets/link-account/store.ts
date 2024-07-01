'use client'

import { shallow } from 'zustand/shallow'
import { createWithEqualityFn } from 'zustand/traditional'
import { createCodeSetStore, type CodeSetState } from '@psychplus/codeset'
import { createUserStore, type UserState } from '@psychplus/user'
import { combineStateCreators } from '@psychplus/utils/store'

type LinkAccountStoreType = UserState & CodeSetState 

const useStore = createWithEqualityFn<LinkAccountStoreType>(
  combineStateCreators(createUserStore, createCodeSetStore),
  shallow,
)

export { useStore, type LinkAccountStoreType }
