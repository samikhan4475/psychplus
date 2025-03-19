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
        maxLength: 500,
      },
    }),
  }))

const LiabilitiesBlock = ({ editable }: { editable?: boolean }) => {
  const {
    formState: { errors },
  } = useFormContext<HospitalInitialWidgetSchemaType>()
  const hasError = errors?.liabilities
  return (
    <>
      <Flex>
        <GroupSelectSection
          label={BLOCK_TITLE}
          field={BLOCK_ID}
          options={LIABILITIES_OPTIONS}
          hasChild
          editable={editable}
          chipClassName={`${hasError ? 'border border-tomato-11' : ''}`}
        />
        <FormFieldError className="ml-2" name="liabilities" />
      </Flex>
    </>
  )
}

export { LiabilitiesBlock }
