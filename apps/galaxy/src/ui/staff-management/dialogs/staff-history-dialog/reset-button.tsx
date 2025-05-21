'use client'

import { Button } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { SchemaType } from './filter-form'
import { useStore } from './store'

const ResetButton = () => {
  const { search, staffId } = useStore((state) => ({
    search: state.search,
    staffId: state.staffId,
  }))
  const form = useFormContext<SchemaType>()

  const onClear = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    form.reset({
      historyCreatedFrom: null,
      historyCreatedTo: null,
    })
    return search(staffId as string)
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

export { ResetButton }
