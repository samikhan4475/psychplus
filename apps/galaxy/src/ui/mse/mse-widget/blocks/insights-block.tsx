import { useSearchParams } from 'next/navigation'
import { Flex } from '@radix-ui/themes'
import { GroupSelectSection } from '@/components'
import { ERROR_ID } from '../constants'
import { MseGroupDetailSection } from '../history/mse-details/mse-group-detail-section'
import { type MseWidgetSchemaType } from '../mse-widget-schema'
import { GroupSelectOption } from '../types'

const INSIGHTS_BLOCK_OPTIONS: GroupSelectOption<string>[] = [
  { label: 'Poor', value: 'insPoor' },
  { label: 'Fair', value: 'insFair' },
  {
    label: 'Other',
    value: 'insOther',
    details: {
      type: 'text',
      field: 'insOtherDetails',
    },
  },
]

const INSIGHTS_HOWTESTED_BLOCK_OPTIONS: GroupSelectOption<string>[] = [
  { label: 'Reality testing', value: 'inshtRealityTesting' },
  { label: 'Recognize treatment', value: 'inshtRecognizeTreatment' },
  { label: 'Recognize benefits', value: 'inshtRecognizeBenefits' },
  {
    label: 'Other',
    value: 'inshtOther',
    details: {
      type: 'text',
      field: 'inshtOtherDetails',
      maxLength: 500,
    },
  },
]

const InsightsBlock = ({ result }: { result?: MseWidgetSchemaType }) => {
  const visitSequence = useSearchParams().get('visitSequence') || ''
  const showHowTested = ['New', 'Initial'].includes(visitSequence)

  return (
    <Flex gap="2">
      <Flex align="center" gap="2" wrap="wrap">
        <>
          {result ? (
            <>
              <MseGroupDetailSection
                label="Insight"
                field="insight"
                options={INSIGHTS_BLOCK_OPTIONS}
                result={result}
              />
              {showHowTested && (
                <MseGroupDetailSection
                  label="How Tested"
                  field="insightHowTested"
                  options={INSIGHTS_HOWTESTED_BLOCK_OPTIONS}
                  result={result}
                />
              )}
            </>
          ) : (
            <>
              <GroupSelectSection
                label="Insight"
                field="insight"
                options={INSIGHTS_BLOCK_OPTIONS}
                errorField={ERROR_ID}
              />
              {showHowTested && (
                <GroupSelectSection
                  label="How Tested"
                  field="insightHowTested"
                  options={INSIGHTS_HOWTESTED_BLOCK_OPTIONS}
                  errorField={ERROR_ID}
                />
              )}
            </>
          )}
        </>
      </Flex>
    </Flex>
  )
}

export { InsightsBlock }
