'use client'

import { useParams } from 'next/navigation'
import { Button } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { SchemaType } from './organization-users-list-filter-form'
import { useStore } from './store'

const ClearButton = () => {
  const { id } = useParams<{ id: string }>()
  const form = useFormContext<SchemaType>()
  const { search } = useStore((state) => ({
    search: state.search,
  }))
  const onClear = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    form.reset()
    search({
      organizationIds: [id],
    })
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

export { ClearButton }
