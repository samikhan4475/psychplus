import { AdaptiveRowActionsCell, PropsWithRow, RowAction } from '@/components'
import { PatientConsent } from '@/types'
import { RowActionCall } from './row-action-call'
import { RowActionDownload } from './row-action-download'
import { RowActionEmail } from './row-action-email'
import { RowActionHistory } from './row-action-history'
import { RowActionMarkError } from './row-action-mark-error'
import { RowActionMessage } from './row-action-message'

const ActionCell = ({ row }: PropsWithRow<PatientConsent>) => {
  const { signingDate } = row.original

  const actions = [
    { id: 'History', render: RowActionHistory },
    !signingDate && { id: 'Message', render: RowActionMessage },
    !signingDate && { id: 'Email', render: RowActionEmail },
    !signingDate && { id: 'Call', render: RowActionCall },
    signingDate && { id: 'Download', render: RowActionDownload },
    { id: 'Mark as error', render: RowActionMarkError },
  ].filter(Boolean) as RowAction<PatientConsent>[]

  return <AdaptiveRowActionsCell actions={actions} row={row} />
}

export { ActionCell }
