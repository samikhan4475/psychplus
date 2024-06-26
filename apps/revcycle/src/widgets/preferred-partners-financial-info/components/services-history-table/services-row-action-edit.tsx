import { type PropsWithRow } from '@psychplus/ui/data-table'
import { DropdownMenu } from '@psychplus/ui/dropdown-menu'
import { useStore } from '../../store'
import { PatientTransactions } from '../../types'

const ServicesRowActionEdit = ({
  row: { original: transaction },
}: PropsWithRow<PatientTransactions>) => {
  const setServicesHistoryPopup = useStore(
    (state) => state.setServicesHistoryPopup,
  )
  const setServicesHistoryEditTransaction = useStore(
    (state) => state.setServicesHistoryEditTransaction,
  )

  const editTransaction = (transaction: PatientTransactions) => {
    setServicesHistoryEditTransaction(transaction)
    setServicesHistoryPopup(true)
  }

  return (
    <DropdownMenu.Item
        onClick={() => {
          editTransaction(transaction)
        }}
      >
        Edit
      </DropdownMenu.Item>
  )
}

export { ServicesRowActionEdit }
