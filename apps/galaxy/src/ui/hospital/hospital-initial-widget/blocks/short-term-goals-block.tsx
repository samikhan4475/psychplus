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
        maxLength: 500,
      },
    }),
  }))

const ShortTermGoalsBlock = ({ editable }: { editable?: boolean }) => {
  const {
    formState: { errors },
  } = useFormContext<HospitalInitialWidgetSchemaType>()
  const hasError = errors?.shortTermGoals
  return (
    <Flex>
      <GroupSelectSection
        label={BLOCK_TITLE}
        field={BLOCK_ID}
        options={SHORT_TERM_GOALS_OPTIONS}
        hasChild
        editable={editable}
        chipClassName={`${hasError ? 'border border-tomato-11' : ''}`}
      />
      <FormFieldError className="ml-2" name="shortTermGoals" />
    </Flex>
  )
}

export { ShortTermGoalsBlock }
