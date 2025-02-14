'use client'

import { LoadingPlaceholder } from '@/components'
import { Details } from './details'
import { useStore } from '@/ui/medications/patient-medications-widget/store'
import { QuickNoteSectionItem } from '@/types'

interface MedicationsClientViewProps {
  data?: QuickNoteSectionItem[];
  patientId: string
}
const MedicationsClientView = ({ data, patientId }: MedicationsClientViewProps) => {
  const { data: medicationData, loading } = useStore((state) => ({
    data: state.data,
    error: state.error,
    loading: state.loading
  }));


  if (loading) {
    return <LoadingPlaceholder className="min-h-24" />
  }

  return <Details data={data} medicationData={medicationData?.medications || []} />
}

export { MedicationsClientView }
