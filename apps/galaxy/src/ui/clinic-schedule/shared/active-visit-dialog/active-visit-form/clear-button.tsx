'use client'

import React from 'react'
import { Button } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { useStore } from '../store'
import { ActiveVisitFilters } from '../types'
import { getInitialVisitFiltersValues } from '../utils'
import { ActiveVisitSchemaType } from './schema'

interface ClearButtonProps {
  filters: ActiveVisitFilters
}
const ClearButton = ({ filters }: ClearButtonProps) => {
  const form = useFormContext<ActiveVisitSchemaType>()
  const { fetchVisits } = useStore((state) => ({
    fetchVisits: state.fetchVisits,
  }))
  const handleClear = () => {
    form.reset(getInitialVisitFiltersValues(filters))
    fetchVisits(getInitialVisitFiltersValues(filters), 1, true)
  }
  return (
    <Button
      variant="outline"
      color="gray"
      size="1"
      className="text-black"
      onClick={handleClear}
    >
      Clear
    </Button>
  )
}

export { ClearButton }
