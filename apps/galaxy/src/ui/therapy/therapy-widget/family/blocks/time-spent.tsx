import { Flex } from '@radix-ui/themes'
import { FormFieldError, RadioSelectInput } from '@/components'

const BLOCK_ID = 'therapyTimeSpent'

export const BLOCK_OPTIONS = [
  {
    label: '26-99 mins',
    value: 'timeRangeOne',
    min: 26,
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
      <FormFieldError name={'therapyTimeSpent'} />
    </Flex>
  )
}

export { TherapyTimeSpentBlock }
