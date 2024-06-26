import { useState } from 'react'
import { type PropsWithRow } from '@psychplus/ui/data-table'
import { Switch } from '@psychplus/ui/switch'
import { updatePreferredPartnerCreditCard } from '../../api.client'
import { useStore } from '../../store'
import { type CreditCard } from '../../types'

const CreditCardRowActionSetUse = ({
  row: { original: creditCard },
}: PropsWithRow<CreditCard>) => {
  const [isActive, setIsActive] = useState(creditCard.isActive)

  const { setCreditCardList, creditCardList } = useStore((state) => ({
    setCreditCardList: state.setCreditCardList,
    creditCardList: state.creditCardList,
  }))

  const onChangeUse = () => {
    const activeAction = !isActive

    if (creditCard.isPrimary && !activeAction) {
      alert('Primary card cannot be deactivated!')
      setIsActive(true)
      return
    }

    const updatedCCList = creditCardList.map((cc) =>
      cc === creditCard
        ? { ...creditCard, isActive: activeAction }
        : { ...cc, isActive: activeAction },
    )
    setCreditCardList(updatedCCList)

    updatePreferredPartnerCreditCard({
      ...creditCard,
      isActive: activeAction,
    })
    setIsActive(activeAction)
  }

  return (
    <Switch defaultChecked={isActive} onClick={onChangeUse} />
  )
}

export { CreditCardRowActionSetUse }
