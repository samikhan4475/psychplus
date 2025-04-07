import { SharedCode } from '@/types'
import FAMILY_PSYCH_BLOCK_OPTIONS from '@/ui/family-psych-hx/family-psych-hx-widget/blocks/family-psych-options.json'
import { FamilyPsychHxWidgetSchemaType } from '@/ui/family-psych-hx/family-psych-hx-widget/family-psych-hx-widget-schema'
import { mapValuesToLabels } from '@/utils'
import { BlockContainer, LabelAndValue } from '../shared'

interface Props<T> {
  data: T
  actualNoteViewVisibility?: boolean
  relationshipCodeset: SharedCode[]
}

type FamilyPsychHxKey = keyof FamilyPsychHxWidgetSchemaType

const renderFamilyPsychHistory = (
  data: FamilyPsychHxWidgetSchemaType,
  relationshipCodeset: SharedCode[],
): JSX.Element => {
  const getValue = (option: (typeof FAMILY_PSYCH_BLOCK_OPTIONS)[number]) => {
    const value = mapValuesToLabels(
      data[option.detailsField as FamilyPsychHxKey] as string[],
      relationshipCodeset,
    )
    const fieldValue = data[option.field as keyof FamilyPsychHxWidgetSchemaType]

    if (fieldValue) return value ? `Relationship: ${value}` : ''
    return undefined
  }

  return (
    <BlockContainer heading="Family Psychiatry History">
      {FAMILY_PSYCH_BLOCK_OPTIONS.map((option) => {
        const value = getValue(option)
        const label = value ? `${option.label}:` : option.label

        return (
          <LabelAndValue
            key={option.field}
            label={label}
            value={value}
            allowEmptyValue={value !== undefined}
          />
        )
      })}
      {data.other && <LabelAndValue label="Other:" value={data.other} />}
    </BlockContainer>
  )
}

const Details = ({
  data,
  actualNoteViewVisibility,
  relationshipCodeset,
}: Props<FamilyPsychHxWidgetSchemaType>) => {
  if (!actualNoteViewVisibility) {
    return null
  }

  return renderFamilyPsychHistory(data, relationshipCodeset)
}

export { Details }
