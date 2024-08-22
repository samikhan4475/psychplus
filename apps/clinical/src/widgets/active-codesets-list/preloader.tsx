'use client'

import { useRef } from 'react'
import { type StoreApi, type UseBoundStore } from 'zustand'
import { type AssigningAuthority } from '@psychplus/codeset'
import { CodeSetsStoreType } from './store'

type BoundStoreType = UseBoundStore<StoreApi<CodeSetsStoreType>>

interface PreloaderProps {
  store: BoundStoreType
  authorityId: string
  namespace: string
  assignAuthority: AssigningAuthority[]
}

const Preloader = ({
  store,
  authorityId,
  namespace,
  assignAuthority,
}: PreloaderProps) => {
  const loaded = useRef(false)

  const { setCodeSets, setNameSpace, setAuthorityId, setAssiginingAuthority } =
    store((state) => ({
      setCodeSets: state.setCodeSets,
      setAuthorityId: state.setAuthorityId,
      setNameSpace: state.setNameSpace,
      setAssiginingAuthority: state.setAssiginingAuthority,
    }))

  if (!loaded.current) {
    const { id, codesets = [] } = assignAuthority[0] || {}
    loaded.current = true
    setCodeSets(codesets)
    setAuthorityId(authorityId)
    setNameSpace(namespace)
    setAssiginingAuthority({ id })
  }

  return null
}

export { Preloader }
