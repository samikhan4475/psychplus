import { Flex } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import {
  BlockLabel,
  FormFieldContainer,
  FormFieldError,
  NumberInput,
  SelectInput,
} from '@/components'
import { SpravatoWidgetSchemaType } from '../../spravato-widget-schema'

const TREATMENT_PER_UNIT = [
  {
    label: 'Day',
    value: 'day',
  },
  {
    label: 'Week',
    value: 'week',
  },
  {
    label: 'Month',
    value: 'month',
  },
]

const TREATMENT_PER_FREQUENCY = [
  {
    label: '1',
    value: '1',
  },
  {
    label: '2',
    value: '2',
  },
  {
    label: '3',
    value: '3',
  },
  {
    label: '4',
    value: '4',
  },
  {
    label: '5',
    value: '6',
  },
]

const ContinueWithMaintainance = () => {
  const form = useFormContext<SpravatoWidgetSchemaType>()

  const plan = form.watch('plan')

  return (
    plan.includes('Continue with Maintenance') && (
      <Flex
        className="mt-2 gap-2 rounded-3 border border-gray-7 p-2"
        direction="column"
      >
        <BlockLabel className="text-2 font-[600px]">
          Continue with Maintenance
        </BlockLabel>
        <Flex direction="row" gap="1">
          <FormFieldContainer className="flex-row items-center gap-1">
            <BlockLabel required>Treatment Frequency</BlockLabel>
            <NumberInput
              field="continueWithMaintainanceBlock.treatmentFrequency"
              format="#"
              placeholder=""
              onValueChange={(value) => {
                const currentBlock = form.getValues(
                  'continueWithMaintainanceBlock',
                )
                form.setValue('continueWithMaintainanceBlock', {
                  treatmentFrequency: value,
                  treatmentPerUnit: currentBlock?.treatmentPerUnit ?? '',
                })
              }}
            />
            <FormFieldError name="continueWithMaintainanceBlock.treatmentFrequency" />
          </FormFieldContainer>
          <BlockLabel>treatments per</BlockLabel>
          <SelectInput
            field="continueWithMaintainanceBlock.treatmentPerUnit"
            options={TREATMENT_PER_UNIT}
            onValueChange={(value) => {
              const currentBlock = form.getValues(
                'continueWithMaintainanceBlock',
              )
              form.setValue('continueWithMaintainanceBlock', {
                ...currentBlock,
                treatmentPerUnit: value,
              })
            }}
          />
        </Flex>
      </Flex>
    )
  )
}

export { ContinueWithMaintainance }
