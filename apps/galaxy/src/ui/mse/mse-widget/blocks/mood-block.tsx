import { GroupSelectSection } from '@/components'
import { ERROR_ID } from '../constants'
import { MseGroupDetailSection } from '../history/mse-details/mse-group-detail-section'
import { MseWidgetSchemaType } from '../mse-widget-schema'
import { GroupSelectOption } from '../types'

const BLOCK_ID = 'mood'

const BLOCK_TITLE = 'Mood'

const BLOCK_OPTIONS: GroupSelectOption<string>[] = [
  {
    label: 'Depressed',
    value: 'modDepressed',
  },
  {
    label: 'Dysphoric',
    value: 'modDysphoric',
  },
  {
    label: 'Anxious',
    value: 'modAnxious',
  },
  {
    label: 'Elevated',
    value: 'modElevated',
  },
  {
    label: 'Irritable',
    value: 'modIrritable',
  },
  {
    label: 'Angry',
    value: 'modAngry',
  },
  {
    label: 'Euthymic',
    value: 'modEuthymic',
  },
  {
    label: 'Other',
    value: 'modOther',
    details: {
      type: 'text',
      field: 'modOtherDetails',
      maxLength: 500,
    },
  },
]

const MoodBlock = ({ result }: { result?: MseWidgetSchemaType }) => {
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

export { MoodBlock }
