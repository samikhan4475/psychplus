import React from 'react'
import { Button } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { SchemaType } from './staff-filter-form'
import { useStore } from './store'

const ClearButton = () => {
  const form = useFormContext<SchemaType>()
  const { search, pageSize } = useStore((state) => ({
    search: state.search,
    pageSize: state.pageSize,
  }))
  const onClear = () => {
    form.reset()
    return search({}, 1, pageSize, true)
  }
  return (
    <Button
      size="1"
      color="gray"
      className="text-black"
      variant="outline"
      type="button"
      onClick={onClear}
    >
      Clear
    </Button>
  )
}

export default ClearButton
