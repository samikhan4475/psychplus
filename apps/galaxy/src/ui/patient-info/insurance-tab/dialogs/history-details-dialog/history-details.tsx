'use client'

import { Flex, Grid, ScrollArea, Text } from '@radix-ui/themes'
import { ActivateInsuranceSwitch } from './activate-insurance-switch'
import { DetailSection } from './detail-section'
import { DetailStatusBadge } from './detail-status-badge'
import { useStore } from './store'

interface HistoryDetailsProps {
  patientId: string
  policyId: string
}

const HistoryDetails = ({ patientId, policyId }: HistoryDetailsProps) => {
  const { selectedRow } = useStore((state) => ({
    selectedRow: state.selectedRow,
  }))

  if (!selectedRow) {
    return (
      <Flex className="h-full w-full" justify="center" align="center">
        <Text size="2" weight="bold">
          No row selected
        </Text>
      </Flex>
    )
  }
  return (
    <ScrollArea className="h-auto w-full">
      <Grid columns="3" p="2" gap="2">
        <ActivateInsuranceSwitch />
        <DetailStatusBadge />
        <DetailSection patientId={patientId} policyId={policyId} />
      </Grid>
    </ScrollArea>
  )
}

export { HistoryDetails }
