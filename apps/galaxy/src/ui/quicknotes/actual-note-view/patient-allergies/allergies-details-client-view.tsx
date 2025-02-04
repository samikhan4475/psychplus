'use client'

import { useEffect, useState } from 'react'
import { Text } from '@radix-ui/themes'
import { getPatientAllergiesAction } from '@/ui/allergy/patient-allergies-widget/client-actions'
import { Details } from './details'
import { AllergyDataResponse } from '@/ui/allergy/patient-allergies-widget/types'

interface AllergiesDetailsViewProps {
  patientId: string
}
const AllergiesDetailsClientView = ({
  patientId,
}: AllergiesDetailsViewProps) => {
  const [data, setData] = useState<AllergyDataResponse[]>([])
  const [error, setError] = useState('')
  useEffect(() => {
    getPatientAllergiesAction({
      payload: { patientIds: [patientId] },
    }).then((response) => {
      if (response.state === 'error') {
        return setError(response?.error)
      }
      setData(response?.data ?? [])
    })
  }, [patientId])
  if (error) {
    return <Text>{error}</Text>
  }

  return <Details data={data} />
}

export { AllergiesDetailsClientView }
