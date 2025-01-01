import { ColumnDef } from '@tanstack/react-table'
import { useFormContext } from 'react-hook-form'
import { CODESETS } from '@/constants'
import { useCodesetCodes } from '@/hooks'
import { TherapySchemaType } from '../individual/therapy-schema'
import { TableCellLongText } from './table-cell'
import { TableHeadingCell } from './table-heading-cell'

interface TherapyData {
  modality?: string
  intervention?: string
}

interface TherapyTableColumnsProps {
  therapyDetailsModality: TherapySchemaType['therapyDetailsModality']
  therapyDetailsInterventions: TherapySchemaType['therapyDetailsInterventions']
}

const TherapyTableColumns = ({
  therapyDetailsModality,
  therapyDetailsInterventions,
}: TherapyTableColumnsProps): ColumnDef<TherapyData>[] => {
  const { setValue } = useFormContext<TherapySchemaType>()

  const modalityCodes = useCodesetCodes(CODESETS.TherapyModality)
  const interventionCodes = useCodesetCodes(CODESETS.TherapyIntervention)
  return [
    {
      id: 'modality',
      header: () => (
        <TableHeadingCell
          title="Therapy Modality"
          count={therapyDetailsModality.length}
          data={modalityCodes}
          width="365px"
        />
      ),
      cell: ({ row }) => (
        <TableCellLongText
          maxWidth={'360px'}
          text={row.original?.modality}
          onDelete={() => {
            const updatedModality = [...therapyDetailsModality]
            updatedModality.splice(row.index, 1)
            setValue('therapyDetailsModality', updatedModality)
          }}
        />
      ),
    },
    {
      id: 'intervention',
      header: () => (
        <TableHeadingCell
          title="Interventions"
          count={therapyDetailsInterventions.length}
          data={interventionCodes}
          width="545px"
        />
      ),
      cell: ({ row }) => (
        <TableCellLongText
          maxWidth={'540px'}
          text={row.original?.intervention}
          onDelete={() => {
            const updatedIntervention = [...therapyDetailsInterventions]
            updatedIntervention.splice(row.index, 1)
            setValue('therapyDetailsInterventions', updatedIntervention)
          }}
        />
      ),
    },
  ]
}

export { TherapyTableColumns }
