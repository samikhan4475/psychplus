import { Text } from '@radix-ui/themes'
import { CreditCard } from '../types'

const getDefaultCreditCardName = (creditCard: CreditCard) =>
  `${creditCard.cardType}:${creditCard.numberLastFour}`.toLowerCase()

const getCreditCardExpiry = (
  expireMonth: number,
  expireYear: number,
  showString?: boolean,
) => {
  const currentDate = new Date()
  const currentYear = currentDate.getFullYear()
  const currentMonth = currentDate.getMonth() + 1

  if (
    expireYear < currentYear ||
    (expireYear === currentYear && expireMonth < currentMonth)
  )
    return <Text color="red">Expired</Text>

  return `${showString ? 'Expires' : ''} ${expireMonth}/${expireYear
    .toString()
    .slice(-2)}`
}

const sortCreditCardsByPrimary = (creditCards: CreditCard[]) => {
  return creditCards
    ?.slice()
    .sort((a, b) => Number(b.isPrimary) - Number(a.isPrimary))
}

export {
  getDefaultCreditCardName,
  getCreditCardExpiry,
  sortCreditCardsByPrimary,
}
