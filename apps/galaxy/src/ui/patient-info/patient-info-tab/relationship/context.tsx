'use client'

import { createContext, Dispatch, SetStateAction, useContext } from 'react'
import { Relationship } from '@/types'

interface PatientRelationshipContextType {
  relationships: Relationship[]
  setRelationships: Dispatch<SetStateAction<Relationship[]>>
  setLoading: Dispatch<SetStateAction<boolean>>
}

const PatientRelationshipContext = createContext<
  PatientRelationshipContextType | undefined
>(undefined)

const usePatientRelationshipContext = () => {
  const context = useContext(PatientRelationshipContext)

  if (!context) {
    throw new Error(
      'PatientRelationshipContext not found; did you forget to use PatientRelationshipContext.Provider?',
    )
  }

  return context
}

export { usePatientRelationshipContext, PatientRelationshipContext }
