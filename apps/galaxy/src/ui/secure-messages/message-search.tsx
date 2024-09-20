import React from 'react'
import { MagnifyingGlassIcon } from '@radix-ui/react-icons'
import { TextField } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { FormFieldContainer } from '@/components'

const MessageSearch = () => {
  const form = useFormContext<any>()

  return (
    <FormFieldContainer className="border-pp-gray-2 relative flex items-center rounded-3 border-[1px] ">
      <TextField.Root
        size="1"
        placeholder="Search message"
        {...form.register('searchMessage')}
        className="h-[24px] w-[372px] border-0 outline-none [box-shadow:none]"
      />
      <MagnifyingGlassIcon
        scale="2"
        className="text-pp-gray-3 absolute right-2 top-1 h-[13.54px] w-[13.54px] cursor-pointer"
      />
    </FormFieldContainer>
  )
}

export { MessageSearch }
