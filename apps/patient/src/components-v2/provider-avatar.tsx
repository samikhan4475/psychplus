import { Specialist } from '@psychplus-v2/types'
import { cn, getUserInitials } from '@psychplus-v2/utils'
import { Avatar } from '@radix-ui/themes'

interface ProviderAvatarProps
  extends Omit<React.ComponentProps<typeof Avatar>, 'fallback' | 'src'> {
  provider: Specialist
}

const ProviderAvatar = ({
  provider,
  className,
  ...rest
}: ProviderAvatarProps) => {
  return (
    <Avatar
      src={
        provider.hasPhoto ? `/api/staff/${provider.id}/profileimage` : undefined
      }
      size={{ initial: '3', md: '6' }}
      alt="Provider Avatar"
      className={cn('border border-accent-6', className)}
      highContrast
      fallback={getUserInitials(provider.legalName)}
      {...rest}
    />
  )
}

export { ProviderAvatar }
