import { Avatar } from '@radix-ui/themes'
import { PatientProfile } from '@/types'

interface UserAvatarProps {
  user: PatientProfile
}

const UserAvatar = ({ user }: UserAvatarProps) => {
  const avatarSrc = user.hasPhoto
    ? `/ehr/api/patients/${user.id}/profileimage`
    : undefined

  return <Avatar src={avatarSrc} fallback="NA" size="6" highContrast />
}

export { UserAvatar }
