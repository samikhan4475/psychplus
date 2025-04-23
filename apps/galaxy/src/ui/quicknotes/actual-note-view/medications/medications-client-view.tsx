'use client'

import { LoadingPlaceholder } from '@/components'
import { QuickNoteSectionItem } from '@/types'
import { useStore } from '@/ui/medications/patient-medications-widget/store'
import { Details } from './details'

interface MedicationsClientViewProps {
  data?: QuickNoteSectionItem[]
}
const MedicationsClientView = ({ data }: MedicationsClientViewProps) => {
  const { data: medicationData, loading } = useStore((state) => ({
    data: state.data,
    error: state.error,
    loading: state.loading,
  }))

  if (loading) {
    return <LoadingPlaceholder className="min-h-24" />
  }

  return <Details data={data} medicationData={medicationData ?? []} />
}

export { MedicationsClientView }
