import { Flex } from '@radix-ui/themes'

const FormFieldContainer = ({ children }: React.PropsWithChildren) => (
  <Flex direction="column" className="gap-[2px]">
    {children}
  </Flex>
)

export { FormFieldContainer }
