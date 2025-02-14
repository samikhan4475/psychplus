import { Flex } from '@radix-ui/themes'
import { GroupSelectSection } from '@/components'
import { ERROR_ID } from '../constants'
import { MseGroupDetailSection } from '../history/mse-details/mse-group-detail-section'
import { MseWidgetSchemaType } from '../mse-widget-schema'
import { GroupSelectOption } from '../types'

const INTELLIGENCE_BLOCK_OPTIONS: GroupSelectOption<string>[] = [
  { label: 'Below Average', value: 'intBelowAverage' },
  { label: 'Average', value: 'intAverage' },
  { label: 'Above Average', value: 'intAboveAverage' },
  {
    label: 'Other',
    value: 'intOther',
    details: {
      type: 'text',
      field: 'intOtherDetails',
    },
  },
]

const INTELLIGENCE_HOWTESTED_BLOCK_OPTIONS: GroupSelectOption<string>[] = [
  { label: 'Vocabulary', value: 'inthtVocabulary' },
  {
    label: 'Other',
    value: 'inthtOther',
    details: {
      type: 'text',
      field: 'inthtOtherDetails',
      maxLength: 500,
    },
  },
]

const IntelligenceBlock = ({ result }: { result?: MseWidgetSchemaType }) => {
  return (
    <Flex gap="2">
      <Flex align="center" gap="2" wrap="wrap">
        <>
          {result ? (
            <>
              <MseGroupDetailSection
                label="Intelligence"
                field="intelligence"
                options={INTELLIGENCE_BLOCK_OPTIONS}
                result={result}
              />
              <MseGroupDetailSection
                label="How Tested"
                field="intelligenceHowTested"
                options={INTELLIGENCE_HOWTESTED_BLOCK_OPTIONS}
                result={result}
              />
            </>
          ) : (
            <>
              <GroupSelectSection
                label="Intelligence"
                field="intelligence"
                options={INTELLIGENCE_BLOCK_OPTIONS}
                errorField={ERROR_ID}
              />
              <GroupSelectSection
                label="How Tested"
                field="intelligenceHowTested"
                options={INTELLIGENCE_HOWTESTED_BLOCK_OPTIONS}
                errorField={ERROR_ID}
              />
            </>
          )}
        </>
      </Flex>
    </Flex>
  )
}

export { IntelligenceBlock }
