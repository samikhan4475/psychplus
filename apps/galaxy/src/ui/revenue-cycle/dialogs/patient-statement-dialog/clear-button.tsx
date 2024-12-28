'use client'

import { Button } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { SchemaType } from './patient-statement-filter-form'
import { useStore } from './store'

const ClearButton = ({ patientId }: { patientId: number }) => {
  const { search } = useStore((state) => ({
    search: state.search,
  }))
  const form = useFormContext<SchemaType>()

  const onClear = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    form.reset()
    return search(patientId, {
      isGroupedByPatient: false,
      patientId: [patientId],
    })
  }

  return (
    <Button
      color="gray"
      className="text-black"
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
