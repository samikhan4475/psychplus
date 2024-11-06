'use client'

import { Button } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { useStore } from '../store'
import { getInitialValues } from '../utils'
import { PatientLookUpSchemaType } from './schema'

const ClearButton = () => {
  const form = useFormContext<PatientLookUpSchemaType>()
  const { search } = useStore((state) => ({
    search: state.search,
  }))

  const handleResetForm = () => {
    search(getInitialValues(), 1, true)
    form.reset({ ...getInitialValues() })
  }
  return (
    <Button
      size="1"
      variant="outline"
      color="gray"
      type="button"
      className="text-black disabled:text-gray-5"
      onClick={handleResetForm}
    >
      Clear
    </Button>
  )
}

export { ClearButton }
