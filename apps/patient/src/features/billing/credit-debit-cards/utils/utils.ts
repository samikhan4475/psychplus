import { CreditCard } from '../types'

const getDefaultCreditCardName = (creditCard: CreditCard) =>
  `${creditCard.cardType}:${creditCard.numberLastFour}`.toLowerCase()

export { getDefaultCreditCardName }
