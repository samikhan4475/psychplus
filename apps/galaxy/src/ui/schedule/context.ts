import { State } from '@/types'
import { createContext, Dispatch, SetStateAction, useContext } from 'react'

interface Option {
  label: string
  value: string
}

interface FiltersContexType {
  filters: string[]
  setFilters: Dispatch<SetStateAction<string[]>>
}

interface DropdownContextType {
  insurancePlans: Option[]
  usStates: State[]
}

type ContextType = Dispatch<SetStateAction<boolean>>

const FilterVisibilityContext = createContext<ContextType | undefined>(
  undefined,
)
const DropdownContext = createContext<DropdownContextType | undefined>(
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

const useDropdownContext = (): DropdownContextType => {
  const context = useContext(DropdownContext)
  if (!context) {
    throw Error('useDropdownContext must be used within a context provider')
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
  DropdownContext,
  FiltersContext,
  useFiltersContext,
  useFilterVisibilityContext,
  useDropdownContext,
}
