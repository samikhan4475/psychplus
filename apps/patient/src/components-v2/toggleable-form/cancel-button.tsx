'use client'

import { Button } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { useToggleableFormContext } from './context'

const CancelButton = () => {
  const form = useFormContext()

  const { setOpen, setError } = useToggleableFormContext()

  return (
    <Button
      size="3"
      variant="outline"
      onClick={(e) => {
        e.preventDefault()
        setOpen(false)
        setError(undefined)
        form.reset()
      }}
      highContrast
    >
      Cancel
    </Button>
  )
}

export { CancelButton }
