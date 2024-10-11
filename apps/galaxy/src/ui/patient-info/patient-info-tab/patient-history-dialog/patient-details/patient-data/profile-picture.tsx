'use client'

import { Avatar } from '@radix-ui/themes'
import { Image as Fallback } from 'lucide-react'
import { GET_PATIENT_HISOTRY_PROFILE_IMAGE_ENDPOINT } from '@/api/endpoints'
import { useStore } from '../../store'

const ProfilePicture = ({ patientId }: { patientId: string }) => {
  const { selectedRow } = useStore((store) => ({
    selectedRow: store.selectedRow,
  }))

  const profileImage = selectedRow?.hasPhoto
    ? GET_PATIENT_HISOTRY_PROFILE_IMAGE_ENDPOINT(patientId, selectedRow?.id)
    : undefined

  return (
    <Avatar
      size="9"
      color="gray"
      src={profileImage}
      fallback={
        <Fallback size={120} className="text-pp-blue" strokeWidth={1} />
      }
      className="h-[150px] w-[150px]"
    />
  )
}

export { ProfilePicture }
