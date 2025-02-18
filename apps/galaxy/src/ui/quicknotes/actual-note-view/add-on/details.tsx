import { Flex } from '@radix-ui/themes'
import { AddOnWidgetSchemaType } from '@/ui/add-on/add-on-widget/add-on-widget-schema'
import { INTERACTIVE_COMPLEXITY_BLOCK_OPTIONS } from '@/ui/add-on/add-on-widget/constants'
import { BlockContainer, LabelAndValue } from '../shared'
import { InjectionDetails } from './blocks/injection-block'
import { PsychoanalysisBlock } from './blocks/psychoanalysis'
import { TherapyBlock } from './blocks/therapy'

const Details = ({ data }: { data: AddOnWidgetSchemaType }) => {
  const interactiveComplexityValue =
    data.interactiveComplexity &&
    `Interactive complexity was involved in this session, including: ${[
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

  return (
    <BlockContainer heading="Add On">
      <Flex direction="column" gap="2">
        <InjectionDetails data={data} />

        <TherapyBlock data={data} />
        <PsychoanalysisBlock data={data} />

        {interactiveComplexityValue && (
          <LabelAndValue
            label="Interactive Complexity"
            value={interactiveComplexityValue}
          />
        )}
      </Flex>
    </BlockContainer>
  )
}

export { Details }
