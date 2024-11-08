import { Flex } from '@radix-ui/themes'
import { RadioSelectInput } from '@/components'

const BLOCK_ID = 'therapyTimeSpent'

const BLOCK_OPTIONS = [
  {
    label: '16-37 mins',
    value: '16-37 mins',
    min: 16,
    max: 37,
  },
  {
    label: '38-52 mins',
    value: '38-52 mins',
    min: 38,
    max: 52,
  },
  {
    label: '53-99 mins',
    value: '53-99 mins',
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
    </Flex>
  )
}

export { TherapyTimeSpentBlock }
