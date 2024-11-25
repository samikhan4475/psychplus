import { GroupSelectOption, GroupSelectSection } from '@/components'
import {
  HospitalInitialFieldMapping,
  HospitalInitialPrefixes,
} from '../constants'

const BLOCK_ID = 'precautions'

const BLOCK_TITLE = 'Precautions'

const PRECAUTIONS_OPTIONS: GroupSelectOption<string>[] =
  HospitalInitialFieldMapping.filter(
    (mapping) =>
      mapping.value.split('_')[0] === HospitalInitialPrefixes.PRECAUTIONS,
  ).map((mapping) => ({
    label: mapping.label,
    value: mapping.value,
    ...(mapping.value === 'precautions_other' && {
      details: {
        type: 'text',
        field: 'precautionsOtherDetails',
      },
    }),
  }))

const PrecautionsBlock = ({ editable }: { editable?: boolean }) => {
  return (
    <GroupSelectSection
      label={BLOCK_TITLE}
      field={BLOCK_ID}
      options={PRECAUTIONS_OPTIONS}
      hasChild
      editable={editable}
    />
  )
}

export { PrecautionsBlock }
