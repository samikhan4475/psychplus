import { Flex } from '@radix-ui/themes'
import { Loader2Icon } from 'lucide-react'

const WidgetLoading = () => (
  <Flex align="center" justify="center" height="100%" width="100%">
    <Loader2Icon size={64} className="animate-spin text-accent-9" />
  </Flex>
)

export { WidgetLoading }
