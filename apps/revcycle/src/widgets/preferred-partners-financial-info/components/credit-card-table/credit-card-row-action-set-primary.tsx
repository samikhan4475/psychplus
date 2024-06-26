import { useState } from 'react'
import { Text } from '@radix-ui/themes'
import { type PropsWithRow } from '@psychplus/ui/data-table'
import { DropdownMenu } from '@psychplus/ui/dropdown-menu'
import { Switch } from '@psychplus/ui/switch'
import { updatePreferredPartnerCreditCard } from '../../api.client'
import { useStore } from '../../store'
import { type CreditCard } from '../../types'

const CreditCardRowActionSetPrimary = ({
  row: { original: creditCard },
}: PropsWithRow<CreditCard>) => {
  const [isPrimary, setIsPrimary] = useState(creditCard.isPrimary)

  const { setCreditCardList, creditCardList } = useStore((state) => ({
    setCreditCardList: state.setCreditCardList,
    creditCardList: state.creditCardList,
  }))

  const setPrimary = () => {
    const updatedCCList = creditCardList.map((cc) =>
      cc === creditCard
        ? { ...creditCard, isPrimary: !isPrimary }
        : { ...cc, isPrimary: !isPrimary },
    )
    setCreditCardList(updatedCCList)

    updatePreferredPartnerCreditCard({
      ...creditCard,
      isPrimary: !isPrimary,
    })
    setIsPrimary(!isPrimary)
  }

  return (
    <DropdownMenu.Item onClick={setPrimary}>
        <Text className="mr-[8px]">Make Primary</Text>{' '}
        <Switch defaultChecked={isPrimary} />
      </DropdownMenu.Item>
  )
}

export { CreditCardRowActionSetPrimary }
