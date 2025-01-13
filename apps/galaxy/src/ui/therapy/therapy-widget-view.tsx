'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { getQuickNoteDetailAction } from '@/actions/get-quicknote-detail'
import { Appointment } from '@/types'
import { mapAppointmentDurationToData } from '../add-on/utils'
import { QuickNoteSectionName } from '../quicknotes/constants'
import { FamilyTherapyView } from './therapy-widget/family'
import { getFamilyInitialValues } from './therapy-widget/family/blocks/utils'
import { transformIn as familyTransformIn } from './therapy-widget/family/data'
import { FamilyTherapySchemaType } from './therapy-widget/family/therapy-schema'
import { IndividualTherapyView } from './therapy-widget/individual'
import { getInitialValues } from './therapy-widget/individual/blocks/utils'
import { transformIn } from './therapy-widget/individual/data'
import { TherapySchemaType } from './therapy-widget/individual/therapy-schema'

interface TherapyViewProps {
  patientId: string
  appointment?: Appointment
}

const TherapyWidget = ({ patientId, appointment }: TherapyViewProps) => {
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

        if (
          individualResponse.state === 'error' ||
          familyResponse.state === 'error'
        ) {
          setError(true)
          return
        }
        const durationData = !individualInitialValue.therapyTimeSpent
        ? mapAppointmentDurationToData(appointment?.duration)
        : {}
        setIndividualInitialValue({
          ...transformIn(individualResponse.data),
          ...durationData,
        })
        setFamilyInitialValue(familyTransformIn(familyResponse.data))
      } catch (err) {
        setError(true)
        console.error('Error fetching therapy data:', err)
      }
    }

    fetchTherapyData()
  // eslint-disable-next-line react-hooks/exhaustive-deps
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
}

export { TherapyWidget }
