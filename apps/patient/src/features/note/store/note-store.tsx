'use client'

import { createContext, useContext, useRef } from 'react'
import { create, useStore, type StoreApi } from 'zustand'
import { persist } from 'zustand/middleware'
import { NoteSectionName } from '../constants'
import { NoteSectionItem } from '../types'

const NoteStoreContext = createContext<StoreApi<NoteStore> | undefined>(
  undefined,
)

interface NoteStore {
  notes: NoteSectionItem[]
  setNotes: (notes: NoteSectionItem[]) => void
  saveNoteData: (data: NoteSectionItem[], sectionName: NoteSectionName) => void
  getNoteData: (sectionName: string) => NoteSectionItem[]
}

const createNoteStore = (initialNotes: NoteSectionItem[]) =>
  create<NoteStore>()(
    persist(
      (set, get) => ({
        notes: initialNotes,
        setNotes: (notes) => set({ notes }),
        saveNoteData: (data, sectionName) =>
          set((state) => ({
            notes: updateNotes(state.notes, data, sectionName),
          })),
        getNoteData: (sectionName) =>
          get().notes.filter((note) => note.sectionName === sectionName),
      }),
      {
        name: 'note-storage',
        getStorage: () => sessionStorage,
      },
    ),
  )

interface NoteStoreProviderProps {
  notes: NoteSectionItem[]
}

const NoteStoreProvider = ({
  notes,
  children,
}: React.PropsWithChildren<NoteStoreProviderProps>) => {
  const storeRef = useRef<StoreApi<NoteStore>>()

  if (!storeRef.current) {
    storeRef.current = createNoteStore(notes)
  }

  return (
    <NoteStoreContext.Provider value={storeRef.current}>
      {children}
    </NoteStoreContext.Provider>
  )
}

const useNoteStore = <T,>(selector: (store: NoteStore) => T): T => {
  const context = useContext(NoteStoreContext)

  if (!context) {
    throw new Error(`useNoteStore must be used within NoteStoreProvider`)
  }

  return useStore(context, selector)
}

const updateNotes = (
  notes: NoteSectionItem[],
  data: NoteSectionItem[],
  sectionName: string,
) => {
  const otherNotes = notes.filter((note) => note.sectionName !== sectionName)
  return [...otherNotes, ...data]
}

export { useNoteStore, NoteStoreProvider }
