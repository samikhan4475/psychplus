'use client'

import { shallow } from 'zustand/shallow'
import { createWithEqualityFn } from 'zustand/traditional'
import { createCodeSetStore } from '@psychplus/codeset'
import { combineStateCreators } from '@psychplus/utils/store'
import { codingCPTStore } from './coding-set-store'
import { CodingCPTSetState } from './types'

type CodingCPTType = CodingCPTSetState

const useStore = createWithEqualityFn<CodingCPTSetState>(
  combineStateCreators(codingCPTStore, createCodeSetStore),
  shallow,
)

export { useStore, type CodingCPTType }
