'use client'

import React, { useEffect, useState } from 'react'
import { Flex } from '@radix-ui/themes'
import { LoadingPlaceholder } from '@/components'
import { PatientVital } from '@/ui/vitals'
import { transformIn } from '@/ui/vitals/data'
import { getPatientVitalsAction } from '@/ui/vitals/vitals-widget/client-actions/get-patient-vitals'
import { NoteDetailProps } from '../types'
import { Details } from './details'

const VitalsNoteDetailView = ({ patientId, data }: NoteDetailProps) => {
  const [response, setResponse] = useState<PatientVital[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      const vitalsIds = transformIn(data).vitalsId
      const vitalsResponse = await getPatientVitalsAction({
        payload: {
          patientId: patientId,
          vitalIds: vitalsIds.map(Number),
        },
      })
      if (vitalsResponse.state === 'error') {
        setLoading(false)
        return
      }
      setResponse(vitalsResponse.data)
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
  return <Details data={response} className="max-w-[41.9vw]" />
}

export { VitalsNoteDetailView }
