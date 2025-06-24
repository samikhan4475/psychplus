'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { Text } from '@radix-ui/themes'
import { QuickNoteSectionItem } from '@/types'
import { transformIn } from '@/ui/assessment-plan/psychiatry-assessment-plan-tab/data'
import { fetchCodesSections } from '@/utils/codes'
import { NoteDetailProps } from '../types'
import { Details } from './details'

const PsychiatryAssessmentPlanNoteDetailView = ({
  data,
  appointment,
}: NoteDetailProps) => {
  const params = useParams()
  const patientId = params?.id as string

  const [error, setError] = useState<string | null>(null)
  const [codesData, setCodesData] = useState<QuickNoteSectionItem[]>([])

  useEffect(() => {
    if (!patientId) return

    const fetchRelationships = async () => {
      const [codesResponse] = await Promise.all([
        fetchCodesSections(patientId, appointment?.id?.toString()),
      ])

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
      appointment={appointment}
      codesData={codesData}
    />
  )
}

export { PsychiatryAssessmentPlanNoteDetailView }
