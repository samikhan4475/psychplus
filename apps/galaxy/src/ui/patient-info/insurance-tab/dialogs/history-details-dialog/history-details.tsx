'use client'

import { Grid, ScrollArea } from '@radix-ui/themes'
import { ActivateInsuranceSwitch } from './activate-insurance-switch'
import { DetailSection } from './detail-section'
import { DetailStatusBadge } from './detail-status-badge'

const HistoryDetails = () => {
  return (
    <ScrollArea className="min-w-[370px]">
      <Grid columns="4" p="2" gap="2">
        <ActivateInsuranceSwitch />
        <DetailStatusBadge />
        <DetailSection />
      </Grid>
    </ScrollArea>
  )
}

export { HistoryDetails }
