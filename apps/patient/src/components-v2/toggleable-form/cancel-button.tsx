'use client'

import { Button, Text } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { useToggleableFormContext } from './context'

const CancelButton = () => {
  const form = useFormContext()

  const { setOpen, setError } = useToggleableFormContext()

  return (
    <Button
      size="3"
      variant="outline"
      color="red"
      onClick={(e) => {
        e.preventDefault()
        setOpen(false)
        setError(undefined)
        form.reset()
      }}
      highContrast
    >
      <Text size="2" weight="regular" color="red">
        Cancel
      </Text>
    </Button>
  )
}

export { CancelButton }
