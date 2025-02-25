import { ComponentProps } from 'react'
import { IconButton } from '@radix-ui/themes'
import { DownloadIcon } from 'lucide-react'

const DownloadButton = ({ onClick }: ComponentProps<typeof IconButton>) => {
  return (
    <IconButton
      variant="outline"
      onClick={onClick}
      className="text-black h-6 rounded-[2px] [box-shadow:inset_0_0_0_0.5px_#9E9898CC]"
    >
      <DownloadIcon width={16} height={16} />
    </IconButton>
  )
}

export { DownloadButton }
