import React from 'react'
import { Button } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { SchemaType } from './schema'

const ClearButton = () => {
  const form = useFormContext<SchemaType>()
  const onClear = () => {
    form.reset({
      gender: '',
      category: '',
      maximumAge: '',
      minimumAge: '',
      placeOfService: '',
      recordStatus: '',
      cptCode: '',
      description: '',
      requirement: '',
      mdDoAmount: '',
      npAmount: '',
      paAmount: '',
      psyDAmount: '',
      mastersAmount: '',
    })
  }
  return (
    <Button
      color="gray"
      className="text-black mt-5 w-fit"
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
