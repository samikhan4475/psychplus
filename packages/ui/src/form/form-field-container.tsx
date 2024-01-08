import { Flex } from '@radix-ui/themes'

const FormFieldContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <Flex direction="column" gap="1">
      {children}
    </Flex>
  )
}

export { FormFieldContainer }
