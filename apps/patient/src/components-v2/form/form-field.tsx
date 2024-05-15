import { FormFieldContainer } from './form-field-container'
import { FormFieldError } from './form-field-error'
import { FormFieldLabel } from './form-field-label'

interface FormFieldProps {
  name: string
  label: string
  containerClassName?: string
}

const FormField = ({
  name,
  label,
  children,
  containerClassName,
}: React.PropsWithChildren<FormFieldProps>) => (
  <FormFieldContainer className={containerClassName}>
    <FormFieldLabel>{label}</FormFieldLabel>
    {children}
    <FormFieldError name={name} />
  </FormFieldContainer>
)

export { FormField }
