import React from 'react'
import { Button } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { SchemaType } from '../schema'
import { useStore } from '../store'

const ClearButton = () => {
  const form = useFormContext<SchemaType>()
  const { search, activeTab } = useStore((state) => state)

  const handlerClear = () => {
    form.reset()
    search({
      messageStatus: activeTab,
    })
  }
  return (
    <Button
      type="button"
      className="text-pp-black-1 bg-white border-pp-gray-2 border-2 px-0 text-[12px] shadow-[0_0_0_1px_white]"
      size="1"
      onClick={handlerClear}
    >
      Clear
    </Button>
  )
}

export { ClearButton }
