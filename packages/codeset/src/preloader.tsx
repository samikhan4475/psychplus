'use client'

import { useRef } from 'react'
import { type CodeSetStoreType } from './store'
import { type CodeSet } from './types'

const CodeSetPreloader = ({
  codeSets,
  store,
}: {
  codeSets: CodeSet[]
  store: CodeSetStoreType[]
}) => {
  const loaded = useRef(false)
  const setters = store.map((s) => s((state) => state.setCodeSets))

  if (!loaded.current) {
    loaded.current = true
    setters.forEach((set) => set(codeSets))
  }

  return null
}

export { CodeSetPreloader }
