import { ColumnDef } from '@tanstack/react-table'
import { useFormContext } from 'react-hook-form'
import { CODESETS } from '@/constants'
import { useCodesetCodes } from '@/hooks'
import { AddOnWidgetSchemaType } from '../../../add-on-widget-schema'
import { HeadingCell, TableCellLongText } from './cells'

interface PsychoAnalysisData {
  transference?: string
  technique?: string
}

interface ColumnsProps {
  transferenceDescription: AddOnWidgetSchemaType['transferenceDescription']
  psychoanalyticTechnique: AddOnWidgetSchemaType['psychoanalyticTechnique']
}

interface DataOption {
  value: string
  display: string
}

const Columns = ({
  transferenceDescription = [],
  psychoanalyticTechnique = [],
}: ColumnsProps): ColumnDef<PsychoAnalysisData>[] => {
  const { setValue } = useFormContext<AddOnWidgetSchemaType>()

  const transferenceDescriptionCodes: DataOption[] = useCodesetCodes(
    CODESETS.DescriptionTransference,
  )
  const psychoanalyticTechniqueCodes: DataOption[] = useCodesetCodes(
    CODESETS.PsychoanalyticTechnique,
  )

  return [
    {
      id: 'transference',
      header: () => (
        <HeadingCell
          title="Description of Transference"
          count={transferenceDescription.length}
          data={transferenceDescriptionCodes}
          width="355px"
        />
      ),
      cell: ({ row }) => (
        <TableCellLongText
          maxWidth={'350px'}
          text={row.original?.transference}
          onDelete={() => {
            const updatedTransference = [...transferenceDescription]
            updatedTransference.splice(row.index, 1)
            setValue('transferenceDescription', updatedTransference)
          }}
        />
      ),
    },
    {
      id: 'technique',
      header: () => (
        <HeadingCell
          title="Psychoanalytic Technique"
          count={psychoanalyticTechnique.length}
          data={psychoanalyticTechniqueCodes}
          width="550px"
        />
      ),
      cell: ({ row }) => (
        <TableCellLongText
          maxWidth={'545px'}
          text={row.original?.technique}
          onDelete={() => {
            const updatedTechnique = [...psychoanalyticTechnique]
            updatedTechnique.splice(row.index, 1)
            setValue('psychoanalyticTechnique', updatedTechnique)
          }}
        />
      ),
    },
  ]
}

export { Columns }
