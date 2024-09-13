import { TextField } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
} from '@/components'
import { CreateUserSchema } from './create-user-schema'

const GuardianNameInput = () => {
  const form = useFormContext<CreateUserSchema>()

  const hasGuardian = form.watch('hasGuardian')

  if (hasGuardian === 'no') {
    return null
  }

  return (
    <>
      <FormFieldContainer>
        <FormFieldLabel className="!text-1" required>
          Guardian First Name
        </FormFieldLabel>
        <TextField.Root
          size="1"
          className={textFieldClassName}
          placeholder="First Name"
          {...form.register('guardianFirstName')}
        />
        <FormFieldError name="guardianFirstName" />
      </FormFieldContainer>
      <FormFieldContainer>
        <FormFieldLabel className="!text-1" required>
          Guardian Last Name
        </FormFieldLabel>
        <TextField.Root
          size="1"
          className={textFieldClassName}
          placeholder="Last Name"
          {...form.register('guardianLastName')}
        />
        <FormFieldError name="guardianLastName" />
      </FormFieldContainer>
    </>
  )
}
const textFieldClassName =
  'border-pp-gray-2 w-full h-6 border border-solid !outline-none [box-shadow:none]'
export { GuardianNameInput }
