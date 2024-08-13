'use client'

import { shallow } from 'zustand/shallow'
import { createWithEqualityFn } from 'zustand/traditional'
import { combineStateCreators } from '@psychplus/utils/store'
import {
  createCreditCardStore,
  type CreditCardState,
} from './credit-card-store'
import {
  createCustomChargeStore,
  type CustomChargeState,
} from './custom-charge-store'
import {
  preferredPartnerFinancialStore,
  type PreferredPartnerFinancialState,
} from './preferred-partner-financial-store'
import {
  createServicesHistoryStore,
  type ServicesHistoryState,
} from './services-history-store'
import {
  createSubscriptionHistoryStore,
  type SubscriptionHistoryState,
} from './subscription-history-store'

type Store = CreditCardState &
  SubscriptionHistoryState &
  ServicesHistoryState &
  PreferredPartnerFinancialState &
  CustomChargeState

const useStore = createWithEqualityFn<Store>(
  combineStateCreators(
    createCreditCardStore,
    createServicesHistoryStore,
    createSubscriptionHistoryStore,
    preferredPartnerFinancialStore,
    createCustomChargeStore,
  ),
  shallow,
)

export { useStore }
