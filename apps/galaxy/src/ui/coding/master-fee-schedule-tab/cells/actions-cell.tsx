import { type Row } from '@tanstack/react-table'
import { AdaptiveRowActionsCell, type RowAction } from '@/components'

import { RowActionEdit } from './row-action-edit'
import { CPT } from '../../types'
import { RowActionDelete } from './row-action-delete'

type CptRow = Row<CPT>

const rowActions: RowAction<CPT>[] = [
    {
        id: 'cpt-list-row-action-edit',
        render: RowActionEdit,
    },
    {
        id: 'cpt-list-row-action-delete',
        render: RowActionDelete,
    },
]

interface ActionsCellProps {
    row: CptRow
}

const ActionsCell = ({ row }: ActionsCellProps) => {
    return <AdaptiveRowActionsCell actions={rowActions} row={row} />
}

export { ActionsCell }
