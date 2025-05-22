'use client'

import { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormContainer } from '@psychplus-v2/components'
import { DocumentType, PolicyType } from '@psychplus-v2/types'
import { Button, Flex, Text, TextFieldInput } from '@radix-ui/themes'
import { useForm } from 'react-hook-form'
import z from 'zod'
import {
  BookingCancelIcon,
  BookingConfirmedIcon,
  CONSENT_DOCUMENT_MAP,
  ConsentView,
  FormFieldError,
  FormFieldLabel,
  PolicyIcon,
} from '@/components-v2'
import { AppointmentHeader } from '@/events/appointments/confirmations/ui/appointment-header'
import { getPlaceholder } from '@/features/account/profile/utils'
import { signPatientsConsents } from '../actions'

interface PatientsConsentsViewProps {
  policyType: PolicyType
  referenceId: string
}

const schema = z.object({
  signatureName: z
    .string()
    .min(1, 'Required')
    .max(256, 'Max 256 characters are allowed'),
})

type SchemaType = z.infer<typeof schema>

const PatientsConsents = ({
  policyType,
  referenceId,
}: PatientsConsentsViewProps) => {
  const [isFilled, setIsFilled] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string>()
  const [showConsentView, setShowConsentView] = useState(false)
  const [activeTab, setActiveTab] = useState<DocumentType>(
    CONSENT_DOCUMENT_MAP[policyType][0].slug,
  )

  const form = useForm<SchemaType>({
    resolver: zodResolver(schema),
    reValidateMode: 'onChange',
    defaultValues: {
      signatureName: undefined,
    },
  })

  const onSubmit = async (data: SchemaType) => {
    if (!policyType || !referenceId) return

    setLoading(true)
    const response = await signPatientsConsents({
      policyType,
      referenceId,
      signatureName: data.signatureName,
    })
    setLoading(false)
    if (response.state === 'success') return setIsFilled(true)
    if (response.state === 'error') return setError(response.error)
  }

  if (error)
    return <AppointmentHeader icon={<BookingCancelIcon />} title={error} />

  return (
    <>
      {!isFilled ? (
        <>
          <ConsentView
            open={showConsentView}
            setOpen={(open) => {
              setShowConsentView(open)
            }}
            tabsToShow={CONSENT_DOCUMENT_MAP[policyType]}
            activeTab={activeTab}
          />
          <AppointmentHeader
            icon={<PolicyIcon />}
            title="Policy Document"
            subtitle={getConsentMessage(
              policyType,
              () => setShowConsentView(true),
              setActiveTab,
            )}
          />
          <FormContainer form={form} onSubmit={onSubmit}>
            <Flex mt="6" direction="column" gap="3" pb="4" mb="4">
              <FormFieldLabel required>Full Name</FormFieldLabel>

              <TextFieldInput
                size="3"
                {...form.register('signatureName')}
                placeholder={getPlaceholder('fullName')}
              />
              <FormFieldError name="signatureName" />
            </Flex>
            <Button
              className="bg-pp-blue-3 w-full"
              radius="full"
              size="3"
              highContrast
              type="submit"
              disabled={loading}
            >
              Sign
            </Button>
          </FormContainer>
        </>
      ) : (
        <AppointmentHeader
          icon={<BookingConfirmedIcon />}
          title="Your policy has signed"
        />
      )}
    </>
  )
}

export { PatientsConsents }

const getConsentMessage = (
  policyType: PolicyType,
  onPolicyClick: () => void,
  setActiveTab: (documentType: DocumentType) => void,
) => {
  const policies = CONSENT_DOCUMENT_MAP[policyType]

  return (
    <Text className="text-pp-gray-1 text-[13px]">
      I agree to electronically sign the{' '}
      {policies.map((p, i) => (
        <span key={p.name}>
          <Text
            className="text-pp-blue-3 cursor-pointer underline"
            onClick={() => {
              onPolicyClick()
              setActiveTab(p.slug)
            }}
          >
            {p.name}
          </Text>
          {i < policies.length ? ' and ' : ''}
        </span>
      ))}{' '}
      completely understand the document. I also understand and acknowledge that
      my electronic signature is the legal equivalent of my manual signature.
    </Text>
  )
}
