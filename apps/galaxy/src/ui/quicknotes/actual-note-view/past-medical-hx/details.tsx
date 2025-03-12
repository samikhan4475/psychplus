import { BLOCK_OPTIONS } from '@/ui/past-medical-hx/past-medical-hx-widget/blocks'
import { PastMedicalHxWidgetSchemaType } from '@/ui/past-medical-hx/past-medical-hx-widget/past-medical-hx-widget-schema'
import { getSlashedPaddedDateString } from '@/utils'
import { BlockContainer, LabelAndValue } from '../shared'

interface Props<T> {
  data: T
  actualNoteViewVisibility?: boolean
}

const Details = ({
  data,
  actualNoteViewVisibility,
}: Props<PastMedicalHxWidgetSchemaType>) => {
  const selectedOptions = BLOCK_OPTIONS.filter((option) => {
    if (['Pregnant', 'Breast Feeding', 'Other'].includes(option.label))
      return false
    return data[option.field as keyof PastMedicalHxWidgetSchemaType]
  })
    .map((option) => option.label)
    .join(', ')

  return actualNoteViewVisibility ? (
    <BlockContainer heading="Past Medical History">
      {data.pregnantDate && (
        <LabelAndValue
          label="Pregnant:"
          value={`Date of Conception: ${getSlashedPaddedDateString(
            String(data.pregnantDate),
          )}`}
        />
      )}
      {data.breastFeedingDaysPostPartum && (
        <LabelAndValue
          label="Breast Feeding:"
          value={`The number of postpartum weeks: ${data.breastFeedingDaysPostPartum}`}
        />
      )}
      {selectedOptions && <LabelAndValue label="" value={selectedOptions} />}
      {data.other && data.otherDetails && (
        <LabelAndValue label="Other:" value={` ${data.otherDetails}`} />
      )}
    </BlockContainer>
  ) : null
}

export { Details }
