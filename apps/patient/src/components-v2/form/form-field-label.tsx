import { cn } from '@psychplus-v2/utils'
import { Flex, Text } from '@radix-ui/themes'
import { AsteriskIcon } from 'lucide-react'

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
}: React.PropsWithChildren<FormFieldLabelProps>) => (
  <Flex gap="1">
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
    <Text>{required && <AsteriskIcon color="red" size="12" />}</Text>
  </Flex>
)

export { FormFieldLabel }
