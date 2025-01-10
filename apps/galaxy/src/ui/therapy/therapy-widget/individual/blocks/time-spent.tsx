import { Flex } from '@radix-ui/themes'
import { FormFieldError, RadioSelectInput } from '@/components'

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
  return (
    <Flex height="24" align="center" gap="4" className="bg-white z-10">
      <RadioSelectInput
        label="Time Spent"
        field={BLOCK_ID}
        options={BLOCK_OPTIONS}
        required
      />
      <FormFieldError name={BLOCK_ID} />
    </Flex>
  )
}

export { TherapyTimeSpentBlock }
