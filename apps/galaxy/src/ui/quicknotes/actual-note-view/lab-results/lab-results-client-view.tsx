'use client'

import { Appointment } from '@/types'
import { useStore } from '@/ui/lab-result/patient-lab-result-widget/store'
import { getTableData } from '@/ui/lab-result/patient-lab-result-widget/utils'
import { formatUTCDate } from '@/utils'
import { Details } from './details'

type LabResultsClientProps = {
  patientId?: string
  appointmentId?: string
  appointment?: Appointment
}

const LabResultsClient = ({
  patientId,
  appointmentId,
  appointment,
}: LabResultsClientProps) => {
  const labResultsData = useStore((state) => state.data)
  const processedResults = getTableData(labResultsData ?? [])

  const appointmentDateKey = appointment?.startDate
    ? formatUTCDate(appointment.startDate, 'MM/dd/yy')
    : null

  const filteredResults =
    processedResults?.filter((result) => {
      if (!appointmentDateKey) return false
      if (!result?.observationTime) return true
      const observationDate = formatUTCDate(
        result?.observationTime.toString(),
        'MM/dd/yy',
      )
      return appointmentDateKey === observationDate
    }) ?? []
  return <Details data={filteredResults} />
}

export { LabResultsClient }
