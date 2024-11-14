'use client'

import { Button } from '@radix-ui/themes'
import { useStore } from './store'

const FiltersToggleButton = () => {
  const { toggleFilters, showFilters } = useStore((state) => ({
    toggleFilters: state.toggleFilters,
    showFilters: state.showFilters,
  }))
  return (
    <Button
      size="1"
      variant="ghost"
      className="!m-0 text-1 font-regular text-indigo-12"
      color="indigo"
      type="button"
      onClick={toggleFilters}
    >
      {showFilters ? 'Hide Filters' : 'Show Filters'}
    </Button>
  )
}

export { FiltersToggleButton }
