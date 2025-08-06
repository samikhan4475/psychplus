import { Text } from '@radix-ui/themes'
import { TemplateValues } from '@/ui/fit-for-duty-psych-eval/widget/types'
import { interpolateTemplate } from '@/ui/fit-for-duty-psych-eval/widget/utils'
import { BlockContainer } from '../shared'
import { TEMPLATE_PARAGRAPH_BREAK } from './utils'

interface GenericTemplateRendererProps {
  heading: string
  template: string
  values: TemplateValues
}

const GenericTemplateRenderer = ({
  heading,
  template,
  values,
}: GenericTemplateRendererProps) => {
  const narrative = interpolateTemplate(template, values)
  const paragraphs = narrative.split(TEMPLATE_PARAGRAPH_BREAK)

  return (
    <BlockContainer heading={heading}>
      {paragraphs.map((text, idx) => (
        <Text key={heading + idx} className="mb-4 text-2">
          {text?.trim()}
        </Text>
      ))}
    </BlockContainer>
  )
}
export { GenericTemplateRenderer }
