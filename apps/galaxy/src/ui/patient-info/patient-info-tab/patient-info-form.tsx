'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Flex } from '@radix-ui/themes'
import { useForm, type SubmitHandler } from 'react-hook-form'
import toast from 'react-hot-toast'
import { updatePatientProfileAction } from '@/actions'
import { ActionResult } from '@/api/api'
import { FormContainer } from '@/components'
import type { PatientProfile } from '@/types'
import { sanitizeFormData } from '@/utils'
import {
  updatePatientDrivingLicenseImageAction,
  updatePatientProfileImageAction,
} from './actions'
import {
  patientInfoSchema,
  type PatientInfoSchemaType,
} from './patient-info-schema'
import { useStore } from './store'
import { transformOut } from './transform'
import { getInitialValues } from './utils'

interface PatientInfoFormProps {
  patient: PatientProfile
  profileImage: File | undefined
  driverLicenseImage: File | undefined
}

const PatientInfoForm = ({
  patient,
  profileImage,
  driverLicenseImage,
  children,
}: React.PropsWithChildren<PatientInfoFormProps>) => {
  const disabled = useStore((state) => state.isUserLocked)

  const form = useForm<PatientInfoSchemaType>({
    disabled: disabled,
    resolver: zodResolver(patientInfoSchema),
    reValidateMode: 'onChange',
    defaultValues: getInitialValues(patient),
  })

  const onSubmit: SubmitHandler<PatientInfoSchemaType> = async (data) => {
    const sanitizedData = sanitizeFormData(data)

    const payload = transformOut(
      sanitizedData,
      profileImage,
      driverLicenseImage,
    )

    const result = await updatePatientProfileAction(patient?.id, payload)

    if (result.state === 'error') {
      toast.error(result.error ?? 'Failed to update patient profile')
    } else if (result.state === 'success') {
      const imageUploadPromises: Promise<ActionResult<void>>[] = []

      if (driverLicenseImage) {
        const licenseImageFormData = new FormData()
        licenseImageFormData.append('file', driverLicenseImage)
        imageUploadPromises.push(
          updatePatientDrivingLicenseImageAction({
            patientId: patient?.id,
            data: licenseImageFormData,
            side: 'front',
          }),
        )
      }

      if (profileImage) {
        const profileImageformData = new FormData()
        profileImageformData.append('file', profileImage)
        imageUploadPromises.push(
          updatePatientProfileImageAction({
            data: profileImageformData,
            patientId: patient?.id,
          }),
        )
      }

      const imagesUploadResponse = await Promise.all(imageUploadPromises)

      const imageUploadError = imagesUploadResponse?.find(
        (r) => r.state === 'error',
      )
      if (imageUploadError) {
        toast.error(
          imageUploadError?.error ??
            'Could not upload images Please try again later.',
        )
        return
      }

      toast.success('Patient profile saved!')
    }
  }

  return (
    <FormContainer form={form} onSubmit={onSubmit}>
      <Flex direction="column" gap="2" className="flex-1">
        {children}
      </Flex>
    </FormContainer>
  )
}

export { PatientInfoForm }
