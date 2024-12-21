import { StaffCommentsView } from '@/ui/staff-comments'

interface StaffCommentsProps {
  params: {
    id: string
  }
  searchParams: {
    id: string
  }
}

const StaffComments = ({ params, searchParams }: StaffCommentsProps) => {
  return (
    <StaffCommentsView patientId={params.id} appointmentId={searchParams.id} />
  )
}

export default StaffComments
