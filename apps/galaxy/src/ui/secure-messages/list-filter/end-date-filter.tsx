import { Flex, Text } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { DatePickerInput } from '@/components'
import { SchemaType } from '../schema'

const EndDate = () => {
  const form = useFormContext<SchemaType>()
  return (
    <Flex width="100%" className="gap-[6px]" align="center">
      <Text size="4" weight="medium">
        -
      </Text>
      <DatePickerInput
        className="w-[248px] "
        field="to"
        granularity="day"
        dateInputClass="h-6"
        minValue={form.watch('from') ?? undefined}
      />
    </Flex>
  )
}

export { EndDate }
