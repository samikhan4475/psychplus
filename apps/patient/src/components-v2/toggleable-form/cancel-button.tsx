'use client'

import { Button, Text } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { useToggleableFormContext } from './context'

const CancelButton = () => {
  const form = useFormContext()

  const { setOpen, setError, hasTrigger, onFormClose } =
    useToggleableFormContext()

  return (
    <Button
      size={{ initial: '2', sm: '3' }}
      variant="outline"
      color="red"
      onClick={(e) => {
        e.preventDefault()
        hasTrigger && setOpen(false)
        onFormClose?.()
        setError(undefined)
        form.reset()
      }}
      highContrast
    >
      <Text size={{ initial: '1', sm: '2' }} weight="regular" color="red">
        Cancel
      </Text>
    </Button>
  )
}

export { CancelButton }
