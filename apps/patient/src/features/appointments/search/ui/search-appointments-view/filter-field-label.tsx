import { Text } from '@radix-ui/themes'

const FilterFieldLabel = ({ children }: React.PropsWithChildren) => (
  <Text weight="medium" className="text-[14px] text-accent-12">
    {children}
  </Text>
)

export { FilterFieldLabel }
