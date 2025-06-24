import { Heading } from '@radix-ui/themes'

const FeatureHeading = ({ children }: React.PropsWithChildren) => (
  <Heading className="px-3 sm:px-5 text-[26px] text-accent-12 xs:px-0 sm:text-[42px]">
    {children}
  </Heading>
)

export { FeatureHeading }
