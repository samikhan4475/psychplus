import { GroupSelectSection } from '@/components'
import { MseGroupDetailSection } from '../history/mse-details/mse-group-detail-section'
import { MseWidgetSchemaType } from '../mse-widget-schema'
import { GroupSelectOption } from '../types'

const BLOCK_ID = 'behavior'

const BLOCK_TITLE = 'Behavior'

const BLOCK_OPTIONS: GroupSelectOption<string>[] = [
  {
    label: 'Redirectable',
    value: 'behRedirectable',
  },
  {
    label: 'Uncooperative',
    value: 'behUncooperative',
  },
  {
    label: 'Poor eye contact',
    value: 'behPoorEyeContact',
  },
  {
    label: 'Other',
    value: 'behOther',
    details: {
      type: 'text',
      field: 'behOtherDetails',
    },
  },
]

const BehaviorBlock = ({ result }: { result?: MseWidgetSchemaType }) => {
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

export { BehaviorBlock }
