import { Flex } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { cn } from '@/utils'
import { SpravatoWidgetSchemaType } from '../../../spravato-widget-schema'
import { NumberField } from './number-field'

const BloodPressureField = () => {
  const form = useFormContext<SpravatoWidgetSchemaType>()

  const newVitalSign = form.watch('newVitalSign')

  return (
    <Flex gap="1">
      <NumberField
        field="newVitalSign.systolic"
        className={cn(
          'w-[36px]',
          Number(newVitalSign?.systolic) >= 140 &&
            'border-pp-states-error outline-pp-states-error text-pp-states-error border-[0.5px]',
        )}
        unit="sys"
      />

      <NumberField
        field="newVitalSign.diastolic"
        className={cn(
          'w-[36px]',
          Number(newVitalSign?.diastolic) >= 90 &&
            'border-pp-states-error outline-pp-states-error text-pp-states-error border-[0.5px] ',
        )}
        unit="dis"
      />
    </Flex>
  )
}

export { BloodPressureField }
