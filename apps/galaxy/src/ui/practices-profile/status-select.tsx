import { FormFieldContainer, FormFieldLabel, SelectInput } from '@/components'
import { STATUS_CODESET } from '../organization-practices/constants'

const StatusSelect = () => {
  return (
    <FormFieldContainer>
      <FormFieldLabel className="!text-1">Status</FormFieldLabel>
      <SelectInput
        size="1"
        options={STATUS_CODESET}
        name="recordStatus"
        buttonClassName="w-full h-6"
      />
    </FormFieldContainer>
  )
}

export { StatusSelect }
