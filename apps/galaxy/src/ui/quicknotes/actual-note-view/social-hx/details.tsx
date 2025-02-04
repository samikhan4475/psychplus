import {
  EDUCATION_BLOCK_OPTIONS,
  LIVING_BLOCK_OPTIONS,
  RELATIONSHIP_BLOCK_OPTIONS,
  TRAUMA_HX_BLOCK_OPTIONS,
} from '@/ui/social-hx/social-hx-widget/blocks'
import { SocialHxWidgetSchemaType } from '@/ui/social-hx/social-hx-widget/social-hx-widget-schema'
import { BlockContainer, LabelAndValue } from '../shared'

interface Props<T> {
  data: T
  actualNoteViewVisibility?: boolean
}

const YesNoSelectOptions = [
  { label: 'Yes', value: 'yes' },
  { label: 'No', value: 'no' },
]

const labelOfValue = (
  value: string | undefined,
  options: { label: string; value: string }[],
) => {
  if (!value) return ''
  return options.find((option) => option.value === value)?.label || ''
}

const Details = ({
  data,
  actualNoteViewVisibility,
}: Props<SocialHxWidgetSchemaType>) => {
  if (!actualNoteViewVisibility) {
    return null
  }

  const renderIfValue = (label: string, value: string | undefined) =>
    value ? <LabelAndValue label={label} value={value} /> : null

  return (
    <BlockContainer heading="Social History">
      {renderIfValue(
        'Relationship Status:',
        labelOfValue(data.relationshipStatus, RELATIONSHIP_BLOCK_OPTIONS),
      )}
      {renderIfValue(
        'Professional Education:',
        labelOfValue(data.professionalEducation, EDUCATION_BLOCK_OPTIONS),
      )}
      {renderIfValue(
        'Employed:',
        labelOfValue(data.employed, YesNoSelectOptions),
      )}
      {renderIfValue(
        'Legal History:',
        labelOfValue(data.legalHistory, YesNoSelectOptions),
      )}
      {renderIfValue(
        'Living:',
        labelOfValue(data.living, LIVING_BLOCK_OPTIONS),
      )}
      {renderIfValue(
        'Trauma Hx:',
        labelOfValue(data.traumaHx, TRAUMA_HX_BLOCK_OPTIONS),
      )}
      {renderIfValue('Other:', data.other)}
    </BlockContainer>
  )
}

export { Details }
