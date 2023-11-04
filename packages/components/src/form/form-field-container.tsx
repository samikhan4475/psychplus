import * as React from 'react'
import { Flex } from '@radix-ui/themes'

interface FormFieldContainerProps {
  label?: string
}

const FormFieldContainer = ({
  children,
}: React.PropsWithChildren<FormFieldContainerProps>) => (
  <Flex direction="column" gap="1">
    {children}
  </Flex>
)

export { FormFieldContainer }
