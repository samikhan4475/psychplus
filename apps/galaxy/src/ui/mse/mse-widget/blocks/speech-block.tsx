import { GroupSelectSection } from '@/components'
import { MseGroupDetailSection } from '../history/mse-details/mse-group-detail-section'
import { MseWidgetSchemaType } from '../mse-widget-schema'
import { GroupSelectOption } from '../types'

const BLOCK_ID = 'speech'

const BLOCK_TITLE = 'Speech'

const BLOCK_OPTIONS: GroupSelectOption<string>[] = [
  {
    label: 'Regular rate/rhythm',
    value: 'speRegularRateRhythm',
  },
  {
    label: 'Rapid',
    value: 'speRapid',
  },
  {
    label: 'Pressured',
    value: 'spePressured',
  },
  {
    label: 'Slow',
    value: 'speSlow',
  },
  {
    label: 'Soft',
    value: 'speSoft',
  },
  {
    label: 'Loud',
    value: 'speLoud',
  },
  {
    label: 'Muffled',
    value: 'speMuffled',
  },
  {
    label: 'Other',
    value: 'speOther',
    details: {
      type: 'text',
      field: 'speOtherDetails',
    },
  },
]

const SpeechBlock = ({ result }: { result?: MseWidgetSchemaType }) => {
  return (
    <>
      {result ? (
        <MseGroupDetailSection
          label={BLOCK_TITLE}
          field={BLOCK_ID}
          options={BLOCK_OPTIONS}
          result={result}
        />
      ) : (
        <GroupSelectSection
          label={BLOCK_TITLE}
          field={BLOCK_ID}
          options={BLOCK_OPTIONS}
        />
      )}
    </>
  )
}

export { SpeechBlock }
