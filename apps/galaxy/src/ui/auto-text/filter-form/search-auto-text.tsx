'use client'

import { TextField } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { FormFieldContainer } from '@/components'
import { AutoTextFilterSchemaType } from './schema'
import { SearchButton } from './search-button'

const SearchAutoText = () => {
  const form = useFormContext<AutoTextFilterSchemaType>()

  return (
    <FormFieldContainer className="flex-row gap-1">
      <TextField.Root
        placeholder="Search"
        size="1"
        className="h-6 w-[400px]"
        {...form.register('search')}
      />
      <SearchButton />
    </FormFieldContainer>
  )
}

export { SearchAutoText }
