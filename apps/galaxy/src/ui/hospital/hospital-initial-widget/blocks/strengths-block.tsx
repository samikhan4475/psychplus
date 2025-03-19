import { Flex } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import {
  FormFieldError,
  GroupSelectOption,
  GroupSelectSection,
} from '@/components'
import {
  HospitalInitialFieldMapping,
  HospitalInitialPrefixes,
} from '../constants'
import { HospitalInitialWidgetSchemaType } from '../hospital-initial-widget-schema'

const BLOCK_ID = 'strengths'

const BLOCK_TITLE = 'Strengths'

const STRENGTHS_OPTIONS: GroupSelectOption<string>[] =
  HospitalInitialFieldMapping.filter(
    (mapping) =>
      mapping.value.split('_')[0] === HospitalInitialPrefixes.STRENGTHS,
  ).map((mapping) => ({
    label: mapping.label,
    value: mapping.value,
    ...(mapping.value === 'strengths_other' && {
      details: {
        type: 'text',
        field: 'strengthsOtherDetails',
        maxLength: 500,
      },
    }),
  }))

const StrengthsBlock = ({ editable }: { editable?: boolean }) => {
  const {
    formState: { errors },
  } = useFormContext<HospitalInitialWidgetSchemaType>()
  const hasError = errors?.strengths
  return (
    <Flex>
      <GroupSelectSection
        label={BLOCK_TITLE}
        field={BLOCK_ID}
        options={STRENGTHS_OPTIONS}
        hasChild
        editable={editable}
        chipClassName={`${hasError ? 'border border-tomato-11' : ''}`}
      />
      <FormFieldError className="ml-2" name="strengths" />
    </Flex>
  )
}

export { StrengthsBlock }
