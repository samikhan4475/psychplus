'use client'

import { Button } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { type NotesFilterSchemaType } from './left-panel-filters'
import { useStore } from './store'

const ClearButton = ({
  patientId,
  disabled = false,
}: {
  patientId: string
  disabled?: boolean
}) => {
  const form = useFormContext<NotesFilterSchemaType>()

  const { fetch } = useStore((state) => ({
    fetch: state.fetch,
  }))

  const onClear = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()

    form.reset()

    return fetch({
      patientId,
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
      disabled={disabled}
    >
      Clear
    </Button>
  )
}

export { ClearButton }
