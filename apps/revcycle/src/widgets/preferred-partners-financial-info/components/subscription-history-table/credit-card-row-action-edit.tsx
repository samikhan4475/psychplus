import { type PropsWithRow } from '@psychplus/ui/data-table'
import { DropdownMenu } from '@psychplus/ui/dropdown-menu'
import { type CreditCard } from '../../types'

const CreditCardRowActionEdit = ({
  row: { original: creditCard },
}: PropsWithRow<CreditCard>) => {

  const editCreditCard = (creditCard: CreditCard) => {
    console.log('creditCard for Edit', creditCard)
  }

  return (
    <DropdownMenu.Item
      onClick={() => {
        editCreditCard(creditCard)
      }}
    >
      Edit
    </DropdownMenu.Item>
  )
}

export { CreditCardRowActionEdit }
