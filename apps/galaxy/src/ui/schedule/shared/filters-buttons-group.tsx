'use client'

import { PropsWithChildren } from 'react'
import { Button, Flex } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { BookedAppointmentsSchemaType } from '../schema'
import { SearchButton } from '../shared'

interface Props {
  resetFilters?: () => void
}

const FiltersButtonsGroup = ({ children, resetFilters }: PropsWithChildren<Props>) => {
  const form = useFormContext<BookedAppointmentsSchemaType>()

  return (
    <Flex align="center" className="flex-1 " gap="2">
      {children}
      <Button
        variant="outline"
        color="gray"
        type='button'
        size="1"
        onClick={resetFilters}
      >
        Clear
      </Button>
      <SearchButton disabled={form.formState.isSubmitting} />
    </Flex>
  )
}

export { FiltersButtonsGroup }
