import { Avatar } from '@radix-ui/themes'
import { PatientProfile } from '@/types'

interface PatientAvatarProps {
  patient?: PatientProfile
}

const PatientCardAvatar = ({ patient }: PatientAvatarProps) => {
  const avatarSource = patient?.hasPhoto
    ? `/ehr/api/patients/${patient?.id}/profileimage`
    : undefined

  return <Avatar src={avatarSource} fallback="NA" size="7" highContrast />
}

export { PatientCardAvatar }
