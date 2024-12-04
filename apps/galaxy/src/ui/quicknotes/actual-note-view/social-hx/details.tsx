import { SocialHxWidgetSchemaType } from '@/ui/social-hx/social-hx-widget/social-hx-widget-schema'
import { BlockContainer, LabelAndValue } from '../shared'

interface Props<T> {
  data: T
}

const Details = ({ data }: Props<SocialHxWidgetSchemaType>) => {
  if (data.widgetContainerCheckboxField !== 'show') {
    return null
  }

  const renderIfValue = (label: string, value: string | undefined) =>
    value ? <LabelAndValue label={label} value={value} /> : null

  return (
    <BlockContainer heading="Social History">
      {renderIfValue('Relationship Status:', data.relationshipStatus)}
      {renderIfValue('Professional Education:', data.professionalEducation)}
      {renderIfValue('Employed:', data.employed)}
      {renderIfValue('Legal History:', data.legalHistory)}
      {renderIfValue('Living:', data.living)}
      {renderIfValue('Trauma Hx:', data.traumaHx)}
    </BlockContainer>
  )
}

export { Details }
