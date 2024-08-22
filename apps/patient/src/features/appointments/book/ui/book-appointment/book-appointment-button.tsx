'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormContainer } from '@psychplus-v2/components'
import { PaymentType } from '@psychplus-v2/constants'
import { Consent, DocumentType } from '@psychplus-v2/types'
import { getProviderTypeLabel } from '@psychplus-v2/utils'
import { Button, Checkbox, Flex, Text } from '@radix-ui/themes'
import { useForm } from 'react-hook-form'
import z from 'zod'
import { clickTrack } from '@psychplus/utils/tracking'
import { addPolicyConsent } from '@/actions'
import {
  ConsentView,
  FormError,
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
  FormSubmitButton,
} from '@/components-v2'
import { bookAppointmentAction } from '@/features/appointments/book/actions'
import { BookSlotButtonProps } from '@/features/appointments/book/types'
import { isProviderMemberOfCareTeam } from '@/features/appointments/book/utils'
import { checkCareTeamExists } from '@/features/appointments/search/utils'
import { rescheduleAppointment } from '@/features/appointments/upcoming/actions'
import { NewProviderSelectedDialog } from '../new-provider-selected-dialog'
import { PrimaryProviderAppointedDialog } from '../primary-provider-appointed-dialog'

const schema = z.object({
  userAgreed: z.coerce.boolean().refine((value) => value === true, {
    message: 'You must agree to the above policies',
  }),
})

type SchemaType = z.infer<typeof schema>

