import { type Row } from '@tanstack/react-table'
import { AdaptiveRowActionsCell } from '@/components'
import { LabOrders } from '@/types'
import { RowResultView } from './row-result-view'

type LabOrderRow = Row<LabOrders>

interface ActionsCellProps {
  row: LabOrderRow
}

const ResultsCell = ({ row }: ActionsCellProps) => {
  return (
    <AdaptiveRowActionsCell
      actions={[
        {
          id: 'row-results-view',
          render: RowResultView,
        },
      ]}
      row={row}
    />
  )
}

export { ResultsCell }
