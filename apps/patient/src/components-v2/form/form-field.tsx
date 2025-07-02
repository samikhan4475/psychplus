import { FormFieldContainer } from './form-field-container'
import { FormFieldError } from './form-field-error'
import { FormFieldLabel } from './form-field-label'

interface FormFieldProps {
  name: string
  label: string
  containerClassName?: string
  required?: boolean
  showError?: boolean
}

const FormField = ({
  name,
  label,
  children,
  containerClassName,
  required,
  showError = true,
}: React.PropsWithChildren<FormFieldProps>) => (
  <FormFieldContainer className={containerClassName}>
    <FormFieldLabel required={required}>{label}</FormFieldLabel>
    {children}
    {showError && <FormFieldError name={name} />}
  </FormFieldContainer>
)

export { FormField }
