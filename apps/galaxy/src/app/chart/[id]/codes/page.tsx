import { CodesView } from '@/ui/codes'

interface CodesPageProps {
  params: {
    id: string
  }
}

const CodesPage = ({ params }: CodesPageProps) => {
  return <CodesView patientId={params.id} />
}

export default CodesPage
