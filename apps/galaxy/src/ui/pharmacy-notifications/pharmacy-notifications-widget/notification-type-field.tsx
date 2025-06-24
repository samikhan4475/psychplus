import { Flex } from '@radix-ui/themes'
import { BlockLabel, FormFieldError, SelectInput } from '@/components'

const options = [
  { label: 'Status Message', value: 'StatusMessage' },
  { label: 'Error Message', value: 'ErrorMessage' },
  { label: 'Verify Message', value: 'VerifyMessage' },
]

const NotificationTypeField = () => {
  return (
    <Flex direction="column" className="flex-row items-center gap-1">
      <BlockLabel>Notification Type</BlockLabel>
      <SelectInput
        placeholder="Select"
        field="notificationType"
        buttonClassName="border-pp-gray-2 w-[122px] h-6 border border-solid !outline-none [box-shadow:none]"
        options={options}
        tooltip
      />
    </Flex>
  )
}

export { NotificationTypeField }
