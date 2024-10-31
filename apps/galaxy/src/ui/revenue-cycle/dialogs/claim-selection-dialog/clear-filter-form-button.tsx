import React from 'react'
import { Button } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { SchemaType } from './claim-list-filter-form'
import { useStore } from './store'

const ClearFilterFormButton = () => {
  const form = useFormContext<SchemaType>()
  const search = useStore((state) => state.claimsListSearch)
  const onClear = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    form.reset()
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
