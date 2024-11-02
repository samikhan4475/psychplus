'use client'

import { Button } from '@radix-ui/themes'
import { useStore as zustandUseStore } from 'zustand'
import { useStore } from '../store'

const FilterToggleButton = () => {
  const store = useStore()
  const { showFilters, toggleFilters } = zustandUseStore(store, (state) => ({
    showFilters: state.showFilters,
    toggleFilters: state.toggleFilters,
  }))

  return (
    <Button
      variant="ghost"
      size="1"
      type="button"
      color="indigo"
      highContrast
      onClick={toggleFilters}
      className="!m-0 text-1"
    >
      {showFilters ? 'Hide' : 'Show'} Filters
    </Button>
  )
}

export { FilterToggleButton }
