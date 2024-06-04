'use client'

import { Text } from '@radix-ui/themes'

const FieldPlaceholder = ({ children }: React.PropsWithChildren) => (
  <Text
    weight="medium"
    className="mt-[2px] flex cursor-pointer items-center text-[15px] text-[#194595] underline underline-offset-2"
  >
    {children}
  </Text>
)

export { FieldPlaceholder }
