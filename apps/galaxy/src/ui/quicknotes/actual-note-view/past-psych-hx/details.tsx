import { Flex } from '@radix-ui/themes'
import { PAST_PSYCH_CONDITIONS_BLOCK_OPTIONS } from '@/ui/past-psych-hx/past-psych-hx-widget/blocks'
import { PastPsychHxWidgetSchemaType } from '@/ui/past-psych-hx/past-psych-hx-widget/past-psych-hx-widget-schema'
import { BlockContainer, LabelAndValue } from '../shared'

interface Props<T> {
  data: T
  actualNoteViewVisibility?: boolean
}

const Details = ({
  data,
  actualNoteViewVisibility,
}: Props<PastPsychHxWidgetSchemaType>) => {
  const {
    psychHospitalizations,
    suicideAttempts,
  } = data

  const getValue = (
    option: (typeof PAST_PSYCH_CONDITIONS_BLOCK_OPTIONS)[number],
  ) => {
    if (option.label === 'Other') {
      return data[option.detailsField as keyof PastPsychHxWidgetSchemaType]
    }
    return data[option.field as keyof PastPsychHxWidgetSchemaType]
      ? `Age Started: ${
          data[option.detailsField as keyof PastPsychHxWidgetSchemaType]
        }`
      : ''
  }

  return actualNoteViewVisibility ? (
    <BlockContainer heading="Past Psychiatry History">
      <Flex direction="row">
        <LabelAndValue
          label="Past Hospitalizations:"
          value={psychHospitalizations}
        />
        <LabelAndValue label="Suicide Attempts:" value={suicideAttempts} />
      </Flex>
      {PAST_PSYCH_CONDITIONS_BLOCK_OPTIONS.map((option) => (
        <LabelAndValue
          key={option.field}
          label={`${option.label}:`}
          value={getValue(option)}
        />
      ))}
    </BlockContainer>
  ) : null
}

export { Details }
