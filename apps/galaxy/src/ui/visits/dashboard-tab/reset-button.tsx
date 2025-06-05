'use client'

import { Button } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { TableFilters } from '../constants'
import { StateVisitsParams } from '../types'

const ResetButton = ({
  search,
  setActiveFilter,
  defaultStates = [],
}: {
  search: (
    payload?: Partial<StateVisitsParams>,
    page?: number,
    reset?: boolean,
  ) => void
  setActiveFilter: (activeFilter: string) => void
  defaultStates?: string[]
}) => {
  const form = useFormContext()

  const onClear = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    form.reset({
      dateFrom: undefined,
      dateTo: undefined,
      stateCodes: defaultStates,
    })
    setActiveFilter(TableFilters.Today)
    return search({})
  }
  return (
    <Button
      color="gray"
      className="text-black w-[50px]"
      size="1"
      variant="outline"
      type="button"
      onClick={onClear}
    >
      Clear
    </Button>
  )
}

export { ResetButton }
