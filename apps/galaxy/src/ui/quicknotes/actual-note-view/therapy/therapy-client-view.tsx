'use client'

import { ComponentProps, useEffect, useState } from 'react'
import { QuickNoteSectionItem } from '@/types'
import { BLOCK_OPTIONS as FAMILY_BLOCK_OPTIONS } from '@/ui/therapy/therapy-widget/family/blocks/time-spent'
import { FAMILY_SESSION_PARTICIPANT_OPTIONS } from '@/ui/therapy/therapy-widget/family/blocks/utils'
import { transformIn as familyTransformIn } from '@/ui/therapy/therapy-widget/family/data'
import { BLOCK_OPTIONS as INDIVIDUAL_BLOCK_OPTIONS } from '@/ui/therapy/therapy-widget/individual/blocks/time-spent'
import { SESSION_PARTICIPANT_OPTIONS } from '@/ui/therapy/therapy-widget/individual/blocks/utils'
import { transformIn } from '@/ui/therapy/therapy-widget/individual/data'
import { Details } from './details'

interface TherapyClientViewProps {
  patientId: string
  data?: QuickNoteSectionItem[]
  visitType: string
}

const TherapyClientView = ({
  data = [],
  visitType,
}: TherapyClientViewProps) => {
  const [therapyData, setTherapyData] = useState<
    ComponentProps<typeof Details>
  >({
    paragraph: '',
    paragraphHeading: '',
  })

  useEffect(() => {
    const response = fetchTherapyData(data, visitType)
    if (response) {
      const { values, blockOptions, sessionParticipantOptions } = response

      const therapyTimeSpent = values.therapyTimeSpent
      const timeSpentValue = therapyTimeSpent
        ? values[therapyTimeSpent as keyof typeof values]
        : undefined
      const timeSpentLabel =
        blockOptions.find((option) => option.value === therapyTimeSpent)
          ?.label ?? 'Unknown time'

      const timeSpentText = timeSpentValue
        ? `${timeSpentValue} minutes`
        : timeSpentLabel

      const isPatientAndOther =
        values.therapySessionParticipants === 'Patient&Other' &&
        'patientOther' in values
      const participantLabel =
        sessionParticipantOptions.find(
          (option) => option.value === values.therapySessionParticipants,
        )?.label ?? 'Unknown participants'

      const participantText = isPatientAndOther
        ? `Patient & ${values.patientOther}`
        : participantLabel

      const modalitiesText = values.therapyDetailsModality
        .map((modality) => modality.display)
        .join(', ')
      const interventionsText = values.therapyDetailsInterventions
        .map((intervention) => intervention.display)
        .join(', ')

      const paragraph = therapyTimeSpent
        ? `Spent ${timeSpentText} on this session interacting with ${participantText}. Therapy modalities that were used include but are not limited to ${modalitiesText}. Interventions that were completed include but are not limited to ${interventionsText}. ${values.additionalTherapyDetail}`
        : ''

      const paragraphHeading =
        visitType === 'IndividualPsychotherapy'
          ? 'Individual Therapy'
          : 'Family/Couple Therapy'
      setTherapyData({ paragraph, paragraphHeading })
    }
  }, [data, visitType])

  return <Details {...therapyData} />
}

const fetchTherapyData = (data: QuickNoteSectionItem[], visitType: string) => {
  if (visitType === 'IndividualPsychotherapy') {
    return {
      values: transformIn(data),
      blockOptions: INDIVIDUAL_BLOCK_OPTIONS,
      sessionParticipantOptions: SESSION_PARTICIPANT_OPTIONS,
    }
  } else if (visitType === 'FamilyPsychotherapy') {
    return {
      values: familyTransformIn(data),
      blockOptions: FAMILY_BLOCK_OPTIONS,
      sessionParticipantOptions: FAMILY_SESSION_PARTICIPANT_OPTIONS,
    }
  }
}

export { TherapyClientView }
