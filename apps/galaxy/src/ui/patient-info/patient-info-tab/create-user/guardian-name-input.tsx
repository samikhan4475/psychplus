import { useEffect } from 'react'
import { TextField } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
} from '@/components'
import { PatientInfoSchemaType } from '../patient-info-schema'

const GuardianNameInput = () => {
  const { watch, register } = useFormContext<PatientInfoSchemaType>()

  const hasGuardian = watch('hasGuardian')

  useEffect(() => {
    register('guardian.name.firstName')
    register('guardian.name.lastName')
  }, [register])

  return (
    hasGuardian && (
      <>
        <FormFieldContainer>
          <FormFieldLabel className="!text-1" required>
            Guardian First Name
          </FormFieldLabel>
          <TextField.Root
            size="1"
            className={textFieldClassName}
            placeholder="First Name"
            {...register('guardian.name.firstName')}
          />
          <FormFieldError name="guardian.name.firstName" />
        </FormFieldContainer>
        <FormFieldContainer>
          <FormFieldLabel className="!text-1" required>
            Guardian Last Name
          </FormFieldLabel>
          <TextField.Root
            size="1"
            className={textFieldClassName}
            placeholder="Last Name"
            {...register('guardian.name.lastName')}
          />
          <FormFieldError name="guardian.name.lastName" />
        </FormFieldContainer>
      </>
    )
  )
}
const textFieldClassName =
  'border-pp-gray-2 w-full h-6 border border-solid !outline-none [box-shadow:none]'
export { GuardianNameInput }
