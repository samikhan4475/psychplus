import { CodesView } from '@/ui/codes'

interface CodesPageProps {
  params: {
    id: string
  }
  searchParams: {
    id: string
  }
}

const CodesPage = ({ params, searchParams }: CodesPageProps) => {
  return (
    <CodesView
      patientId={params.id}
      appointmentId={searchParams.id}
      isCodesHeader={true}
    />
  )
}

export default CodesPage
