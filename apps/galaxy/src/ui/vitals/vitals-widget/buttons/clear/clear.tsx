'use client'

import { Button } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { useStore } from '../../store'

const ClearButton = ({
  patientId,
  quickNoteView,
}: {
  patientId: string
  quickNoteView?: boolean
}) => {
  const form = useFormContext()

  const { fetch } = useStore((state) => ({
    fetch: state.fetch,
  }))

  const onClear = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    form.reset({
      from: null,
      to: null,
      status: '',
    })

    return fetch(
      {
        patientId,
      },
      quickNoteView,
    )
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
