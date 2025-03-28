import { DiagnosisView } from '@/ui/discharge-diagnosis'

interface DiagnosisPageProps {
  params: {
    id: string
  }
  searchParams: {
    id: string
  }
}

const Page = async ({ params, searchParams }: DiagnosisPageProps) => {
  return <DiagnosisView patientId={params.id} appointmentId={searchParams.id} />
}

export default Page
