'use client'

import { Button } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { useStore } from '../store'
import { getInitialValues } from '../utils'
import { LocationFormSchemaType } from './schema'

const ClearButton = () => {
  const form = useFormContext<LocationFormSchemaType>()
  const { fetchLocations } = useStore((state) => ({
    fetchLocations: state.fetchLocations,
  }))

  const onClear = () => {
    form.reset(getInitialValues())
    fetchLocations({}, 1, true)
  }
  return (
    <Button
      color="gray"
      size="1"
      variant="outline"
      type="button"
      onClick={onClear}
      className="text-black"
    >
      Clear
    </Button>
  )
}

export { ClearButton }
