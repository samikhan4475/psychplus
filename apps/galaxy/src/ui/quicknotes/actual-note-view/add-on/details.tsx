import { Flex } from '@radix-ui/themes'
import { AddOnWidgetSchemaType } from '@/ui/add-on/add-on-widget/add-on-widget-schema'
import { INTERACTIVE_COMPLEXITY_BLOCK_OPTIONS } from '@/ui/add-on/add-on-widget/blocks'
import { BlockContainer, LabelAndValue } from '../shared'
import { InjectionDetails } from './injection-block'

const formatList = (
  items: (
    | {
        value: string
        display: string
      }
    | undefined
  )[],
) =>
  items
    .map((item) => item?.display)
    .filter(Boolean)
    .join(', ')

const Details = ({ data }: { data: AddOnWidgetSchemaType }) => {
  const therapyValue =
    data.therapyPsychoanalysis === 'therapy' &&
    `
    Conducted Therapy in this session interacting with ${
      data.therapySessionParticipants
    } for ${data.therapyTimeSpent} minutes.
    Therapy modalities used include: ${formatList(data.therapyDetailsModality)}.
    Interventions completed include: ${formatList(
      data.therapyDetailsInterventions,
    )}.
    ${data.additionalTherapyDetail}
    Patient presented with signs of transference, indicating a strong misplacement of feelings associated with unresolved past experiences.
    Provider engaged in schema exploration to gain insight into the patient's irrational thoughts and maladaptive behavior patterns,
    encouraging self-reflection to connect dysfunctional beliefs, behaviors, and assumptions.
    Continued exploration of irrational thoughts and behaviors is recommended.`

  const psychoanalysisValue =
    data.therapyPsychoanalysis === 'psychoanalysis' &&
    `
    Conducted psychoanalysis in this session interacting with the patient.
    Descriptions of transference include: ${formatList(
      data.transferenceDescription,
    )}.
    Psychoanalytic techniques used include: ${formatList(
      data.psychoanalyticTechnique,
    )}.
    ${data.additionalPsychoAnalysisDetail}
    Patient displayed transference possibly resulting from unconscious conflicts.
    Provider encouraged reflection on past experiences impacting the patient's life and explored repressed thoughts to identify root causes of psychological distress.
    Continued support and discussion are recommended.`

  const interactiveComplexityValue =
    data.interactiveComplexity &&
    `
      Interactive complexity was involved in this session, including:
      ${[
        'maladaptiveCommunication',
        'caregiverEmotions',
        'sentinelEvent',
        'languageBarrier',
      ]
        .map((field) => {
          const key = field as keyof typeof data
          return data[key]
            ? INTERACTIVE_COMPLEXITY_BLOCK_OPTIONS.find(
                (item) => item.field === field,
              )?.label
            : null
        })
        .filter(Boolean)
        .join('; ')}`

  return (
    <BlockContainer heading="Add On">
      <Flex direction="column" gap="2">
        <InjectionDetails data={data} />

        {therapyValue && <LabelAndValue label="Therapy" value={therapyValue} />}
        {psychoanalysisValue && (
          <LabelAndValue label="Psychoanalysis" value={psychoanalysisValue} />
        )}
        {interactiveComplexityValue && (
          <LabelAndValue
            label="Interactive Complexity"
            value={interactiveComplexityValue}
          />
        )}
      </Flex>
    </BlockContainer>
  )
}

export { Details }
