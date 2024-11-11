'use client'

import { ScrollArea } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { DataTable, FormError } from '@/components'
import { TherapySchemaType } from '../therapy-schema'
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

  const combineInterventionAndModality = (): TherapyData[] => {
    const combinedArray: TherapyData[] = []
    therapyDetailsModality.forEach((modality) => {
      combinedArray.push({ modality: modality.display })
    })
    therapyDetailsInterventions.forEach((intervention, index) => {
      if (combinedArray[index]) {
        combinedArray[index].intervention = intervention.display
      } else {
        combinedArray.push({ intervention: intervention.display })
      }
    })
    return combinedArray
  }

  const modalityError = errors.therapyDetailsModality?.message || ''
  const interventionError = errors.therapyDetailsInterventions?.message || ''

  let combinedErrorMessage = ''
  const modalityEmpty = !therapyDetailsModality.length && modalityError
  const interventionEmpty =
    !therapyDetailsInterventions.length && interventionError

  if (modalityEmpty && interventionEmpty) {
    combinedErrorMessage = 'Therapy Modality & Interventions are required'
  } else {
    combinedErrorMessage = modalityEmpty
      ? modalityError
      : interventionEmpty
      ? interventionError
      : ''
  }
  return (
    <>
      <ScrollArea
        style={{ maxHeight: '260px', width: '923px', overflowY: 'hidden' }}
        className="rounded-2"
      >
        <DataTable
          data={combineInterventionAndModality()}
          columns={therapyColumns}
          disablePagination
          sticky
        />
      </ScrollArea>

      <FormError message={combinedErrorMessage} />
    </>
  )
}

export { TherapyTableBlock }
