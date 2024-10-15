'use client'

import { WidgetContainer } from '@/components'
import { FollowUpFilterForm } from './follow-up-filter-form'
import { FollowUpTable } from './follow-up-table'

interface FollowUpProps {
  patientId: string
}

const FollowUpWidget = ({ patientId }: FollowUpProps) => {
  return (
    <WidgetContainer title="Follow Up">
      <FollowUpFilterForm patientId={patientId} />
      <FollowUpTable patientId={patientId} />
    </WidgetContainer>
  )
}

export { FollowUpWidget }
