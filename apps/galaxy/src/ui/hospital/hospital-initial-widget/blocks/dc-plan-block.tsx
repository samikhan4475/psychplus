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

const BLOCK_ID = 'dcPlan'

const BLOCK_TITLE = 'DC Plan'

const DcPlanOPTIONS: GroupSelectOption<string>[] =
  HospitalInitialFieldMapping.filter(
    (mapping) => mapping.value.split('_')[0] === HospitalInitialPrefixes.DCPLAN,
  ).map((mapping) => ({
    label: mapping.label,
    value: mapping.value,
    ...(mapping.value === 'dcplan_other' && {
      details: {
        type: 'text',
        field: 'dcplanOtherDetails',
        maxLength: 500,
      },
    }),
  }))

const DcPlanBlock = ({ editable }: { editable?: boolean }) => {
  const {
    formState: { errors },
  } = useFormContext<HospitalInitialWidgetSchemaType>()
  const hasError = !!errors.dcPlan
  return (
    <Flex>
      <GroupSelectSection
        label={BLOCK_TITLE}
        field={BLOCK_ID}
        options={DcPlanOPTIONS}
        hasChild
        editable={editable}
        chipClassName={`${hasError ? 'border border-tomato-11' : ''}`}
      />
      <FormFieldError className="ml-2" name="dcPlan" />
    </Flex>
  )
}

export { DcPlanBlock }
