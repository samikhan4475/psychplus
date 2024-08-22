'use client'

import { type StateCreator } from 'zustand'
import { AuthorityState, CodeErrorState, CodeSetState, CodeState } from '.'

const codeSetStore: StateCreator<CodeSetState> = (set) => ({
  codeSets: [],
  setCodeSets: (codeSets) => set({ codeSets }),
  codeSet: null,
  setCodeSet: (codeSet) => set({ codeSet }),
})

const authorityStore: StateCreator<AuthorityState> = (set) => ({
  authorityId: '',
  setAuthorityId: (authorityId) => set({ authorityId }),
  namespace: '',
  setNameSpace: (namespace) => set({ namespace }),
  assigningAuthority: null,
  setAssiginingAuthority: (assigningAuthority) => set({ assigningAuthority }),
})

const codeStore: StateCreator<CodeState> = (set) => ({
  newCode: null,
  setNewCode: (newCode) => set({ newCode }),
  newAttribute: null,
  setNewAttribute: (newAttribute) => set({ newAttribute }),
  editableAttribute: null,
  setEditableAttribute: (editableAttribute) =>
    set({ editableAttribute }),
  editableCode: null,
  setEditableCode: (editableCode) => set({ editableCode }),
  attributes:[],
  setAttributes: (attributes) => set({ attributes }),
  updateField: (type, key, value) =>
    set((state) => ({
      [type]: {
        ...state[type],
        [key]: value,
      },
    })),
})

const codeErrorStore: StateCreator<CodeErrorState> = (set) => ({
  codeErrors: {},
  codeAttributeErrors: {},
  attributeErrors: {},
  setCodeErrors: (codeErrors) => set({ codeErrors }),
  setAttributeErrors: (attributeErrors) => set({ attributeErrors }),
})

export { codeSetStore, authorityStore, codeStore, codeErrorStore }
