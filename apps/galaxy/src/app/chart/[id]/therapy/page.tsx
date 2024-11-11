import { TherapyWidget } from '@/ui/therapy'

interface TherapyPageProps {
  params: {
    id: string
  }
}

const TherapyPage = ({ params }: TherapyPageProps) => {
  return <TherapyWidget patientId={params.id} />
}

export default TherapyPage
