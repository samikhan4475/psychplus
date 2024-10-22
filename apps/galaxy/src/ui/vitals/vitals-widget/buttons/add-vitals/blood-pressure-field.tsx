import { Flex } from '@radix-ui/themes'
import { SchemaType } from './add-vitals-form'
import { NumberField } from './number-field'

const BloodPressureField = () => {
  return (
    <Flex gap="1">
      <NumberField
        field={'systolic' as SchemaType}
        className="w-[30px]"
        unit="sys"
      />

      <NumberField
        field={'diastolic' as SchemaType}
        className="w-[30px]"
        unit="dis"
      />
    </Flex>
  )
}

export { BloodPressureField }
