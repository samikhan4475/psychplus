import { PropsWithChildren } from 'react'
import { Flex } from '@radix-ui/themes'

const AppointmentLayout = async ({ children }: PropsWithChildren) => {
  return (
    <Flex width="100%" height="100%">
      {children}
    </Flex>
  )
}

export default AppointmentLayout
