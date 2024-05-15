import { Flex } from '@radix-ui/themes'

const FeatureContainer = ({ children }: React.PropsWithChildren) => (
  <Flex
    direction="column"
    gap={{ xs: '5' }}
    className="border-y border-gray-5 xs:border-0"
  >
    {children}
  </Flex>
)

export { FeatureContainer }
