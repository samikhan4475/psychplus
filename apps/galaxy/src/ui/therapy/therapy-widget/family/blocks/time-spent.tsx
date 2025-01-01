import { Flex } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { FormError, RadioSelectInput } from '@/components'
import { FamilyTherapySchemaType } from '../therapy-schema'

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
  const {
    watch,
    formState: { errors },
  } = useFormContext<FamilyTherapySchemaType>()
  const therapyTimeSpent = watch('therapyTimeSpent')
  const therapyTimeSpentError = errors.therapyTimeSpent?.message || ''

  return (
    <Flex height="24" align="center" gap="4" className="bg-white z-10">
      <RadioSelectInput
        label="Time Spent"
        field={BLOCK_ID}
        options={BLOCK_OPTIONS}
        required
      />
      <FormError message={therapyTimeSpent ? '' : therapyTimeSpentError} />
    </Flex>
  )
}

export { TherapyTimeSpentBlock }
