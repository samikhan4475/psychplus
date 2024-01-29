interface MarketingBenefit {
  benefits: string[]
  priceLevels: PriceLevel[]
}

interface ConfigurationProtected {
  configuration: {
    display: string
    tag: string
    value: string
  }[]
}

interface PriceLevel {
  cost: number
  costPer: string
  savings: number
  isSubscription?: boolean
  paymentServices?: PaymentService[]
}

interface PaymentService {
  chargeService: string
  paymentProductId: string
  paymentPlanId?: string
}

export type {
  MarketingBenefit,
  PriceLevel,
  PaymentService,
  ConfigurationProtected,
}
