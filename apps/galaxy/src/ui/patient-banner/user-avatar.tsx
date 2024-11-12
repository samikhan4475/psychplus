import { Avatar } from '@radix-ui/themes'
import { PatientProfile } from '@/types'

interface PatientBannerProps {
  user: PatientProfile
}

const UserAvatar = async ({ user }: PatientBannerProps) => {
  return (
    <Avatar
      src={
        user.hasPhoto ? `/ehr/api/patients/${user.id}/profileimage` : undefined
      }
      fallback="NA"
      size="7"
      highContrast
    />
  )
}

export { UserAvatar }
