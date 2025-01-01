'use client'

import { useEffect, useState } from 'react'
import { getQuickNoteDetailAction } from '@/actions/get-quicknote-detail'
import { QuickNoteSectionName } from '../quicknotes/constants'
import { FamilyTherapyView } from './therapy-widget/family'
import { getFamilyInitialValues } from './therapy-widget/family/blocks/utils'
import { IndividualTherapyView } from './therapy-widget/individual'
import { getInitialValues } from './therapy-widget/individual/blocks/utils'
import { useSearchParams } from 'next/navigation'
import { transformIn } from './therapy-widget/individual/data'
import { transformIn as familyTransformIn } from './therapy-widget/family/data'
import { TherapySchemaType } from './therapy-widget/individual/therapy-schema'
import { FamilyTherapySchemaType } from './therapy-widget/family/therapy-schema'

interface TherapyViewProps {
  patientId: string
}

const TherapyWidget = ({ patientId }: TherapyViewProps) => {
  const [individualInitialValue, setIndividualInitialValue] =
    useState<TherapySchemaType>(getInitialValues())
  const [familyInitialValue, setFamilyInitialValue] =
    useState<FamilyTherapySchemaType>(getFamilyInitialValues())
  const [error, setError] = useState(false)
  const visitType = useSearchParams().get('visitType') || ''

  useEffect(() => {
    const fetchTherapyData = async () => {
      try {
        const [individualResponse, familyResponse] = await Promise.all([
          getQuickNoteDetailAction(patientId, [
            QuickNoteSectionName.QuickNoteSectionIndividualTherapy,
          ]),
          getQuickNoteDetailAction(patientId, [
            QuickNoteSectionName.QuickNoteSectionFamilyTherapy,
          ]),
        ])

        if (individualResponse.state === 'error' || familyResponse.state === 'error') {
          setError(true)
          return
        }

        setIndividualInitialValue(transformIn(individualResponse.data))
        setFamilyInitialValue(familyTransformIn(familyResponse.data))
      } catch (err) {
        setError(true)
        console.error('Error fetching therapy data:', err)
      }
    }

    fetchTherapyData()
  }, [patientId])

  if (error) {
    return <div>Failed to load therapy data.</div>
  }

  if (visitType === 'IndividualPsychotherapy') {
    return (
      <IndividualTherapyView
        patientId={patientId}
        initialValue={individualInitialValue}
      />
    )
  }

  if (visitType === 'FamilyPsychotherapy') {
    return (
      <FamilyTherapyView
        patientId={patientId}
        initialValue={familyInitialValue}
      />
    )
  }

  return <div>Invalid visit type or no visit type provided.</div>
}

export { TherapyWidget }
