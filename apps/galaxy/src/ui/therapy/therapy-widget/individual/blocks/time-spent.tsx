import { Flex } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { FormFieldError, RadioSelectInput } from '@/components'
import { TherapySchemaType } from '../therapy-schema'

const BLOCK_ID = 'therapyTimeSpent'

export const BLOCK_OPTIONS = [
  {
    label: '16-37 mins',
    value: 'timeRangeOne',
    min: 16,
    max: 37,
  },
  {
    label: '38-52 mins',
    value: 'timeRangeTwo',
    min: 38,
    max: 52,
  },
  {
    label: '53-99 mins',
    value: 'timeRangeThree',
    min: 53,
    max: 99,
  },
]

const TherapyTimeSpentBlock = () => {
  const { watch } = useFormContext<TherapySchemaType>()
  const therapyTimeSpent = watch(BLOCK_ID)
  return (
    <Flex height="24" align="center" gap="4" className="bg-white z-10">
      <RadioSelectInput
        label="Time Spent"
        field={BLOCK_ID}
        options={BLOCK_OPTIONS}
        required
      />
      {!therapyTimeSpent && <FormFieldError name={BLOCK_ID} />}
    </Flex>
  )
}

export { TherapyTimeSpentBlock }
