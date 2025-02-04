'use client'

import { Text } from '@radix-ui/themes'
import { LoadingPlaceholder } from '@/components'
import { Details } from './details'
import { useStore } from '@/ui/medications/patient-medications-widget/store'

interface MedicationsClientViewProps {
  patientId: string
}
const MedicationsClientView = ({ patientId }: MedicationsClientViewProps) => {
  const { data, error, loading } = useStore((state) => ({
    data: state.data,
    error: state.error,
    loading: state.loading
  }));


  if (loading) {
    return <LoadingPlaceholder className="min-h-24" />
  }
  if (error) {
    return <Text>{error}</Text>
  }

  return <Details data={data?.medications??[]} />
}

export { MedicationsClientView }
