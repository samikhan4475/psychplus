'use client'

import { useEffect, useState } from 'react'
import { Text } from '@radix-ui/themes'
import { LoadingPlaceholder } from '@/components'
import { getPatientMedicationsAction } from '@/ui/medications/patient-medications-widget/client-actions'
import { PatientMedication } from '@/ui/medications/patient-medications-widget/types'
import { Details } from './details'

interface MedicationsClientViewProps {
  patientId: string
}
const MedicationsClientView = ({ patientId }: MedicationsClientViewProps) => {
  const [data, setData] = useState<PatientMedication[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  useEffect(() => {
    getPatientMedicationsAction({
      patientIds: [patientId],
    })
      .then((response) => {
        if (response.state === 'error') {
          return setError(response.error)
        }
        setData(response?.data?.medications ?? [])
      })
      .finally(() => setLoading(false))
  }, [patientId])

  if (loading) {
    return <LoadingPlaceholder className="min-h-24" />
  }
  if (error) {
    return <Text>{error}</Text>
  }

  return <Details data={data} />
}

export { MedicationsClientView }
