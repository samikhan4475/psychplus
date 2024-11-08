'use client'

import { ScrollArea } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { DataTable } from '@/components'
import { AddOnWidgetSchemaType } from '../../../add-on-widget-schema'
import { Columns } from './columns'

interface PsychoAnalysisData {
  transference?: string
  technique?: string
}

const PsychoAnalysisTable = () => {
  const { watch } = useFormContext<AddOnWidgetSchemaType>()
  const transferenceDescription = watch('transferenceDescription') || []
  const psychoanalyticTechnique = watch('psychoanalyticTechnique') || []
  const psychoAnalysisColumns = Columns({
    transferenceDescription,
    psychoanalyticTechnique,
  })

  const combineTransferenceAndTechnique = (): PsychoAnalysisData[] => {
    const combinedArray: PsychoAnalysisData[] = []
    transferenceDescription.forEach((item) => {
      combinedArray.push({ transference: item?.display })
    })
    psychoanalyticTechnique.forEach((item, index) => {
      if (combinedArray[index]) {
        combinedArray[index].technique = item?.display
      } else {
        combinedArray.push({ technique: item?.display })
      }
    })
    return combinedArray
  }

  return (
    <ScrollArea
      style={{ maxHeight: '160px', maxWidth: '918px' }}
      className="rounded-2"
    >
      <DataTable
        data={combineTransferenceAndTechnique()}
        columns={psychoAnalysisColumns}
        disablePagination
        sticky
      />
    </ScrollArea>
  )
}

export { PsychoAnalysisTable }
