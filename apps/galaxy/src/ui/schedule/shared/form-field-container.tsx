import { Flex } from '@radix-ui/themes'
import { cn } from '@/utils'

interface FormFieldContainerProps {
  className?: string
}

const FormFieldContainer = ({
  children,
  className,
}: React.PropsWithChildren<FormFieldContainerProps>) => (
  <Flex className={cn('gap-[2px] flex-1', className)}>
    {children}
  </Flex>
)

export { FormFieldContainer }
