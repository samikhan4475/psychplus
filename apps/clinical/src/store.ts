'use client'

import { create } from 'zustand'
import { createCodeSetStore, type CodeSetState } from '@psychplus/store/codes'

const useStore = create<CodeSetState>()((...a) => ({
  ...createCodeSetStore(...a),
}))

export { useStore }
