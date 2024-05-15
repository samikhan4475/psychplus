'use client'

import { Text } from '@radix-ui/themes'

const FieldPlaceholder = ({ children }: React.PropsWithChildren) => (
  <Text
    weight="medium"
    className="mt-[2px] flex cursor-pointer items-center text-[13px] text-accent-12 underline-offset-2 hover:underline"
  >
    {children}
  </Text>
)

export { FieldPlaceholder }
