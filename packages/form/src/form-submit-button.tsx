import { Button, type ButtonProps } from '@psychplus/ui/button'

type FormSubmitButtonProps = Omit<ButtonProps, 'type'>

const FormSubmitButton = (props: FormSubmitButtonProps) => (
  <Button size="3" {...props} type="submit" />
)

export { FormSubmitButton }
