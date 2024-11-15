'use client'

import { Button } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { SchemaType } from './patient-allergies-filter-form'

const ResetButton = () => {
  const { reset } = useFormContext<SchemaType>()

  const handleReset = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    reset()
  }
  return (
    <Button
      color="gray"
      className="text-black ml-10"
      size="1"
      variant="outline"
      type="button"
      onClick={handleReset}
    >
      Clear
    </Button>
  )
}

export { ResetButton }
