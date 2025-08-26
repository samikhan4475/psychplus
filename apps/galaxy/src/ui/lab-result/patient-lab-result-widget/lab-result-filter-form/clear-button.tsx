'use client'

import { useParams } from 'next/navigation'
import { Button } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { useStore } from '../store'
import { LabResultSchemaType } from './schema'

const ClearButton = () => {
  const form = useFormContext<LabResultSchemaType>()
  const { fetchLabResults } = useStore((state) => ({
    loading: state.loading,
    fetchLabResults: state.fetchLabResults,
  }))
  const patientId = useParams().id as string

  const handleResetForm = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.preventDefault()
    form.reset({
      labTestNamePartial: '',
      dateFrom: null,
      dateTo: null,
    })
    return fetchLabResults({
      patientId: patientId,
      resourceStatusList: ['Active'],
    })
  }
  return (
    <Button
      size="1"
      variant="outline"
      color="gray"
      type="button"
      className="text-black disabled:text-gray-8"
      onClick={handleResetForm}
    >
      Clear
    </Button>
  )
}

export { ClearButton }
