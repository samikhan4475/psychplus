import { AdaptiveRowActionsCell, PropsWithRow, RowAction } from '@/components'
import { PatientConsent } from '@/types'
import { RowActionDownload } from '../../cells'

const ActionCell = ({ row }: PropsWithRow<PatientConsent>) => {
  const { signingDate } = row.original

  const actions = [
    signingDate && { id: 'Download', render: RowActionDownload },
  ].filter(Boolean) as RowAction<PatientConsent>[]

  return <AdaptiveRowActionsCell actions={actions} row={row} />
}

export { ActionCell }
