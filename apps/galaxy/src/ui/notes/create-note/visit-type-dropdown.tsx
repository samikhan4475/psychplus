import { Flex } from '@radix-ui/themes'
import { FormFieldError, FormFieldLabel, SelectInput } from '@/components'

const VisitTypeDropdown = () => {
  return (
    <Flex direction="column" className={'w-full gap-0.5'}>
      <FormFieldLabel className="text-1 leading-[16px]">
        Visit Type
      </FormFieldLabel>
      <SelectInput
        field="visitType"
        placeholder="Select Visit Type"
        buttonClassName={buttonClassName}
      />
      <FormFieldError name="visitType" />
    </Flex>
  )
}

const buttonClassName =
  'border-pp-gray-2 w-full h-6 border border-solid !outline-none [box-shadow:none]'

export { VisitTypeDropdown }
