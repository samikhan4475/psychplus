'use client'

import { useEffect, useState } from 'react'
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

  useEffect(() => {
    getPatientAllergiesAction({
      payload: { patientIds: [patientId] },
    }).then((response) => {
      if (response.state === 'error') {
        return
      }
      setData(response?.data ?? [])
    })
  }, [patientId])

  if (data.length === 0) return null

  return <Details data={data} />
}

export { AllergiesDetailsClientView }
