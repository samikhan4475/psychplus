'use client'

import { create } from 'zustand'
import { createUserStore, type UserState } from '@psychplus/store/user'

const useStore = create<UserState>()((...a) => ({
  ...createUserStore(...a),
}))

export { useStore }
