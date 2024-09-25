import React from 'react'
import { Button } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { SchemaType } from './secure-messages-view'

const ClearButton = () => {
  const form = useFormContext<SchemaType>()
  const handlerClear = () => {
    form.reset()
  }
  return (
    <Button
      className="text-pp-black-1 bg-white border-pp-gray-2 border-2 px-0 text-[12px] shadow-[0_0_0_1px_white]"
      size="1"
      onClick={handlerClear}
    >
      Clear
    </Button>
  )
}

export { ClearButton }
