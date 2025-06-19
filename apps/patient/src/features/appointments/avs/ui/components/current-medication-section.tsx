import React, { useEffect, useState } from 'react'
import { Box } from '@radix-ui/themes'
import { LoadingPlaceholder } from '@/components-v2'
import { PatientMedication } from '@/features/medications/types'
import MedicationTable from '@/features/pre-checkin-assessment/ui/steps/allergies-and-medications/medication/blocks/medication-table'
import { getPatientMedications } from '../../api'
import { TitleSection } from '../../common'

const CurrentMedicationSection = () => {
  const [loading, setLoading] = useState(true)
  const [medications, setMedications] = useState<PatientMedication[]>([])

  useEffect(() => {
    const fetchData = async () => {
      const patientMedicationsResponse = await getPatientMedications()
      if (patientMedicationsResponse.state === 'success') {
        setMedications(patientMedicationsResponse?.data ?? [])
      }
      setLoading(false)
    }

    fetchData()
  }, [])

  return (
    <Box>
      <TitleSection title="Current Medications" />
      {loading ? (
        <LoadingPlaceholder />
      ) : (
        <MedicationTable medications={medications} />
      )}
    </Box>
  )
}

export { CurrentMedicationSection }
