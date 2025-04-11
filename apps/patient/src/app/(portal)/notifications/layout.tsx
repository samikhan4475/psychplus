'use client'

import { Box } from '@radix-ui/themes'
import { ViewContainer } from '@/components-v2'

const NotificationLayout = ({ children }: React.PropsWithChildren) => (
  <ViewContainer className="xs:px-5">
    <Box>{children}</Box>
  </ViewContainer>
)

export default NotificationLayout
