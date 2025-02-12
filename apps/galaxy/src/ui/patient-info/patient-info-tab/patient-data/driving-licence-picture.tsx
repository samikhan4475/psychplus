'use client'

import { useState } from 'react'
import { Avatar, Box } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { ImageControls } from '@/components'
import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
} from '@/components/form'
import { PictureFallback } from '@/components/icons'
import { PatientInfoSchemaType } from '../patient-info-schema'

interface DrivingLicensePictureProps {
  setDriverLicenseImage: (file: File | undefined) => void
  savedDriverLicenseUrl: string
}
const DrivingLicensePicture = ({
  setDriverLicenseImage,
  savedDriverLicenseUrl,
}: DrivingLicensePictureProps) => {
  const form = useFormContext<PatientInfoSchemaType>()
  const [drivingLicenseImageUrl, setDrivingLicenseImageUrl] = useState<string>(
    savedDriverLicenseUrl ?? '',
  )

  const handleinsuranceImageUpload = (file: File | undefined) => {
    setDriverLicenseImage(file)
    const url = file ? URL.createObjectURL(file) : ''
    setDrivingLicenseImageUrl(url)
    form.setValue('driversLicense.hasFrontImage', !!file)
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
        disableControls={form.formState?.disabled}
      />
      <FormFieldError name="drivingLicensePicture" />
    </FormFieldContainer>
  )
}

export { DrivingLicensePicture }
