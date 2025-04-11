import { TherapyLoader as TherapyWidget } from '@/ui/therapy/therapy-loader'

interface TherapyPageProps {
  params: {
    id: string
  }
  searchParams: {
    id: string
    visitType: string
  }
}

const TherapyPage =  ({ params, searchParams }: TherapyPageProps) => {
  return <TherapyWidget searchParams={searchParams} params={params} />
}

export default TherapyPage
