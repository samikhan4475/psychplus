'use client'

import { Button } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'

const CreateNoteClearButton = () => {
  const form = useFormContext()

  const handleClear = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()

    form?.reset()
  }

  return (
    <Button
      variant="outline"
      color="gray"
      size="1"
      className="text-black"
      type="button"
      onClick={handleClear}
    >
      Clear
    </Button>
  )
}

export { CreateNoteClearButton }
