'use client'

import React from 'react'
import { Button } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { SchemaType } from './schema'

const AddButton = () => {
  const form = useFormContext<SchemaType>()
  return (
    <Button
      loading={form.formState.isSubmitting}
      size="1"
      className="bg-pp-black-2 text-white ml-auto w-fit"
      type="submit"
    >
      {form.getValues('id') ? 'Update' : 'Add'}
    </Button>
  )
}

export { AddButton }
