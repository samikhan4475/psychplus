'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { Text } from '@radix-ui/themes'
import { QuickNoteSectionItem, Relationship } from '@/types'
import { transformIn } from '@/ui/assessment-plan/psychiatry-assessment-plan-tab/data'
import { getPatientRelationshipsAction } from '@/ui/patient-info/patient-info-tab/actions'
import { fetchCodesSections } from '@/utils/codes'
import { NoteDetailProps } from '../types'
import { Details } from './details'

const PsychiatryAssessmentPlanNoteDetailView = ({
  data,
  appointment,
}: NoteDetailProps) => {
  const params = useParams()
  const patientId = params?.id as string

  const [patientRelationships, setPatientRelationships] = useState<
    Relationship[]
  >([])
  const [error, setError] = useState<string | null>(null)
  const [codesData, setCodesData] = useState<QuickNoteSectionItem[]>([])

  useEffect(() => {
    if (!patientId) return

    const fetchRelationships = async () => {
      const [response, codesResponse] = await Promise.all([
        getPatientRelationshipsAction(patientId),
        fetchCodesSections(patientId, appointment?.id?.toString()),
      ])

      if (response.state === 'error') {
        setError(response.error)
      } else {
        setPatientRelationships(response.data)
      }

      if (codesResponse.state === 'error') {
        setError(
          codesResponse.error ?? 'Something went wrong. Please try again.',
        )
      } else {
        setCodesData(codesResponse.data ?? [])
      }
    }

    fetchRelationships()
  }, [patientId])

  if (data?.length === 0) return null
  if (!appointment) return null

  if (error) {
    return <Text>{error}</Text>
  }

  return (
    <Details
      data={transformIn(data)}
      patientRelationships={patientRelationships}
      appointment={appointment}
      codesData={codesData}
    />
  )
}

export { PsychiatryAssessmentPlanNoteDetailView }
