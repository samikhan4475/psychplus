'use client'

import { useParams } from 'next/navigation'
import { Button } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { useStore } from './store'
import { VisitsSchemaType } from './visits-filter-form'

const ClearButton = () => {
  const form = useFormContext<VisitsSchemaType>()
  const { id } = useParams()

  const { fetchVisitsList } = useStore((state) => ({
    fetchVisitsList: state.fetchVisitsList,
  }))

  const onClear = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    form.reset()
    const payload = {
      providerIds: [Number(id)],
    }
    return fetchVisitsList(payload)
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
