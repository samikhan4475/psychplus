import { Pencil1Icon } from '@radix-ui/react-icons'
import { type PropsWithRow } from '@psychplus/ui/data-table'
import { DropdownMenu } from '@psychplus/ui/dropdown-menu'
import { useStore } from '../../store'
import { PatientTransactions } from '../../types'

const ServicesRowActionEdit = ({
  row: { original: transaction },
}: PropsWithRow<PatientTransactions>) => {
  const setCustomChargePopup = useStore((state) => state.setCustomChargePopup)
  const setServicesHistoryEditTransaction = useStore(
    (state) => state.setServicesHistoryEditTransaction,
  )

  const editTransaction = (transaction: PatientTransactions) => {
    setServicesHistoryEditTransaction(transaction)
    setCustomChargePopup(true)
  }

  return (
    <DropdownMenu.Item
      onClick={() => {
        editTransaction(transaction)
      }}
    >
      <Pencil1Icon />
      Edit
    </DropdownMenu.Item>
  )
}

export { ServicesRowActionEdit }
