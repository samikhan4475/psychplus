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

const DrivingLicensePicture = () => {
  const [drivingLicenseImageUrl, setDrivingLicenseImageUrl] = useState<string>(
    'https://picsum.photos/500/500',
  )
  const [drivingLicenseImage, setDrivingLicenseImage] = useState<
    File | undefined
  >(undefined)

  console.log(drivingLicenseImage)

  const handleinsuranceImageUpload = (file: File | undefined) => {
    setDrivingLicenseImage(file)
    const url = file ? URL.createObjectURL(file) : ''
    setDrivingLicenseImageUrl(url)
  }

  return (
    <FormFieldContainer className="gap-1">
      <FormFieldLabel className="!text-1">Driving License</FormFieldLabel>
      <Avatar
        size="9"
        color="gray"
        src={drivingLicenseImageUrl}
        fallback={
          <Box>
            <PictureFallback width={140} height={150} />
          </Box>
        }
        className="border-pp-img-border h-[150px] w-[250px] border border-dashed p-1"
      />
      <ImageControls
        onFileChange={handleinsuranceImageUpload}
        previewSrc={drivingLicenseImageUrl}
      />
      <FormFieldError name="drivingLicensePicture" />
    </FormFieldContainer>
  )
}

export { DrivingLicensePicture }
