'use client'

import { ScrollArea, Text } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { DataTable } from '@/components'
import { cn } from '@/utils'
import { AddOnWidgetSchemaType } from '../../../add-on-widget-schema'
import { Columns } from './columns'

interface PsychoAnalysisData {
  transference?: string
  technique?: string
}

const PsychoAnalysisTable = () => {
  const {
    watch,
    formState: { errors },
  } = useFormContext<AddOnWidgetSchemaType>()
  const transferenceDescription = watch('transferenceDescription') ?? []
  const psychoanalyticTechnique = watch('psychoanalyticTechnique') ?? []
  const psychoAnalysisColumns = Columns({
    transferenceDescription,
    psychoanalyticTechnique,
  })

  const combinedList = (): PsychoAnalysisData[] => {
    const largeList =
      transferenceDescription.length > psychoanalyticTechnique.length
        ? transferenceDescription
        : psychoanalyticTechnique

    return largeList.map((_, index) => ({
      transference: transferenceDescription[index]?.display,
      technique: psychoanalyticTechnique[index]?.display,
    }))
  }

  const getCombinedErrorMessage = (): string => {
    const psychoanalyticTechniqueError =
      errors.psychoanalyticTechnique?.message ?? ''
    const transferenceDescriptionError =
      errors.transferenceDescription?.message ?? ''

    const psychoanalyticTechniqueEmpty =
      !psychoanalyticTechnique.length && psychoanalyticTechniqueError
    const transferenceDescriptionEmpty =
      !transferenceDescription.length && transferenceDescriptionError

    if (psychoanalyticTechniqueEmpty && transferenceDescriptionEmpty) {
      return 'Description of Transference & Psychoanalytic Technique are required'
    }
    if (psychoanalyticTechniqueEmpty) {
      return psychoanalyticTechniqueError
    }
    if (transferenceDescriptionEmpty) {
      return transferenceDescriptionError
    }
    return ''
  }

  return (
    <ScrollArea
      style={{ maxHeight: '160px', maxWidth: '918px' }}
      className="rounded-2"
    >
      <DataTable
        data={combinedList()}
        columns={psychoAnalysisColumns}
        disablePagination
        sticky
      />
      <Text className={cn('text-[12px] text-tomato-11')}>
        {getCombinedErrorMessage()}
      </Text>
    </ScrollArea>
  )
}

export { PsychoAnalysisTable }
