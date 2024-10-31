import { ColumnDef } from '@tanstack/react-table'
import { TableCellLongText } from './table-cell'
import TableHeadingCell from './table-heading-cell'
import { TherapySchemaType } from '../therapy-schema'
import { useCodesetCodes } from '@/hooks'
import { CODESETS } from '@/constants'
import { useFormContext } from 'react-hook-form'

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
                    width='355px'
                />
            ),
            cell: ({ row }) => (
                <TableCellLongText
                    maxWidth={'350px'}
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
                    width='550px'
                />
            ),
            cell: ({ row }) => (
                <TableCellLongText
                    maxWidth={'545px'}
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

export default TherapyTableColumns
