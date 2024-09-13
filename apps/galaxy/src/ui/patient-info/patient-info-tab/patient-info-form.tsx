'use client'

import { useEffect } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { Flex } from '@radix-ui/themes'
import { useForm, type SubmitHandler } from 'react-hook-form'
import toast from 'react-hot-toast'
import { FormContainer } from '@/components'
import { getCalendarDate } from '@/utils'
import { savePatientProfileAction } from './actions'
import {
  patientInfoSchema,
  type PatientInfoSchema,
} from './patient-info-schema'
import { useStore } from './store'
import { transformOut } from './transform'
import type { PatientProfile } from './types'

interface PatientInfoFormProps {
  patient: PatientProfile
}

const PatientInfoForm = ({
  patient,
  children,
}: React.PropsWithChildren<PatientInfoFormProps>) => {
  const disabled = useStore((state) => state.isUserLocked)

  const form = useForm<PatientInfoSchema>({
    disabled: disabled,
    resolver: zodResolver(patientInfoSchema),
    reValidateMode: 'onChange',
    defaultValues: {
      id: patient.id,
      firstName: patient.firstName ?? '',
      middleName: patient.middleName ?? '',
      lastName: patient.lastName ?? '',
      dob: getCalendarDate(patient.dob),
      phone: patient.phone ?? '',
      email: patient.email ?? '',
      hasGuardian: patient.hasGuardian ? 'yes' : 'no',
      guardianFirstName: patient.guardianFirstName ?? '',
      guardianLastName: patient.guardianLastName ?? '',
      race: '',
      ethnicity: '',
    },
  })

  const resetField = form.resetField

  const hasGuardian = form.watch('hasGuardian')

  useEffect(() => {
    if (hasGuardian === 'no') {
      resetField('guardianFirstName')
      resetField('guardianLastName')
    }
  }, [resetField, hasGuardian])

  const onSubmit: SubmitHandler<PatientInfoSchema> = async (data) => {
    const result = await savePatientProfileAction(
      patient.id,
      transformOut(patient.id),
    )

    if (result.state === 'error') {
      toast.error(result.error)
      return
    }

    toast.success('Patient profile saved!')
  }

  return (
    <FormContainer form={form} onSubmit={onSubmit}>
      <Flex direction="column" gap="2" className="flex-1 overflow-auto">
        {children}
      </Flex>
    </FormContainer>
  )
}

export { PatientInfoForm }
