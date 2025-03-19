import { Flex, Text } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { CheckboxInput, FormFieldError } from '@/components'
import { cn } from '@/utils'
import {
  HospitalInitialFieldMapping,
  HospitalInitialPrefixes,
} from '../constants'
import { HospitalInitialWidgetSchemaType } from '../hospital-initial-widget-schema'

const BLOCK_TITLE = 'Need For Level Of Care'

const INTERACTIVE_COMPLEXITY_BLOCK_OPTIONS = HospitalInitialFieldMapping.filter(
  (mapping) => mapping.value.split('_')[0] === HospitalInitialPrefixes.NFLOC,
).map((mapping) => ({
  label: mapping.label,
  field: mapping.value,
  ...(mapping.value === 'precautions_other' && {
    details: {
      type: 'text',
      field: 'precautionsOtherDetails',
      maxLength: 500,
    },
  }),
}))

const NeedForLevelOfCareBlock = ({
  editable = true,
}: {
  editable?: boolean
}) => {
  const form = useFormContext<HospitalInitialWidgetSchemaType>()

  const selectedFields = form.watch('needForLevelOfCare') || []

  const handleCheckboxChange = (field: string, value: boolean) => {
    let updatedFields = [...selectedFields]
    if (value) updatedFields.push(field)
    else updatedFields = updatedFields.filter((item) => item !== field)

    form.setValue('needForLevelOfCare', updatedFields)
  }

  const {
    formState: { errors },
  } = form
  const hasError = errors?.needForLevelOfCare

  return (
    <Flex
      direction="column"
      gap="2"
      px="2"
      py="2"
      className={cn('w-[75%] rounded-3 border border-gray-7', {
        'border-red-7': hasError,
      })}
    >
      <Text className="cursor-default" weight="medium">
        {BLOCK_TITLE}
      </Text>

      <Flex direction="column" gap="2">
        {INTERACTIVE_COMPLEXITY_BLOCK_OPTIONS.map((option) => (
          <CheckboxInput
            key={option.field}
            label={option.label}
            field={option.field}
            checked={selectedFields.includes(option.field)}
            onCheckedChange={(checked) =>
              handleCheckboxChange(option.field, checked as boolean)
            }
            disabled={!editable}
            labelClassName="max-w-max"
          />
        ))}
        <FormFieldError name="needForLevelOfCare" />
      </Flex>
    </Flex>
  )
}

export { NeedForLevelOfCareBlock }
