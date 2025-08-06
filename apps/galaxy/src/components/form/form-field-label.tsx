import { Flex, Text } from '@radix-ui/themes'
import { cn } from '@/utils'

interface FormFieldLabelProps {
  id?: string
  className?: string
  labelClassName?: string
  required?: boolean
}

const FormFieldLabel = ({
  id,
  children,
  className,
  required,
  labelClassName,
}: React.PropsWithChildren<FormFieldLabelProps>) => {
  return (
    <Flex align="center" className={cn('text-[11px]', className)}>
      <Text
        as="label"
        weight="medium"
        className={cn('whitespace-nowrap', labelClassName)}
        htmlFor={id}
      >
        {children}
      </Text>
      {required ? (
        <Text className="ml-[2px] text-[11px] text-red-9">*</Text>
      ) : null}
    </Flex>
  )
}

export { FormFieldLabel }
