import { Time } from '@internationalized/date'
import { Flex } from '@radix-ui/themes'
import { I18nProvider } from 'react-aria-components'
import { useFormContext } from 'react-hook-form'
import {
  BlockLabel,
  DatePickerInput,
  FormFieldError,
  TimeInput,
} from '@/components'

const OrderDateTime = () => {
  const form = useFormContext()
  const orderTime = form.watch('orderTime')

  return (
    <Flex direction="column" gap="1">
      <BlockLabel className="text-1 font-medium">Order Date & Time</BlockLabel>
      <Flex direction="row" className="gap-[6px]">
        <Flex direction="column" className="gap-1">
          <I18nProvider locale="en-US">
            <DatePickerInput field="orderDate" className="h-7 w-[117px]" />
          </I18nProvider>
          <FormFieldError name="orderDate" />
        </Flex>
        <TimeInput
          field="orderTime"
          label=""
          hourCycle={24}
          dateInputClass="h-7 w-[117px]"
          onChange={(value) => {
            console.log(value.toString())
            form.setValue(
              'orderTime',
              `${value.toString().split(':')[0]}:${
                value.toString().split(':')[1]
              }`,
            )
          }}
          value={
            orderTime
              ? ({
                  hour: orderTime.split(':')[0],
                  minute: orderTime.split(':')[1],
                  millisecond: 0,
                  second: 0,
                } as Time)
              : null
          }
        />
        <FormFieldError name="orderTime" />
      </Flex>
    </Flex>
  )
}

export { OrderDateTime }
