import { Flex } from '@radix-ui/themes'
import { BlockLabel, FormFieldError, SelectInput } from '@/components'

const options = [
  { label: 'Pending', value: 'Pending' },
  { label: 'Success', value: 'Success' },
  { label: 'Error', value: 'Error' }
]

const NotificationStatusField = () => {
  return (
    <Flex direction="column" className="flex-row items-center gap-1">
      <BlockLabel>Notification Status</BlockLabel>
      <SelectInput
        placeholder="Select"
        field="notificationStatus"
        buttonClassName="border-pp-gray-2 w-[122px] h-6 border border-solid !outline-none [box-shadow:none]"
        options={options}
        tooltip
      />
      <FormFieldError name="orderStatus" />
    </Flex>
  )
}

export { NotificationStatusField }
