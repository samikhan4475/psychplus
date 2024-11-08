'use client'

import { ScrollArea } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { DataTable } from '@/components'
import { TherapySchemaType } from '../therapy-schema'
import { TherapyTableColumns } from './therapy-table-columns'

interface TherapyData {
  modality?: string
  intervention?: string
}

const TherapyTableBlock = () => {
  const { watch } = useFormContext<TherapySchemaType>()
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

  return (
    <ScrollArea
      style={{ maxHeight: '160px', maxWidth: '923px' }}
      className="rounded-2"
    >
      <DataTable
        data={combineInterventionAndModality()}
        columns={therapyColumns}
        disablePagination
        sticky
      />
    </ScrollArea>
  )
}

export { TherapyTableBlock }
