import { GroupSelectSection } from '@/components'
import { ERROR_ID } from '../constants'
import { MseGroupDetailSection } from '../history/mse-details/mse-group-detail-section'
import { MseWidgetSchemaType } from '../mse-widget-schema'
import { GroupSelectOption } from '../types'

const BLOCK_ID = 'appearance'

const BLOCK_TITLE = 'Appearance'

const BLOCK_OPTIONS: GroupSelectOption<string>[] = [
  {
    label: 'Casual dress',
    value: 'appCasualDress',
  },
  {
    label: 'Disheveled',
    value: 'appDisheveled',
  },
  {
    label: 'Bad order',
    value: 'appBadOrder',
  },
  {
    label: 'Obese',
    value: 'appObese',
  },
  {
    label: 'Other',
    value: 'appOther',
    details: {
      type: 'text',
      field: 'appOtherDetails',
      maxLength: 500,
    },
  },
]

const AppearanceBlock = ({ result }: { result?: MseWidgetSchemaType }) => {
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
          errorField={ERROR_ID}
        />
      )}
    </>
  )
}

export { AppearanceBlock }
