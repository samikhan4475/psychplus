'use client'

import { Button } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { getInitialValues } from './utils'

const ClearButton = () => {
  const form = useFormContext()

  return (
    <Button
      variant="outline"
      size="1"
      color="gray"
      className="text-black"
      onClick={(e) => {
        e.preventDefault()
        form?.reset(getInitialValues())
      }}
    >
      Clear
    </Button>
  )
}

export { ClearButton }
