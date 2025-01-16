import { AddOnWidgetSchemaType } from '@/ui/add-on/add-on-widget/add-on-widget-schema'
import { SESSION_PARTICIPANT_OPTIONS } from '@/ui/therapy/therapy-widget/individual/blocks/utils'
import { LabelAndValue } from '../../shared'

const formatList = (
  items: (
    | {
        value?: string
        display?: string
      }
    | undefined
  )[],
) =>
  items
    .map((item) => item?.display)
    .filter(Boolean)
    .join(', ')

const TherapyBlock = ({ data }: { data: AddOnWidgetSchemaType }) => {
  if (!data.therapy || data.therapyPsychoanalysis !== 'therapy') return null
  const sessionParticipants = SESSION_PARTICIPANT_OPTIONS.find(
    (item) => item.value === data.therapySessionParticipants,
  )?.label
  return (
    <LabelAndValue
      label="Therapy"
      value={`Conducted Therapy in this session interacting with ${sessionParticipants} for ${
        data?.[data.therapyTimeSpent as keyof typeof data]
      } minutes.
    Therapy modalities used include: ${formatList(
      data.therapyDetailsModality || [],
    )}.
    Interventions completed include: ${formatList(
      data.therapyDetailsInterventions || [],
    )}.
    ${data.additionalTherapyDetail}
    Patient presented with signs of transference, indicating a strong misplacement of feelings associated with unresolved past experiences.
    Provider engaged in schema exploration to gain insight into the patient's irrational thoughts and maladaptive behavior patterns,
    encouraging self-reflection to connect dysfunctional beliefs, behaviors, and assumptions.
    Continued exploration of irrational thoughts and behaviors is recommended.`}
    />
  )
}

export { TherapyBlock }
