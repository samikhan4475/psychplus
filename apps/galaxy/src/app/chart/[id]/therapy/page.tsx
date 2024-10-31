import { TherapyView } from '@/ui/therapy'

interface TherapyPageProps {
  params: {
    id: string
  }
}

const TherapyPage = ({ params }: TherapyPageProps) => {
  return <TherapyView patientId={params.id} />
}

export default TherapyPage
