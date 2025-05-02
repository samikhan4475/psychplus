'use server'

import { getCreditCards } from '../api'

const getCreditCardsAction = () => getCreditCards()

export { getCreditCardsAction }
