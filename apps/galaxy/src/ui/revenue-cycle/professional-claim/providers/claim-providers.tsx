'use client'

import { Grid } from '@radix-ui/themes'
import { ClaimBillingLocationSelect } from './claim-billing-locations'
import { ClaimLocationAddress } from './claim-location-address'
import { ClaimPOSCodesSelect } from './claim-poscodes-select'
import { ClaimRenderingProviderSelect } from './claim-rendering-provider-select'
import { ClaimServiceLocationsSelect } from './claim-service-locations'

const ProvidersView = () => {
  return (
    <Grid columns="2" gap="1" rows="repeat(2)" width="auto">
      <ClaimRenderingProviderSelect />
      <ClaimServiceLocationsSelect />
      <ClaimBillingLocationSelect />
      <ClaimLocationAddress />
      <ClaimPOSCodesSelect />
    </Grid>
  )
}

export { ProvidersView }
