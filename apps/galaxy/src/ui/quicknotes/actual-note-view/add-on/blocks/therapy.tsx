import { Flex, Text } from '@radix-ui/themes'
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
    <Flex direction="column" gap="1">
      <Text className="whitespace-nowrap text-1 font-medium">Therapy</Text>

      <LabelAndValue
        value={`Conducted Therapy in this session interacting with ${sessionParticipants} for ${
          data?.[data.therapyTimeSpent as keyof typeof data]
        } minutes.
      Therapy modalities used include: ${formatList(
        data.therapyDetailsModality || [],
      )}.
      Interventions completed include: ${formatList(
        data.therapyDetailsInterventions || [],
      )}.
      ${data.additionalTherapyDetail}`}
      />
    </Flex>
  )
}

export { TherapyBlock }
