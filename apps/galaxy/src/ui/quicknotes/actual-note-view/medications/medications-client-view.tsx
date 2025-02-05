'use client'

import { LoadingPlaceholder } from '@/components'
import { Details } from './details'
import { useStore } from '@/ui/medications/patient-medications-widget/store'

interface MedicationsClientViewProps {
  patientId: string
}
const MedicationsClientView = ({ patientId }: MedicationsClientViewProps) => {
  const { data,  loading } = useStore((state) => ({
    data: state.data,
    error: state.error,
    loading: state.loading
  }));


  if (loading) {
    return <LoadingPlaceholder className="min-h-24" />
  }

  return <Details data={data?.medications??[]} />
}

export { MedicationsClientView }
