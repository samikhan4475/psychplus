'use client'

import { type StateCreator } from 'zustand'
import { AssigningAuthoritiesState } from './types'

const AssigningAuthoritiesStore: StateCreator<AssigningAuthoritiesState> = (
  set,
  get,
) => ({
  assigningAuthorities: [],
  newAssigningAuthority: null,
  setAssigningAuthorities: (assigningAuthorities) =>
    set({ assigningAuthorities }),
  setNewAssigningAuthority: () => {
    const currentNewAssigningAuthority = get().newAssigningAuthority
    if (currentNewAssigningAuthority === null) {
      set({
        newAssigningAuthority: {
          codeSystemName: '',
          displayName: '',
          editPermissionCode: '',
          oid: '',
          namespace: '',
          viewPermissionCode: '',
        },
      })
    } else {
      set({ newAssigningAuthority: null })
    }
  },
})

export { AssigningAuthoritiesStore }
