import { createContext, Dispatch, SetStateAction, useContext } from 'react'

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

export { FilterVisibilityContext, useFilterVisibilityContext }
