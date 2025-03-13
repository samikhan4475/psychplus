'use client'

import { AdaptiveRowActionsCell, PropsWithRow, RowAction } from '@/components'
import { PatientConsent } from '@/types'
import { RowActionDownload } from './row-action-download'
import { RowActionEmail } from './row-action-email'
import { RowActionHistory } from './row-action-history'
import { RowActionMessage } from './row-action-message'
import { RowActionSign } from './row-action-sign'

const ActionCell = ({ row }: PropsWithRow<PatientConsent>) => {
  const { signingDate, status } = row.original
  const isPending = status === 'Pending'
  const actions: RowAction<PatientConsent>[] = [
    { id: 'History', render: RowActionHistory },
    {
      id: 'Message',
      render: (props) =>
        !signingDate || isPending ? <RowActionMessage {...props} /> : null,
    },
    {
      id: 'Sign',
      render: (props) => <RowActionSign {...props} />,
    },
    {
      id: 'Email',
      render: (props) =>
        !signingDate || isPending ? <RowActionEmail {...props} /> : null,
    },
    {
      id: 'Download',
      render: (props) =>
        signingDate && !isPending ? <RowActionDownload {...props} /> : null,
    },
  ]

  return (
    <AdaptiveRowActionsCell
      actions={actions.filter((item) => item.render({ row }))}
      row={row}
    />
  )
}

export { ActionCell }
