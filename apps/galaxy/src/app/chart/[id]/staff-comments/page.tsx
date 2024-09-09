import { StaffCommentsView } from '@/ui/staff-comments'

interface StaffCommentsProps {
  params: {
    id: string
  }
}

const StaffComments = ({ params }: StaffCommentsProps) => {
  return <StaffCommentsView patientId={params.id} />
}

export default StaffComments
