import { useSearchParams } from 'next/navigation'
import { Flex } from '@radix-ui/themes'
import { GroupSelectSection } from '@/components'
import { ERROR_ID } from '../constants'
import { MseGroupDetailSection } from '../history/mse-details/mse-group-detail-section'
import { type MseWidgetSchemaType } from '../mse-widget-schema'
import { GroupSelectOption } from '../types'

const JUDGEMENT_BLOCK_OPTIONS: GroupSelectOption<string>[] = [
  { label: 'Poor', value: 'jdgPoor' },
  { label: 'Fair', value: 'jdgFair' },
  {
    label: 'Other',
    value: 'jdgOther',
    details: {
      type: 'text',
      field: 'jdgOtherDetails',
    },
  },
]

const JUDGEMENT_HOWTESTED_BLOCK_OPTIONS: GroupSelectOption<string>[] = [
  {
    label: 'Recent decision making',
    value: 'jdghtRecentDecisionMaking',
  },
  { label: 'Severe symptoms', value: 'jdghtSevereSymptoms' },
  {
    label: 'Other',
    value: 'jdghtOther',
    details: {
      type: 'text',
      field: 'jdghtOtherDetails',
      maxLength: 500,
    },
  },
]

const JudgementBlock = ({ result }: { result?: MseWidgetSchemaType }) => {
  const visitSequence = useSearchParams().get('visitSequence') || ''
  const showHowTested = ['New', 'Initial'].includes(visitSequence)
  return (
    <Flex gap="2">
      <Flex align="center" gap="2" wrap="wrap">
        <>
          {result ? (
            <>
              <MseGroupDetailSection
                label="Judgment"
                field="judgment"
                options={JUDGEMENT_BLOCK_OPTIONS}
                result={result}
              />
              {showHowTested && (
                <MseGroupDetailSection
                  label="How Tested"
                  field="judgmentHowTested"
                  options={JUDGEMENT_HOWTESTED_BLOCK_OPTIONS}
                  result={result}
                />
              )}
            </>
          ) : (
            <>
              <GroupSelectSection
                label="Judgment"
                field="judgment"
                options={JUDGEMENT_BLOCK_OPTIONS}
                errorField={ERROR_ID}
              />
              {showHowTested && (
                <GroupSelectSection
                  label="How Tested"
                  field="judgmentHowTested"
                  options={JUDGEMENT_HOWTESTED_BLOCK_OPTIONS}
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

export { JudgementBlock }
