import { GroupSelectSection } from '@/components'
import { ERROR_ID } from '../constants'
import { MseGroupDetailSection } from '../history/mse-details/mse-group-detail-section'
import { MseWidgetSchemaType } from '../mse-widget-schema'
import { GroupSelectOption } from '../types'

const BLOCK_ID = 'affect'

const BLOCK_TITLE = 'Affect'

const BLOCK_OPTIONS: GroupSelectOption<string>[] = [
  {
    label: 'Mood-congruent',
    value: 'affMoodCongruent',
  },
  {
    label: 'Mood-incongruent',
    value: 'affMoodIncongruent',
  },
  {
    label: 'Intense',
    value: 'affIntense',
  },
  {
    label: 'Restricted',
    value: 'affRestricted',
  },
  {
    label: 'Blunted',
    value: 'affBlunted',
  },
  {
    label: 'Flat',
    value: 'affFlat',
  },
  {
    label: 'Labile',
    value: 'affLabile',
  },
  {
    label: 'Guarded',
    value: 'affGuarded',
  },
  {
    label: 'Other',
    value: 'affOther',
    details: {
      type: 'text',
      field: 'affOtherDetails',
    },
  },
]

const AffectBlock = ({ result }: { result?: MseWidgetSchemaType }) => {
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

export { AffectBlock }
