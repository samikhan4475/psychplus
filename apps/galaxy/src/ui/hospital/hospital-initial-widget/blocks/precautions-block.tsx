import { GroupSelectOption, GroupSelectSection } from '@/components'
import {
  HospitalInitialFieldMapping,
  HospitalInitialPrefixes,
} from '../constants'
import { useFormContext } from 'react-hook-form'
import { HospitalInitialWidgetSchemaType } from '../hospital-initial-widget-schema'

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
        maxLength: 500,
      },
    }),
  }))

const PrecautionsBlock = ({ editable }: { editable?: boolean }) => {
  const { formState: { errors } } = useFormContext<HospitalInitialWidgetSchemaType>();
  const hasError = errors?.precautions
  return (
    <GroupSelectSection
      label={BLOCK_TITLE}
      field={BLOCK_ID}
      options={PRECAUTIONS_OPTIONS}
      hasChild
      editable={editable}
      chipClassName={`${hasError ? 'border border-tomato-11' : ''}`}
    />
  )
}

export { PrecautionsBlock }
