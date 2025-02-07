'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { Appointment, QuickNoteSectionItem } from '@/types'
import { filterAndSort } from '@/utils'
import { mapAppointmentDurationToData } from '../add-on/utils'
import { FamilyTherapyView } from './therapy-widget/family'
import { transformIn as familyTransformIn } from './therapy-widget/family/data'
import { IndividualTherapyView } from './therapy-widget/individual'
import { getInitialValues } from './therapy-widget/individual/blocks/utils'
import { transformIn } from './therapy-widget/individual/data'
import { TherapySchemaType } from './therapy-widget/individual/therapy-schema'

interface TherapyWidgetClientLoaderProps {
  patientId: string
  data?: QuickNoteSectionItem[]
  appointment: Appointment
}

const TherapyWidgetClientLoader = ({
  patientId,
  appointment,
  data = [],
}: TherapyWidgetClientLoaderProps) => {
  const visitType = useSearchParams().get('visitType') ?? ''
  const [individualInitialValue, setIndividualInitialValue] =
    useState<TherapySchemaType>(getInitialValues())
  const [individualOtherData, setIndividualOtherData] = useState<
    QuickNoteSectionItem[]
  >([])
  const [familyData, familyOtherData] = filterAndSort(
    data,
    'additionalTherapyDetail',
  )
  useEffect(() => {
    const hasTherapyTimeSpent = data.some(
      (item) => item.sectionItem === 'therapyTimeSpent',
    )
    const durationData = !hasTherapyTimeSpent
      ? mapAppointmentDurationToData(appointment?.duration)
      : {}
    const [individualData, individualOtherData] = filterAndSort(
      data,
      'additionalTherapyDetail',
    )
    setIndividualOtherData(individualOtherData)
    setIndividualInitialValue({
      ...transformIn(individualData),
      ...durationData,
    })
  }, [])

  if (visitType === 'IndividualPsychotherapy') {
    return (
      <IndividualTherapyView
        patientId={patientId}
        initialValue={individualInitialValue}
        otherData={individualOtherData}
      />
    )
  }

  if (visitType === 'FamilyPsychotherapy') {
    return (
      <FamilyTherapyView
        patientId={patientId}
        initialValue={familyTransformIn(familyData ?? [])}
        otherData={familyOtherData}
      />
    )
  }
}

export { TherapyWidgetClientLoader }
