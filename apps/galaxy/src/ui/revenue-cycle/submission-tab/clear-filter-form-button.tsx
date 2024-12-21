import React from 'react'
import { Button } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { useStore } from './store'
import { SchemaType } from './submission-filter-form'

const ClearFilterFormButton = () => {
  const form = useFormContext<SchemaType>()
  const { search, setSelectedRows } = useStore((state) => ({
    search: state.search,
    setSelectedRows: state.setSelectedRows,
  }))
  const onClear = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    form.reset()
    setSelectedRows([])
    search()
  }
  return (
    <Button
      color="gray"
      className="text-black"
      size="1"
      variant="outline"
      type="button"
      onClick={onClear}
    >
      Clear
    </Button>
  )
}

export { ClearFilterFormButton }
