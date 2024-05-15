import { Flex } from '@radix-ui/themes'

const FormFieldContainer = (props: React.ComponentProps<typeof Flex>) => (
  <Flex direction="column" gap="1" {...props} />
)

export { FormFieldContainer }
