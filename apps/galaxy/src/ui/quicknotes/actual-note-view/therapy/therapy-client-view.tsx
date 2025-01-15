'use client'

import { ComponentProps, useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
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
}

const TherapyClientView = ({ data = [] }: TherapyClientViewProps) => {
  const visitType = useSearchParams().get('visitType') ?? ''
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
      const paragraph = `Spent ${
        values[values.therapyTimeSpent as keyof typeof values]
          ? `${values[values.therapyTimeSpent as keyof typeof values]} minutes`
          : blockOptions.find(
              (option) => option.value === values.therapyTimeSpent,
            )?.label ?? 'Unknown time'
      } on this session interacting with ${
        values.therapySessionParticipants === 'Patient&Other' &&
        values.patientOther
          ? `Patient & ${values.patientOther}`
          : sessionParticipantOptions.find(
              (option) => option.value === values.therapySessionParticipants,
            )?.label ?? 'Unknown participants'
      }. Therapy modalities that were used include but are not limited to ${values.therapyDetailsModality
        .map((modality) => modality.display)
        .join(
          ', ',
        )}. Interventions that were completed include but are not limited to ${values.therapyDetailsInterventions
        .map((intervention) => intervention.display)
        .join(', ')}.`

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
