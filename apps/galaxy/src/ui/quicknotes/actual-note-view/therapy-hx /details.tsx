import { BLOCK_OPTIONS } from '@/ui/therapy/therapy-widget/blocks/time-spent'
import { SESSION_PARTICIPANT_OPTIONS } from '@/ui/therapy/therapy-widget/blocks/utils'
import { TherapySchemaType } from '@/ui/therapy/therapy-widget/therapy-schema'
import { BlockContainer, LabelAndValue } from '../shared'

interface Props<T> {
  data: T
}

const Details = ({ data }: Props<TherapySchemaType>) => {

  const timeSpent = data[data.therapyTimeSpent as keyof TherapySchemaType]
    ? `${data[data.therapyTimeSpent as keyof TherapySchemaType]} minutes`
    : BLOCK_OPTIONS.find((option) => option.value === data.therapyTimeSpent)
        ?.label || 'Unknown time'

  const sessionParticipants =
    data.therapySessionParticipants === 'Patient&Other' && data.patientOther
      ? `Patient & ${data.patientOther}`
      : SESSION_PARTICIPANT_OPTIONS.find(
          (option) => option.value === data.therapySessionParticipants,
        )?.label || 'Unknown participants'

  const therapyModalities = data.therapyDetailsModality
    .map((modality) => modality.display)
    .join(', ')

  const therapyInterventions = data.therapyDetailsInterventions
    .map((intervention) => intervention.display)
    .join(', ')

  const paragraph = `Spent ${timeSpent} on this session interacting with ${sessionParticipants}. Therapy modalities that were used include but are not limited to ${therapyModalities}. Interventions that were completed include but are not limited to ${therapyInterventions}.`

  return (
    <BlockContainer heading="Add On">
      <LabelAndValue label="Therapy" value={paragraph} />
    </BlockContainer>
  )
}

export { Details }
