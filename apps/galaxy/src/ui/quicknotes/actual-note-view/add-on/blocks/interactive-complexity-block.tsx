import { AddOnWidgetSchemaType } from '@/ui/add-on/add-on-widget/add-on-widget-schema'
import { INTERACTIVE_COMPLEXITY_BLOCK_OPTIONS } from '@/ui/add-on/add-on-widget/constants'
import { LabelAndValue } from '../../shared'

const InteractiveComplexitBlock = ({
  data,
}: {
  data: AddOnWidgetSchemaType
}) => {
  if (!data.interactiveComplexity) return null
  const value = `Interactive complexity was involved in this session, including:
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
  return <LabelAndValue label="Interactive Complexity" value={value} />
}

export { InteractiveComplexitBlock }
