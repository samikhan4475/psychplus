'use client'

import { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { Flex } from '@radix-ui/themes'
import { useForm, type SubmitHandler } from 'react-hook-form'
import toast from 'react-hot-toast'
import z from 'zod'
import { FormContainer } from '@/components'
import { useHasPermission } from '@/hooks'
import { ExternalProvider } from '../types'
import { addPcpAction } from './actions/add-pcp'
import { attachPcpToPatientAction } from './actions/attach-pcp-to-patient'
import { PcpAlertDialog } from './pcp-alert-dialog'
import { pcpAddressTypeEnum, pcpSchema } from './pcp-schema'
import { transformData } from './utils'

const schema = pcpSchema

type SchemaType = z.infer<typeof schema>

interface CreatePcpFormProps {
  patientId: string
  initialValue?: ExternalProvider
  children: React.ReactNode
}

const CreatePcpForm = ({
  patientId,
  initialValue,
  children,
}: CreatePcpFormProps) => {
  const [isAlertOpen, setIsAlertOpen] = useState(false)
  const [alertMessage, setAlertMessage] = useState('')

  const defaultValues: SchemaType = {
    id: initialValue?.id || '',
    firstName: initialValue?.legalName.firstName || '',
    lastName: initialValue?.legalName.lastName || '',
    credentials: initialValue?.legalName.title || '',
    phone: initialValue?.contactDetails?.phoneNumbers?.[0]?.number || '',
    email: initialValue?.contactDetails?.email || '',
    fax: initialValue?.contactDetails?.phoneNumbers?.[1]?.number || '',
    isMailingAddressSameAsHome: initialValue?.isMailingAddressSameAsHome
      ? 'yes'
      : 'no',
    officeAddress: {
      type: (initialValue?.contactDetails?.addresses?.[0]?.type ||
        'Home') as z.infer<typeof pcpAddressTypeEnum>,
      street1: initialValue?.contactDetails?.addresses?.[0]?.street1 || '',
      street2: initialValue?.contactDetails?.addresses?.[0]?.street2 || '',
      city: initialValue?.contactDetails?.addresses?.[0]?.city || '',
      state: initialValue?.contactDetails?.addresses?.[0]?.state || '',
      country: 'US',
      postalCode:
        initialValue?.contactDetails?.addresses?.[0]?.postalCode || '',
      postalPlus4Code:
        initialValue?.contactDetails?.addresses?.[0]?.postalPlus4Code || '',
    },
    mailingAddress: {
      type: (initialValue?.contactDetails?.addresses?.[1]?.type ||
        'Mailing') as z.infer<typeof pcpAddressTypeEnum>,
      street1: initialValue?.contactDetails?.addresses?.[1]?.street1 || '',
      street2: initialValue?.contactDetails?.addresses?.[1]?.street2 || '',
      city: initialValue?.contactDetails?.addresses?.[1]?.city || '',
      state: initialValue?.contactDetails?.addresses?.[1]?.state || '',
      country: 'US',
      postalCode:
        initialValue?.contactDetails?.addresses?.[1]?.postalCode || '',
      postalPlus4Code:
        initialValue?.contactDetails?.addresses?.[0]?.postalPlus4Code || '',
    },
  }

  const form = useForm<SchemaType>({
    resolver: zodResolver(schema),
    criteriaMode: 'all',
    defaultValues,
  })
  const savePcpPermission = useHasPermission('savePCP')

  const onSubmit: SubmitHandler<SchemaType> = async (data) => {
    if (!savePcpPermission) {
      setIsAlertOpen(true)
      setAlertMessage(
        'You do not have permission to save PCP form. Please contact your supervisor if you need any further assistance.',
      )
      return
    }

    const result = await addPcpAction(transformData(data) as ExternalProvider)

    if (result.state === 'error') {
      toast.error(`Failed to save PCP: ${result.error}`)
      return
    }

    const externalProviderId = result.data?.id
    if (externalProviderId) {
      const responceAttchedPatient = await attachPcpToPatientAction({
        patientId,
        externalProviderId,
        relationship: 'PrimaryCare',
      })

      if (responceAttchedPatient.state === 'error') {
        toast.error(`Failed to attach PCP: ${responceAttchedPatient.error}`)
        return
      }
    }
    toast.success('success')
  }

  return (
    <FormContainer form={form} onSubmit={onSubmit}>
      <Flex direction="column" className="gap-[2px] p-1">
        {children}
      </Flex>
      <PcpAlertDialog
        isOpen={isAlertOpen}
        message={alertMessage}
        onClose={() => {
          setIsAlertOpen(false)
          setAlertMessage('')
        }}
      />
    </FormContainer>
  )
}

export { CreatePcpForm }
