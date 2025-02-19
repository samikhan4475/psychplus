import { ClinicScheduleView } from '@/ui/clinic-schedule'

interface ClinicScheduleProps {
  params: {
    id: string
  }
}
const ClinicSchedule = ({ params }: ClinicScheduleProps) => {
  return <ClinicScheduleView staffId={params.id} />
}

export default ClinicSchedule
