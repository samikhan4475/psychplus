import { FAMILY_PSYCH_BLOCK_OPTIONS } from '@/ui/family-psych-hx/family-psych-hx-widget/blocks'
import { FamilyPsychHxWidgetSchemaType } from '@/ui/family-psych-hx/family-psych-hx-widget/family-psych-hx-widget-schema'
import { BlockContainer, LabelAndValue } from '../shared'

interface Props<T> {
  data: T
}

type FamilyPsychHxKey = keyof FamilyPsychHxWidgetSchemaType

const Details = ({ data }: Props<FamilyPsychHxWidgetSchemaType>) => {
  return (
    <BlockContainer heading="Family Psychiatry History">
      {FAMILY_PSYCH_BLOCK_OPTIONS.map((option) => {
        return (
          <LabelAndValue
            key={option.field}
            label={option.label + ':'}
            value={
              data[option.field as FamilyPsychHxKey]
                ? `Relation: ${data[
                    option.detailsField as FamilyPsychHxKey
                  ]?.toString()}`
                : ''
            }
          />
        )
      })}
    </BlockContainer>
  )
}

export { Details }
