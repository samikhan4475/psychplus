import { type PropsWithRow } from '@psychplus/ui/data-table'
import { DropdownMenu } from '@psychplus/ui/dropdown-menu'
import { useStore } from '../../store'
import { type CreditCard } from '../../types'

const CreditCardRowActionSetPrimary = ({
  row: { original: creditCard },
}: PropsWithRow<CreditCard>) => {
  const { setCreditCardList, creditCardList } = useStore((state) => ({
    setCreditCardList: state.setCreditCardList,
    creditCardList: state.creditCardList,
  }))

  const setPrimary = (creditCard: CreditCard) => {
    const updatedCCList = creditCardList.map((cc) =>
      cc === creditCard
        ? { ...creditCard, isPrimary: true }
        : { ...cc, isPrimary: false },
    )
    setCreditCardList(updatedCCList)
  }

  return (
    <DropdownMenu.Item
        onClick={() => {
          setPrimary(creditCard)
        }}
        disabled={true}
      >
        Download
      </DropdownMenu.Item>
  )
}

export { CreditCardRowActionSetPrimary }
