'use client'

import { ScrollArea } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { DataTable, FormError } from '@/components'
import { TherapySchemaType } from '../individual/therapy-schema'
import { TherapyTableColumns } from './therapy-table-columns'

interface TherapyData {
  modality?: string
  intervention?: string
}

const TherapyTableBlock = () => {
  const {
    watch,
    formState: { errors },
  } = useFormContext<TherapySchemaType>()
  const therapyDetailsModality = watch('therapyDetailsModality') || []
  const therapyDetailsInterventions = watch('therapyDetailsInterventions') || []
  const therapyColumns = TherapyTableColumns({
    therapyDetailsModality,
    therapyDetailsInterventions,
  })

  const combinedList = (): TherapyData[] => {
    const largeList =
      therapyDetailsModality.length > therapyDetailsInterventions.length
        ? therapyDetailsModality
        : therapyDetailsInterventions

    return largeList.map((_, index) => ({
      modality: therapyDetailsModality[index]?.display,
      intervention: therapyDetailsInterventions[index]?.display,
    }))
  }

  const getCombinedErrorMessage = (): string => {
    const modalityError = errors.therapyDetailsModality?.message || ''
    const interventionError = errors.therapyDetailsInterventions?.message || ''

    const modalityEmpty = !therapyDetailsModality.length && modalityError
    const interventionEmpty =
      !therapyDetailsInterventions.length && interventionError

    if (modalityEmpty && interventionEmpty) {
      return 'Therapy Modality & Interventions are required'
    }
    if (modalityEmpty) {
      return modalityError
    }
    if (interventionEmpty) {
      return interventionError
    }
    return ''
  }

  return (
    <>
      <ScrollArea
        style={{ maxHeight: '260px', width: '923px', overflowY: 'hidden' }}
        className="rounded-2"
      >
        <DataTable
          data={combinedList()}
          columns={therapyColumns}
          disablePagination
          sticky
        />
      </ScrollArea>

      <FormError message={getCombinedErrorMessage()} />
    </>
  )
}

export { TherapyTableBlock }
