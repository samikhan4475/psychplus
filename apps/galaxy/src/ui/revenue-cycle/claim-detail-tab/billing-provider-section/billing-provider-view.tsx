'use client'

import { Grid } from '@radix-ui/themes'
import { AttendingProvider } from './attending-provider'
import { BillingLocationAddress } from './billing-location-address'
import { BillingLocations } from './billing-locations'
import { OrderingProvider } from './ordering-provider'
import { POSCodesSelect } from './poscodes-select'
import { RefProvider } from './ref-provider'
import { RenderingProvider } from './rendering-provider'
import { ServiceLocations } from './service-locations'
import { SupervisingProvider } from './supervising-provider'

const BillingProviderView = () => {
  return (
    <Grid columns="5" gap="1" rows="repeat(2)" width="auto">
      <RenderingProvider />
      <SupervisingProvider />
      <AttendingProvider />
      <OrderingProvider />
      <RefProvider />
      <ServiceLocations />
      <BillingLocations />
      <BillingLocationAddress />
      <POSCodesSelect />
    </Grid>
  )
}

export { BillingProviderView }
