'use client'

import React from 'react'
import { Button } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { VacationTimeSchemaType } from './schema'

const ClearButton = () => {
  const form = useFormContext<VacationTimeSchemaType>()
  const handleClear = () => {
    form.reset({
      fromDate: undefined,
      toDate: undefined,
      status: '',
    })
  }

  return (
    <Button
      variant="outline"
      color="gray"
      size="1"
      className="text-black"
      onClick={handleClear}
    >
      Clear
    </Button>
  )
}

export { ClearButton }
