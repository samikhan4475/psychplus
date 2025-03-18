import React from 'react'
import { MagnifyingGlassIcon } from '@radix-ui/react-icons'
import { TextField } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { FormFieldContainer } from '@/components'
import { SchemaType } from './schema'

const MessageSearch = () => {
  const form = useFormContext<SchemaType>()

  return (
    <FormFieldContainer className="border-pp-gray-2 relative flex h-[24px] flex-1 items-center rounded-3 border-[1px]">
      <TextField.Root
        size="1"
        placeholder="Search message"
        {...form.register('subject')}
        className="h-[24px] w-full flex-1 border-0 outline-none [box-shadow:none]"
      />
      <MagnifyingGlassIcon
        scale="2"
        className="text-pp-gray-3 absolute right-1 top-1 h-[13.54px] w-[13.54px] cursor-pointer"
      />
    </FormFieldContainer>
  )
}

export { MessageSearch }
