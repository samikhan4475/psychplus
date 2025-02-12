'use client'

import { useRouter } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import { Flex } from '@radix-ui/themes'
import { useForm, type SubmitHandler } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useStore as zustandUseStore } from 'zustand'
import { updatePatientProfileAction } from '@/actions'
import { ActionResult } from '@/api/api'
import { FormContainer } from '@/components'
import { useStore as useRootStore } from '@/store'
import type { PatientProfile } from '@/types'
import { sanitizeFormData, updateTabLabel } from '@/utils'
import { useStore } from '../store'
import {
  updatePatientDrivingLicenseImageAction,
  updatePatientProfileImageAction,
} from './actions'
import {
  patientInfoSchema,
  type PatientInfoSchemaType,
} from './patient-info-schema'
import { transformOut } from './transform'
import { cleanPayload, getInitialValues, isEmptyDriverLicense } from './utils'

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
  const router = useRouter()
  const store = useStore()
  const disabled = zustandUseStore(store, (state) => state.isUserLocked)
  const { tabs, updateTab } = useRootStore((state) => ({
    tabs: state.tabs,
    updateTab: state.updateTab,
  }))

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
    if (
      !isEmptyDriverLicense(payload.driversLicense) &&
      !payload?.driversLicense?.number
    ) {
      form.setError('driversLicense.number', {
        type: 'required',
        message: 'required',
      })
      return
    }

    const result = await updatePatientProfileAction(
      patient?.id,
      cleanPayload(payload),
    )

    if (result.state === 'error') {
      toast.error(result.error ?? 'Failed to update patient profile')
    } else if (result.state === 'success') {
      const {
        id,
        legalName: { firstName, lastName },
      } = result.data
      const tab = updateTabLabel(tabs, id, `${firstName} ${lastName}`)
      updateTab(tab)

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
      router.refresh()
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
