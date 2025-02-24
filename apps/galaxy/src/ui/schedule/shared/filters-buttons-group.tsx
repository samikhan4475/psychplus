'use client'

import { PropsWithChildren } from 'react'
import { Button, Flex } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { BookedAppointmentsSchemaType } from '../schema'
import { SearchButton } from '../shared'

interface Props {
  resetFilters?: () => void
  saveSettings?: () => void
}

const FiltersButtonsGroup = ({
  children,
  resetFilters,
  saveSettings,
}: PropsWithChildren<Props>) => {
  const form = useFormContext<BookedAppointmentsSchemaType>()

  return (
    <Flex align="start" gap="2" justify="end" className="-col-end-1">
      {children}
      <Button
        variant="outline"
        color="gray"
        className='text-black'
        type="button"
        size="1"
        onClick={resetFilters}
      >
        Clear
      </Button>
      {saveSettings && (
        <Button
          variant="outline"
          color="gray"
          className='text-black'
          type="button"
          size="1"
          onClick={saveSettings}
        >
          Save Selection
        </Button>
      )}

      <SearchButton disabled={form.formState.isSubmitting} />
    </Flex>
  )
}

export { FiltersButtonsGroup }
