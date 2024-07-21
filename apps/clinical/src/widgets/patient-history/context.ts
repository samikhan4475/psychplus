import { createContext, useContext } from 'react'
import { Patient } from '@psychplus/patient'

interface ContextType {
  profileHistory: Patient
}

const PatientHistoryContext = createContext<ContextType | undefined>(undefined)

const usePatientHistoryContext = (): ContextType => {
  const context = useContext(PatientHistoryContext)
  if (!context) {
    throw new Error(
      'usePatientHistoryContext must be used within a PatientHistoryContextProvider',
    )
  }
  return context
}

export { PatientHistoryContext, usePatientHistoryContext }
