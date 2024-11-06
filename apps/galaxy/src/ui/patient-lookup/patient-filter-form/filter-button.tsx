'use client'

import { Button } from '@radix-ui/themes'
import { useStore } from '../store'

const FilterButton = () => {
  const { showFilters, toggleFilters } = useStore((state) => ({
    showFilters: state.showFilters,
    toggleFilters: state.toggleFilters,
  }))
  return (
    <Button
      size="1"
      variant="ghost"
      type="button"
      className="text-pp-text-primary-base"
      onClick={toggleFilters}
    >
      {showFilters ? 'Hide Filters' : 'Show Filters'}
    </Button>
  )
}

export { FilterButton }
