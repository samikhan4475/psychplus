import { Text } from '@radix-ui/themes'
import { cn } from '@/utils'

interface FormFieldLabelProps {
  id?: string
  className?: string
  required?: boolean
}

const FormFieldLabel = ({
  id,
  children,
  className,
  required,
}: React.PropsWithChildren<FormFieldLabelProps>) => {
  return (
    <Text
      as="label"
      weight="medium"
      className={cn('text-[11px]', className)}
      htmlFor={id}
    >
      {children}
      {required ? (
        <Text className="ml-[2px] text-[12px] text-red-9">*</Text>
      ) : null}
    </Text>
  )
}

export { FormFieldLabel }
