import { type PropsWithRow } from '@psychplus/ui/data-table'
import { DropdownMenu } from '@psychplus/ui/dropdown-menu'
import { deleteServicesHistory } from '../../api.client'
import { useStore } from '../../store'
import { PatientTransactions } from '../../types'

const ServicesRowActionDelete = ({
  row: { original: tansaction },
}: PropsWithRow<PatientTransactions>) => {
  const preferredPartnerId = useStore((state) => state.preferredPartnerId)
  const setRefreshServicesHistory = useStore(
    (state) => state.setRefreshServicesHistory,
  )
  const refreshServicesHistory: boolean = useStore(
    (state) => state.refreshServicesHistory,
  )

  const deleteRecord = async (tansaction: PatientTransactions) => {
    const checkConfirm = window.confirm(
      'Are you sure you want to delete this transaction?',
    )
    if (checkConfirm) {
      try {
        await deleteServicesHistory(preferredPartnerId, tansaction.id)
        alert('Transaction deleted successfully!')
      } catch (error) {
        let message = ''
        if (typeof error === 'string') {
          message = error
        } else if (error instanceof Error) {
          message = error.message
        } else {
          message = JSON.stringify(error)
        }
        alert(`ERROR: ${message}`)
        setRefreshServicesHistory(!refreshServicesHistory)
      } finally {
        setRefreshServicesHistory(!refreshServicesHistory)
        window.location.replace(`/widgets/preferred-partners-financial-info`)
      }
    }
  }

  return (
    <>
      <DropdownMenu.Separator />
      <DropdownMenu.Item
        onClick={() => {
          deleteRecord(tansaction)
        }}
      >
        Delete
      </DropdownMenu.Item>
    </>
  )
}

export { ServicesRowActionDelete }
