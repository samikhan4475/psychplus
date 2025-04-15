import { useState } from 'react'
import { type Row } from '@tanstack/react-table'
import { AdaptiveRowActionsCell, type RowAction } from '@/components'
import { useStore } from '../store'
import { StaffLocation } from '../types'
import { RowActionRegister } from './row-action-register'

interface ActionsCellProps {
  row: Row<StaffLocation>
  refreshData: () => void
}

const ActionsCell = ({ row, refreshData }: ActionsCellProps) => {
  const { sureScriptEnabled } = useStore((state) => ({
    sureScriptEnabled: state.sureScriptEnabled,
  }))

  const [isDisabled, setIsDisabled] = useState(false)

  const rowActions: RowAction<StaffLocation>[] = [
    ...(sureScriptEnabled
      ? [
          {
            id: 'staff-location-row-action-register',
            render: (props: { row: Row<StaffLocation> }) => (
              <RowActionRegister
                row={props.row}
                refreshData={refreshData}
                toggleRowClick={() => setIsDisabled(true)}
                disabled={isDisabled}
                onClose={() => setIsDisabled(false)}
              />
            ),
          },
        ]
      : []),
  ]

  return <AdaptiveRowActionsCell actions={rowActions} row={row} />
}

export { ActionsCell }
