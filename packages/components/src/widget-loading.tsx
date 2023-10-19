import { Loader2Icon } from 'lucide-react'

const WidgetLoading = () => (
  <div className="flex h-full w-full items-center justify-center">
    <Loader2Icon size={64} className="animate-spin text-blue-500" />
  </div>
)

export { WidgetLoading }
