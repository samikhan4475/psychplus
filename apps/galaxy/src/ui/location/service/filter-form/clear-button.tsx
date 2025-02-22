'use client'

import { Button } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { useStore } from '../store'
import { getInitialFilterValues } from '../utils'
import { ServiceFiltersSchemaType } from './schema'

const ClearButton = () => {
  const form = useFormContext<ServiceFiltersSchemaType>()
  const { fetchServices } = useStore((state) => ({
    fetchServices: state.fetchServices,
  }))
  const handleClear = () => {
    form.reset(getInitialFilterValues())
    return fetchServices(getInitialFilterValues(), 1, true)
  }
  return (
    <Button
      color="gray"
      size="1"
      variant="outline"
      type="button"
      className="text-black"
      onClick={handleClear}
    >
      Clear
    </Button>
  )
}

export { ClearButton }