const BookAppointmentButton = ({
  appointmentId,
  bookedSlot,
  careTeam,
  userConsents,
  setBookingSuccessful,
  paymentMethod,
}: BookSlotButtonProps) => {
  const { specialist, clinic, slot, appointmentType, providerType } = bookedSlot

  const [error, setError] = useState<string | undefined>()
  const [loading, setLoading] = useState(false)

  const router = useRouter()

  const [openNewProviderSelected, setOpenNewProviderSelected] = useState(false)
  const [openPrimaryProviderAppointed, setOpenPrimaryProviderAppointed] =
    useState(false)

  const [showConsentView, setShowConsentView] = useState({
    visible: false,
    type: DocumentType.PRIVACY_PRACTICE,
  })

  const form = useForm<SchemaType>({
    resolver: zodResolver(schema),
    reValidateMode: 'onChange',
    defaultValues: {
      userAgreed: false,
    },
  })

  const checkIfPolicyBSigned = (fetchedUserConsents: Consent[]) =>
    !!fetchedUserConsents.find((consent) => consent.type === 'PolicyB')

  const [policyAlreadySigned, setPolicyAlreadySigned] = useState(
    checkIfPolicyBSigned(userConsents),
  )

  useEffect(() => {
    setPolicyAlreadySigned(checkIfPolicyBSigned(userConsents))
    form.setValue('userAgreed', policyAlreadySigned)
  }, [userConsents, policyAlreadySigned])

  useEffect(() => {
    const checkIfPolicyBSigned = (fetchedUserConsents: Consent[]) =>
      !!fetchedUserConsents.find((consent) => consent.type === 'PolicyB')

    setPolicyAlreadySigned(checkIfPolicyBSigned(userConsents))
    form.setValue('userAgreed', policyAlreadySigned)
  }, [userConsents])

  const careTeamExists = checkCareTeamExists(
    careTeam,
    getProviderTypeLabel(providerType),
  )
  const providerMemberOfCareTeam = isProviderMemberOfCareTeam(
    careTeam,
    specialist,
  )

  const handleSelectedProviderDialog = () => {
    if (!careTeamExists) {
      setOpenPrimaryProviderAppointed(true)
    } else {
      providerMemberOfCareTeam
        ? setBookingSuccessful(true)
        : setOpenNewProviderSelected(true)
    }
  }

  const bookSlot = async () => {
    setError(undefined)
    setLoading(true)
    const formValues = form.getValues()

    if (!formValues.userAgreed) {
      setError('You must agree to the above policies.')
      setLoading(false)
      return
    }

    if (appointmentId) {
      const result = await rescheduleAppointment({
        appointmentId: Number(appointmentId),
        specialistStaffId: specialist.id,
        specialistTypeCode: providerType,
        type: appointmentType,
        startDate: slot.startDate,
        duration: slot.duration,
        serviceId: slot.servicesOffered?.[0],
        locationId: clinic.id,
        isSelfPay: paymentMethod === PaymentType.SelfPay,
      })

      if (result.state === 'error') {
        setError(result.error)
        setLoading(false)
        return
      }
    } else {
      const result = await bookAppointmentAction({
        locationId: clinic.id,
        specialistStaffId: specialist.id,
        specialistTypeCode: providerType,
        type: appointmentType,
        startDate: slot.startDate,
        duration: slot.duration,
        serviceId: slot.servicesOffered?.[0],
        isSelfPay: paymentMethod === PaymentType.SelfPay,
      })

      if (result.state === 'error') {
        setError(result.error)
        setLoading(false)
        return
      }
    }

    if (!policyAlreadySigned) {
      const result = await addPolicyConsent({ type: 'PolicyB' })

      if (result.state === 'error') {
        setError(result.error)
        setLoading(false)
        return
      }
      setPolicyAlreadySigned(true)
    }

    const providerTypeLabel = getProviderTypeLabel(providerType)
    clickTrack({
      productArea: 'Patient',
      productPageKey: 'Portal appointmentBooked',
      clickAction: 'Accepted',
      clickActionData: `${providerTypeLabel}|${appointmentType}`,
    })

    handleSelectedProviderDialog()

    setLoading(false)
    router.refresh()
  }

  const handleConsentView = (type: DocumentType) => {
    setShowConsentView({ visible: true, type })
  }

  return (
    <>
      <ConsentView
        open={showConsentView.visible}
        setOpen={(open) =>
          setShowConsentView({ ...showConsentView, visible: open })
        }
        documentType={showConsentView.type}
      />

      <FormContainer form={form} onSubmit={bookSlot}>
        {!policyAlreadySigned && (
          <FormFieldContainer my="4">
            <Flex direction="row" gap="2" align="center">
              <Checkbox
                id="terms-and-conditions-checkbox"
                size="3"
                onCheckedChange={(checked: boolean) => {
                  form.setValue('userAgreed', checked)
                  if (form.formState.isSubmitted) form.trigger('userAgreed')
                }}
                {...form.register('userAgreed')}
                highContrast
              />
              <FormFieldLabel
                className="text-[14px] font-[400]"
                id="terms-and-conditions-checkbox"
              >
                I agree to electronically sign the{' '}
                <Button
                  type="button"
                  className="bg-transparent px-2 pt-[5px]"
                  variant="ghost"
                  onClick={() =>
                    handleConsentView(DocumentType.PRIVACY_PRACTICE)
                  }
                >
                  Notice of Privacy Practice,
                </Button>{' '}
                <Button
                  type="button"
                  className="bg-transparent px-2 pt-[5px]"
                  variant="ghost"
                  onClick={() =>
                    handleConsentView(DocumentType.PATIENT_SERVICE_AGREEMENT)
                  }
                >
                  Patient Service Agreement,
                </Button>{' '}
                and{' '}
                <Button
                  type="button"
                  className="bg-transparent px-2 pt-[5px]"
                  variant="ghost"
                  onClick={() =>
                    handleConsentView(DocumentType.CONSENT_FOR_TREATMENT)
                  }
                >
                  Consent for Treatment
                </Button>
              </FormFieldLabel>
            </Flex>
            <FormFieldError name="userAgreed" />
          </FormFieldContainer>
        )}

        <FormError message={error} />
        <Flex mt="2" gap="4">
          <Button
            type="button"
            radius="full"
            size="3"
            variant="outline"
            highContrast
            className="px-6"
            onClick={() => router.back()}
          >
            Back
          </Button>
          <FormSubmitButton
            radius="full"
            size="3"
            highContrast
            disabled={loading}
            className={`bg-[#151B4A] ${loading ? 'bg-gray-3' : ''}`}
            onClick={() => {
              console.log(form.formState.errors)
            }}
          >
            <Text weight="medium">Book Appointment</Text>
          </FormSubmitButton>
        </Flex>
      </FormContainer>

      {openNewProviderSelected && (
        <NewProviderSelectedDialog
          open={openNewProviderSelected}
          setOpen={setOpenNewProviderSelected}
          onClose={setBookingSuccessful}
          specialistStaffId={specialist.id}
          providerType={providerType}
        />
      )}

      {openPrimaryProviderAppointed && (
        <PrimaryProviderAppointedDialog
          open={openPrimaryProviderAppointed}
          setOpen={setOpenPrimaryProviderAppointed}
          onSubmit={setBookingSuccessful}
          providerType={providerType}
        />
      )}
    </>
  )
}

export { BookAppointmentButton }
