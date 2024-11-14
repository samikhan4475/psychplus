interface PayerPlan {
  id: string
  payerName?: string
  payerType?: string
  payerStatus?: string
  name?: string
}

interface PayerPlanAddress {
  id: string
  address1: string
  address2: string
  city: string
  state: string
  zip: string
  status: string
}

export type { PayerPlan, PayerPlanAddress }
