type Membership = {
  type: string
  status: string
  isMember: boolean
  paymentSubscriptionId: string
  recurringChargeDate: string
}
type MembershipBenefit = {
  priceLevels: [
    {
      cost: number
      costPer: string
      savings: number
      isSubscription: true
      paymentServices: Array<{
        chargeService: string
        paymentProductId: string
        paymentPlanId: string
      }>
    },
  ]
  benefits: string[]
}

export type { Membership, MembershipBenefit }
