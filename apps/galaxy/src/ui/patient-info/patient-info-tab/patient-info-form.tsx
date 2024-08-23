'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Flex } from '@radix-ui/themes'
import { useForm, type SubmitHandler } from 'react-hook-form'
import z from 'zod'
import { FormContainer } from '@/components'
import { getCalendarDate } from '@/utils'
import { createUserSchema } from './create-user'
import type { PatientProfile } from './types'

const schema = createUserSchema

type SchemaType = z.infer<typeof schema>

interface PatientInfoFormProps {
  patient: PatientProfile
}

const PatientInfoForm = ({
  patient,
  children,
}: React.PropsWithChildren<PatientInfoFormProps>) => {
  const form = useForm<SchemaType>({
    resolver: zodResolver(schema),
    reValidateMode: 'onChange',
    defaultValues: {
      firstName: patient.firstName ?? '',
      middleName: patient.middleName ?? '',
      lastName: patient.lastName ?? '',
      dob: getCalendarDate(patient.dob),
    },
  })

  const onSubmit: SubmitHandler<SchemaType> = (data) => {
    // do something with data
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
