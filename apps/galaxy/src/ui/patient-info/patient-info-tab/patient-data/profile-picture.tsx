'use client'

import { useState } from 'react'
import { Avatar, Box } from '@radix-ui/themes'
import { ImageControls } from '@/components'
import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
} from '@/components/form'
import { PictureFallback } from '@/components/icons'

const ProfilePicture = () => {
  const [profileImageUrl, setProfileImageUrl] = useState<string>(
    'https://picsum.photos/500/500',
  )

  const [profileImage, setProfileImage] = useState<File | undefined>(undefined)
  console.log(profileImage)

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
      />
      <FormFieldError name="profilePicture" />
    </FormFieldContainer>
  )
}

export { ProfilePicture }
