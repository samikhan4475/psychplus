import { StaffCommentsView } from '@/ui/staff-comments'

interface StaffCommentsVisitViewProps {
  params: {
    id: string
  }
  searchParams: {
    id: string
  }
}

const StaffsCommentsVisitView = ({
  params,
  searchParams,
}: StaffCommentsVisitViewProps) => {
  return (
    <StaffCommentsView
      patientId={params?.id}
      appointmentId={searchParams?.id ?? ''}
    />
  )
}

export default StaffsCommentsVisitView
