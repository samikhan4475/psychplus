'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import { Avatar, Box } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
} from '@/components/form'
import { PictureFallback } from '@/components/icons'
import { PatientInfoSchemaType } from '../patient-info-schema'

const ImageControls = dynamic(
  () =>
    import('@/components/image-control.tsx').then((mod) => mod.ImageControls),
  {
    ssr: false,
  },
)

interface ProfilePictureProps {
  setProfileImage: (file: File | undefined) => void
  savedProfileImageUrl: string
}

const ProfilePicture = ({
  setProfileImage,
  savedProfileImageUrl,
}: ProfilePictureProps) => {
  const form = useFormContext<PatientInfoSchemaType>()
  const [profileImageUrl, setProfileImageUrl] = useState<string>(
    savedProfileImageUrl ?? '',
  )
  const handleProfileImageUpload = (file: File | undefined) => {
    setProfileImage(file)
    const url = file ? URL.createObjectURL(file) : ''
    setProfileImageUrl(url)
  }

  return (
    <FormFieldContainer className="gap-1">
      <FormFieldLabel className="!text-1">Profile Picture</FormFieldLabel>
      <Avatar
        size="9"
        color="gray"
        src={profileImageUrl}
        fallback={
          <Box>
            <PictureFallback width={150} height={150} />
          </Box>
        }
        className="outline-pp-img-border h-[150px] w-[150px] outline-dashed outline-1 -outline-offset-1"
      />
      <ImageControls
        onFileChange={handleProfileImageUpload}
        previewSrc={profileImageUrl}
        disableControls={form.formState?.disabled}
      />
      <FormFieldError name="profilePicture" />
    </FormFieldContainer>
  )
}

export { ProfilePicture }
