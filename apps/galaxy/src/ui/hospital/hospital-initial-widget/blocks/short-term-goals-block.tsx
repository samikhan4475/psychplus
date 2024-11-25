import { GroupSelectOption, GroupSelectSection } from '@/components'
import {
  HospitalInitialFieldMapping,
  HospitalInitialPrefixes,
} from '../constants'

const BLOCK_ID = 'shortTermGoals'

const BLOCK_TITLE = 'Short Term Goals'

const SHORT_TERM_GOALS_OPTIONS: GroupSelectOption<string>[] =
  HospitalInitialFieldMapping.filter(
    (mapping) => mapping.value.split('_')[0] === HospitalInitialPrefixes.STG,
  ).map((mapping) => ({
    label: mapping.label,
    value: mapping.value,
    ...(mapping.value === 'stg_other' && {
      details: {
        type: 'text',
        field: 'stgOtherDetails',
      },
    }),
  }))

const ShortTermGoalsBlock = ({ editable }: { editable?: boolean }) => {
  return (
    <GroupSelectSection
      label={BLOCK_TITLE}
      field={BLOCK_ID}
      options={SHORT_TERM_GOALS_OPTIONS}
      hasChild
      editable={editable}
    />
  )
}

export { ShortTermGoalsBlock }
