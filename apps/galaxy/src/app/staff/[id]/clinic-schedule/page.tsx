import { ClinicScheduleView } from '@/ui/clinic-schedule'

interface ClinicScheduleProps {
  searchParams: {
    id: string
  }
  params: {
    id: string
  }
}
const ClinicSchedule = ({ searchParams, params }: ClinicScheduleProps) => {
  return <ClinicScheduleView userId={searchParams.id} staffId={params.id} />
}

export default ClinicSchedule
