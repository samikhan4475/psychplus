'use client'

import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
} from 'react'

interface FiltersContexType {
  filters: string[]
  setFilters: Dispatch<SetStateAction<string[]>>
}

type ContextType = Dispatch<SetStateAction<boolean>>

const FilterVisibilityContext = createContext<ContextType | undefined>(
  undefined,
)

const useFilterVisibilityContext = (): ContextType => {
  const context = useContext(FilterVisibilityContext)
  if (!context) {
    throw Error(
      'useFilterVisibilityContext must be called inside the FilterVisibilityContext provider',
    )
  }
  return context
}

const FiltersContext = createContext<FiltersContexType | undefined>(undefined)

const useFiltersContext = (): FiltersContexType => {
  const context = useContext(FiltersContext)
  if (!context) {
    throw Error(
      'useFiltersContext must be called inside the FiltersContext provider',
    )
  }
  return context
}

export {
  FilterVisibilityContext,
  FiltersContext,
  useFiltersContext,
  useFilterVisibilityContext,
}
