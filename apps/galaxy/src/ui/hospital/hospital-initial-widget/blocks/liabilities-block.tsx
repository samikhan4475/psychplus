import { GroupSelectOption, GroupSelectSection } from '@/components'
import {
  HospitalInitialFieldMapping,
  HospitalInitialPrefixes,
} from '../constants'

const BLOCK_ID = 'liabilities'

const BLOCK_TITLE = 'Liabilities'

const LIABILITIES_OPTIONS: GroupSelectOption<string>[] =
  HospitalInitialFieldMapping.filter(
    (mapping) =>
      mapping.value.split('_')[0] === HospitalInitialPrefixes.LIABILITIES,
  ).map((mapping) => ({
    label: mapping.label,
    value: mapping.value,
    ...(mapping.value === 'liabilities_other' && {
      details: {
        type: 'text',
        field: 'liabilitiesOtherDetails',
      },
    }),
  }))

const LiabilitiesBlock = ({ editable }: { editable?: boolean }) => {
  return (
    <GroupSelectSection
      label={BLOCK_TITLE}
      field={BLOCK_ID}
      options={LIABILITIES_OPTIONS}
      hasChild
      editable={editable}
    />
  )
}

export { LiabilitiesBlock }
