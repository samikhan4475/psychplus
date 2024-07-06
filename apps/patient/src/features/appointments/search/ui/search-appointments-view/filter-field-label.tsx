import { Text } from '@radix-ui/themes'

const FilterFieldLabel = ({ children }: React.PropsWithChildren) => (
  <Text weight="medium" className="mr-2 text-[16px] text-accent-12">
    {children}
  </Text>
)

export { FilterFieldLabel }
