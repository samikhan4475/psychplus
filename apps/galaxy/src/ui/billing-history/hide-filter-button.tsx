'use client'

import { Button } from '@radix-ui/themes'
import { ListFilter } from 'lucide-react'
import { useStore } from './store'

const HideFilterButton = () => {
  const { toggleFilters, showFilters } = useStore((state) => ({
    toggleFilters: state.toggleFilters,
    showFilters: state.showFilters,
  }))

  return (
    <Button
      className="text-pp-blue h-6 border border-solid border-gray-7 bg-indigo-5 text-1 font-regular"
      onClick={() => toggleFilters()}
    >
      <ListFilter size={12} />
      {showFilters ? 'Hide Filters' : 'Show Filters'}
    </Button>
  )
}

export { HideFilterButton }
