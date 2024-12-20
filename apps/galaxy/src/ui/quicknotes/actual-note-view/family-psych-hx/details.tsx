import { FAMILY_PSYCH_BLOCK_OPTIONS } from '@/ui/family-psych-hx/family-psych-hx-widget/blocks'
import { FamilyPsychHxWidgetSchemaType } from '@/ui/family-psych-hx/family-psych-hx-widget/family-psych-hx-widget-schema'
import { BlockContainer, LabelAndValue } from '../shared'

interface Props<T> {
  data: T
  actualNoteViewVisibility?: boolean
}

type FamilyPsychHxKey = keyof FamilyPsychHxWidgetSchemaType

const renderFamilyPsychHistory = (
  data: FamilyPsychHxWidgetSchemaType,
): JSX.Element => {
  return (
    <BlockContainer heading="Family Psychiatry History">
      {FAMILY_PSYCH_BLOCK_OPTIONS.map((option) => (
        <LabelAndValue
          key={option.field}
          label={`${option.label}:`}
          value={
            data[option.field as FamilyPsychHxKey]
              ? `Relation: ${data[option.detailsField as FamilyPsychHxKey]
                  ?.toString()
                  .split(',')
                  .map(
                    (relation) =>
                      relation.charAt(0).toUpperCase() + relation.slice(1),
                  )
                  .join(', ')}`
              : ''
          }
        />
      ))}
    </BlockContainer>
  )
}

const Details = ({ data, actualNoteViewVisibility }: Props<FamilyPsychHxWidgetSchemaType>) => {
  if (!actualNoteViewVisibility) {
    return null
  }

  return renderFamilyPsychHistory(data)
}

export { Details }
