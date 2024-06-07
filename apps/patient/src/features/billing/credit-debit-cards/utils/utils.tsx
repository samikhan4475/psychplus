import { Text } from '@radix-ui/themes'
import { CreditCard } from '../types'

const getDefaultCreditCardName = (creditCard: CreditCard) =>
  `${creditCard.cardType}:${creditCard.numberLastFour}`.toLowerCase()

const getCreditCardExpiry = (expireMonth: number, expireYear: number) => {
  const currentDate = new Date()
  const currentYear = currentDate.getFullYear()
  const currentMonth = currentDate.getMonth() + 1

  if (
    expireYear < currentYear ||
    (expireYear === currentYear && expireMonth < currentMonth)
  )
    return <Text color="red">Expired</Text>

  return `Expires ${expireMonth}/${expireYear.toString().slice(-2)}`
}

export { getDefaultCreditCardName, getCreditCardExpiry }
