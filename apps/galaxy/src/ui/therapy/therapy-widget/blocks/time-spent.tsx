import { Flex } from '@radix-ui/themes'
import { RadioSelectInput } from '@/components'

const BLOCK_ID = 'therapyTimeSpent'

const BLOCK_OPTIONS = [
  {
    label: '16-37 mins',
    value: '16-37 mins',
  },
  {
    label: '38-52 mins',
    value: '38-52 mins',
  },
  {
    label: '53-99 mins',
    value: '53-99 mins',
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
