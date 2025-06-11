import { type Row } from '@tanstack/react-table'
import { AdaptiveRowActionsCell } from '@/components'
import { LabOrders } from '@/types'
import { RowResultView } from './row-result-view'

type LabOrderRow = Row<LabOrders>

interface ActionsCellProps {
  row: LabOrderRow
  onResultClick: (row: LabOrderRow) => void
}

const ResultsCell = ({ row, onResultClick }: ActionsCellProps) => {
  return (
    <AdaptiveRowActionsCell
      actions={[
        {
          id: 'row-results-view',
          render: () => <RowResultView row={row} onClick={onResultClick} />,
        },
      ]}
      row={row}
    />
  )
}

export { ResultsCell }
