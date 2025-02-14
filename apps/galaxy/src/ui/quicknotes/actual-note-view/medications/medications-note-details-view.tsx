'use client'

import { useEffect, useState } from 'react'
import { Flex } from '@radix-ui/themes'
import { LoadingPlaceholder } from '@/components'
import { getPatientMedicationsAction } from '@/ui/medications/patient-medications-widget/actions/get-patient-medications'
import { PatientMedication } from '@/ui/medications/patient-medications-widget/types'
import { NoteDetailProps } from '../types'
import { Details } from './details'

const MedicationsNoteDetailsView = ({ data, isNoteView, patientId  }: NoteDetailProps) => {
  const [response, setResponse] = useState<PatientMedication[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      const result = await getPatientMedicationsAction({
        patientIds: [patientId],
      })
      if (result.state === 'error') {
        setLoading(false)
        return
      }

      setResponse(result.data.medications)
      setLoading(false)
    }
    fetchData()
  }, [])

  if (loading) {
    return (
      <Flex height="100%" align="center" justify="center">
        <LoadingPlaceholder />
      </Flex>
    )
  }
  if (response.length === 0) return null

  return <Details data={data} medicationData={response} isNoteView={isNoteView} />
}

export { MedicationsNoteDetailsView }
