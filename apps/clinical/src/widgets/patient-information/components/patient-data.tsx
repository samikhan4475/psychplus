'use client'

import { useEffect, useMemo, useState } from 'react'
import { Avatar, Box, Flex, Grid, Heading, Text } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { FormSelect, FormTextInput } from '@psychplus/form'
import {
  getPatientDriverLicenseImage,
  getPatientProfileImageByStaff,
} from '@psychplus/patient/api.client'
import { PictureFallback } from '@psychplus/ui/icons'
import { ImageControls } from '@psychplus/ui/image-controls'
import { FORM_FIELD_CLASSES } from '../constants'
import { useEditModeContext } from '../context'
import { useCustomerStatusOptions, useUsStatesOptions } from '../hooks'
import { useStore } from '../store'

interface PatientDataProps {
  setDriverLicenseImage: (file: File | undefined) => void
  setProfileImage: (file: File | undefined) => void
}

const PatientData = ({setProfileImage, setDriverLicenseImage}: PatientDataProps) => {
  const data = useStore((state) => state.patientProfile)
  const statusOptions = useCustomerStatusOptions()
  const { editable } = useEditModeContext()
  const [profileImageUrl, setProfileImageUrl] = useState<string>('')
  const [driverLicenseImageUrl, setDriverLicenseImageUrl] = useState<string>('')
  const { register } = useFormContext()
  const usStates = useUsStatesOptions()
  const driverLicenseStates = useMemo(() => {
    return usStates.map((state) => ({ label: state.label, value: state.label }))
  }, [usStates])

  useEffect(() => {
    if (!data?.id) return
    if (data?.driversLicense?.hasFrontImage) {
      getPatientDriverLicenseImage(data?.id, 'front').then(
        setDriverLicenseImageUrl,
      )
    }
    if (data.hasPhoto) {
      getPatientProfileImageByStaff(data?.id).then(setProfileImageUrl)
    }
  }, [data?.id, data.driversLicense?.hasFrontImage, data.hasPhoto])

  const handleProfileImageUpload =(file: File | undefined) => {
    setProfileImage(file)
    const url = file? URL.createObjectURL(file): ''
    setProfileImageUrl(url)
  }

  const handleDriversLicenseImageUpload = (file: File | undefined) => {
    setDriverLicenseImage(file)
    const url = file? URL.createObjectURL(file): ''
    setDriverLicenseImageUrl(url)
  }

  return (
    <Flex direction="column">
      <Heading size="3" className="pb-1 pl-2 pt-2 text-[14px]">
        Patient Data
      </Heading>
      <Flex className="justify-between bg-[#FFFF] p-2" gap="4">
        <Flex direction="column" className="pr-3">
          <Text className="pb-1 text-[12px] font-medium">Profile Picture</Text>
          <Avatar
            size="9"
            color="gray"
            src={profileImageUrl}
            fallback={
              <Box>
                <PictureFallback width={140} height={150} />
              </Box>
            }
            className="mb-2 border border-dashed border-[#0134DB72] p-2"
          />
          <ImageControls
            onFileChange={handleProfileImageUpload}
            previewSrc={profileImageUrl}
            imageCaptureEvent="patient-profile-picture"
          />
        </Flex>
        <Grid columns="4" rows="2" className="grow gap-3 bg-[#FFFF] px-2 py-8">
          <FormTextInput
            {...register('medicalRecordNumber')}
            disabled={!editable}
            label="MRN"
            className={`${FORM_FIELD_CLASSES} mt-auto`}
          />
          <FormTextInput
            {...register('socialSecurityNumber')}
            disabled={!editable}
            label="SSN"
            className={FORM_FIELD_CLASSES}
          />
          <FormTextInput
            {...register('cmdId')}
            disabled={!editable}
            label="CMD"
            className={FORM_FIELD_CLASSES}
          />
          <Box className="col-span-1">
            <FormSelect
              {...register('status')}
              disabled={!editable}
              label="Status"
              buttonClassName={FORM_FIELD_CLASSES}
              contentClassName="max-h-[250px]"
              placeholder="Select status"
              options={statusOptions}
            />
          </Box>
          <FormTextInput
            {...register('driversLicense.number')}
            disabled={!editable}
            label="Driving License"
            required
            className={FORM_FIELD_CLASSES}
          />
          <Box className="col-span-1">
            <FormSelect
              {...register('driversLicense.validIn')}
              disabled={!editable}
              label="Driving License State"
              buttonClassName={FORM_FIELD_CLASSES}
              contentClassName="max-h-[250px]"
              placeholder="Select state"
              options={driverLicenseStates}
            />
          </Box>
          <Box className="col-span-1">
            <FormSelect
              {...register('contactDetails.homeAddress.state')}
              disabled={!editable}
              placeholder="Select state"
              label="State of Residence"
              required
              buttonClassName={FORM_FIELD_CLASSES}
              contentClassName="max-h-[250px]"
              options={usStates}
            />
          </Box>
        </Grid>
        <Flex direction="column" className="pr-3.5">
          <Text className="pb-1 text-[12px] font-medium">Driving License</Text>
          <Avatar
            size="9"
            color="gray"
            className="mb-2 box-border w-[100%] min-w-[250px] rounded-[12px] border border-dashed border-[#0134DB72] p-2"
            src={driverLicenseImageUrl}
            fallback={
              <Box>
                <PictureFallback width={150} height={150} />
              </Box>
            }
          />
          <ImageControls
            onFileChange={handleDriversLicenseImageUpload}
            previewSrc={driverLicenseImageUrl}
            imageCaptureEvent="patient-driving-license-picture"
          />
        </Flex>
      </Flex>
    </Flex>
  )
}

export default PatientData
