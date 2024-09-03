import { Flex, Text } from '@radix-ui/themes'
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
    <Flex align="center" className="h-[18px]">
      <Text
        as="label"
        weight="medium"
        className={cn('text-[11px]', className)}
        htmlFor={id}
      >
        {children}
      </Text>
      {required ? (
        <Text className="ml-[2px] text-[12px] text-red-9">*</Text>
      ) : null}
    </Flex>
  )
}

export { FormFieldLabel }
