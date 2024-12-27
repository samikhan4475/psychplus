import { Flex, TextField } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { BlockLabel, FormFieldError } from '@/components'
import { LabOrderSchemaType } from '../lab-order-schema'

const OrderDateTime = () => {
  const form = useFormContext<LabOrderSchemaType>()

  return (
    <Flex direction="column" gap="1">
      <BlockLabel className="text-1 font-medium">Order Date & Time</BlockLabel>
      <Flex direction="row" className="gap-[6px]">
        <Flex direction="column" className="gap-1">
          <TextField.Root
            type="date"
            size="1"
            {...form.register('orderDate')}
            className="border-pp-gray-2 h-7 w-[117px] border border-solid !outline-none [box-shadow:none] [&__.rt-TextFieldInput]:!inline-block"
          />
          <FormFieldError name="orderDate" />
        </Flex>
        <TextField.Root
          type="time"
          size="1"
          {...form.register('orderTime')}
          className="border-pp-gray-2 h-7 w-[117px] border border-solid !outline-none [box-shadow:none] [&__.rt-TextFieldInput]:!inline-block"
        />
        <FormFieldError name="orderTime" />
      </Flex>
    </Flex>
  )
}

export { OrderDateTime }
