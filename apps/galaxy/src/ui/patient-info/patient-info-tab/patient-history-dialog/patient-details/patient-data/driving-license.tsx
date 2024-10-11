'use client'

import { Avatar } from '@radix-ui/themes'
import { Image as Fallback } from 'lucide-react'
import { GET_PATIENT_HISOTRY_DRIVING_LICENSE_IMAGE_ENDPOINT } from '@/api/endpoints'
import { useStore } from '../../store'

const DrivingLicense = ({ patientId }: { patientId: string }) => {
  const { selectedRow } = useStore((store) => ({
    selectedRow: store.selectedRow,
  }))
  const licenseImage = selectedRow?.driversLicense?.hasFrontImage
    ? GET_PATIENT_HISOTRY_DRIVING_LICENSE_IMAGE_ENDPOINT(
        patientId,
        selectedRow?.id,
        'front',
      )
    : undefined

  return (
    <Avatar
      size="9"
      color="gray"
      src={licenseImage}
      fallback={
        <Fallback
          width={250}
          height={140}
          className="text-pp-blue"
          strokeWidth={1}
        />
      }
      className="h-[150px] w-[250px]"
    />
  )
}

export { DrivingLicense }
