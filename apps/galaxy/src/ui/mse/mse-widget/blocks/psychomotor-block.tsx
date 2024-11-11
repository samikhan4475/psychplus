import { GroupSelectSection } from '@/components'
import { MseGroupDetailSection } from '../history/mse-details/mse-group-detail-section'
import { MseWidgetSchemaType } from '../mse-widget-schema'
import { GroupSelectOption } from '../types'

const BLOCK_ID = 'psychomotor'

const BLOCK_TITLE = 'Psychomotor'

const BLOCK_OPTIONS: GroupSelectOption<string>[] = [
  {
    label: 'No slow/agitations',
    value: 'psyNoSlowAgitations',
  },
  {
    label: 'Slowing',
    value: 'psySlowing',
  },
  {
    label: 'Agitation',
    value: 'psyAgitation',
  },
  {
    label: 'Catatonic',
    value: 'psyCatatonic',
  },
  {
    label: 'Tremors',
    value: 'psyTremors',
  },
  {
    label: 'TD',
    value: 'psyTd',
  },
  {
    label: 'Tics',
    value: 'psyTics',
  },
  {
    label: 'Other',
    value: 'psyOther',
    details: {
      type: 'text',
      field: 'psyOtherDetails',
    },
  },
]

const PsychomotorBlock = ({ result }: { result?: MseWidgetSchemaType }) => {
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

export { PsychomotorBlock }
