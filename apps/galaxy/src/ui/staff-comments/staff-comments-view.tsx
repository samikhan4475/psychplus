'use client'

import { StaffCommentsTabs } from './staff-comment-tabs'
import { StoreProvider } from './store'

interface StaffCommentsViewProps {
  patientId: string
  appointmentId: string
}

const StaffCommentsView = ({
  patientId,
  appointmentId,
}: StaffCommentsViewProps) => {
  return (
    <StoreProvider patientId={patientId} appointmentId={appointmentId}>
      <StaffCommentsTabs />
    </StoreProvider>
  )
}
export { StaffCommentsView }
