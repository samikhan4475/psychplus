import { createContext, Dispatch, SetStateAction, useContext } from 'react'

interface ContextType {
  filters: string[]
  setFilters: Dispatch<SetStateAction<string[]>>
}

const RoundingFiltersContext = createContext<ContextType | undefined>(undefined)

const useRoundingFiltersContext = (): ContextType => {
  const context = useContext(RoundingFiltersContext)
  if (!context) {
    throw Error(
      'useRoundingFiltersContext must be called inside the RoundingFiltersContext provider',
    )
  }
  return context
}

export { RoundingFiltersContext, useRoundingFiltersContext }
