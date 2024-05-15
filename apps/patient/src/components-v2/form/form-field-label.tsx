import { cn } from '@psychplus-v2/utils'
import { Text } from '@radix-ui/themes'

interface FormFieldLabelProps {
  id?: string
  className?: string
}

const FormFieldLabel = ({
  id,
  children,
  className,
}: React.PropsWithChildren<FormFieldLabelProps>) => (
  <Text
    as="label"
    weight="medium"
    className={cn('text-[14px]', className, {
      'cursor-pointer': id !== undefined,
    })}
    htmlFor={id}
  >
    {children}
  </Text>
)

export { FormFieldLabel }
