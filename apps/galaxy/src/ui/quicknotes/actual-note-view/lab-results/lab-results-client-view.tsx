'use client'

import { useStore } from '@/ui/lab-result/patient-lab-result-widget/store'
import { getTableData } from '@/ui/lab-result/patient-lab-result-widget/utils'
import { Details } from './details'

type LabResultsClientProps = {
  patientId?: string
  appointmentId?: string
}

const LabResultsClient = ({
  patientId,
  appointmentId,
}: LabResultsClientProps) => {
  const data = useStore((state) => state.data)
  const processedData = getTableData(data ?? [])
  return <Details data={processedData ?? []} />
}

export { LabResultsClient }
