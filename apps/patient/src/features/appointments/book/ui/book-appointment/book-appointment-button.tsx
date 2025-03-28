'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormContainer } from '@psychplus-v2/components'
import { AppointmentType, PaymentType } from '@psychplus-v2/constants'
import { getNewProviderTypeLabel } from '@psychplus-v2/utils'
import { Button, Flex, Text } from '@radix-ui/themes'
import { useForm } from 'react-hook-form'
import z from 'zod'
import { clickTrack } from '@psychplus/utils/tracking'
import {
  FormError,
  FormSubmitButton,
} from '@/components-v2'
import { bookAppointmentAction, BookAppointmentParams } from '@/features/appointments/book/actions'
import { BookSlotButtonProps } from '@/features/appointments/book/types'
import { isProviderMemberOfCareTeam } from '@/features/appointments/book/utils'
import { useStore } from '@/features/appointments/search/store'
import { checkCareTeamExists } from '@/features/appointments/search/utils'
import { rescheduleAppointment } from '@/features/appointments/upcoming/actions'
import { NewProviderSelectedDialog } from '../new-provider-selected-dialog'
import { PrimaryProviderAppointedDialog } from '../primary-provider-appointed-dialog'
import { useProfileStore } from '@/features/account/profile/store'

const schema = z.object({})

type SchemaType = z.infer<typeof schema>

const BookAppointmentButton = ({
  appointmentId,
  bookedSlot,
  careTeam,
  setBookingSuccessful,
  paymentMethod,
  creditCards,
  patientInsurances,
}: BookSlotButtonProps) => {
  const { specialist, clinic, slot, appointmentType, providerType, newProviderType } = bookedSlot

  const [error, setError] = useState<string>('')
  const [loading, setLoading] = useState(false)

  const router = useRouter()

  const { profile } = useProfileStore((state) => ({
    profile: state.profile,
  }))

  const [openNewProviderSelected, setOpenNewProviderSelected] = useState(false)
  const [openPrimaryProviderAppointed, setOpenPrimaryProviderAppointed] =
    useState(false)

  const form = useForm<SchemaType>({
    resolver: zodResolver(schema),
    reValidateMode: 'onChange',
  })
  

  const stateCode = useStore((state) => state.stateCode)
  useEffect(() => {
    setError('')
  }, [paymentMethod, patientInsurances])

  const careTeamExists = checkCareTeamExists(
    careTeam,
    getNewProviderTypeLabel(newProviderType || ""),
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

  const checkBoxDisabled =
    (appointmentType === AppointmentType.Virtual &&
      paymentMethod === PaymentType.Insurance &&
      patientInsurances?.length === 0) ||
    (appointmentType === AppointmentType.Virtual &&
      paymentMethod === PaymentType.SelfPay &&
      creditCards?.length === 0)

  const bookSlot = async () => {
    if (
      paymentMethod === PaymentType.Insurance &&
      !patientInsurances?.length &&
      appointmentType !== AppointmentType.InPerson
    ) {
      setError('Please add insurance or choose self-pay to book an appointment')
      return
    }

    setLoading(true)
    if (appointmentId) {
      const result = await rescheduleAppointment({
        appointmentId: Number(appointmentId),
        specialistStaffId: specialist.id,
        specialistTypeCode: providerType,
        providerType:getNewProviderTypeLabel(newProviderType || ""),
        type: appointmentType,
        startDate: slot.startDateUtc ?? slot.startDate,
        duration: slot.duration,
        serviceId: slot.servicesOffered?.[0],
        locationId: clinic.id,
        isSelfPay: paymentMethod === PaymentType.SelfPay,
        stateCode: stateCode,
        patientResidingStateCode: profile?.contactDetails?.addresses?.filter(address => address.type === 'Home')?.[0]?.state || '',
        appointmentSource: 'PatientPortal',
      })

      if (result.state === 'error') {
        setError(result.error as string)
        setLoading(false)
        return
      }
    } else {
      const mid = localStorage.getItem('mid')
      const payload:BookAppointmentParams = {
        locationId: clinic.id,
        specialistStaffId: specialist.id,
        specialistTypeCode: providerType,
        providerType:getNewProviderTypeLabel(newProviderType || ""),
        type: appointmentType,
        startDate: slot.startDateUtc ?? slot.startDate,
        duration: slot.duration,
        serviceId: slot.servicesOffered?.[0],
        isSelfPay: paymentMethod === PaymentType.SelfPay,
        stateCode: stateCode,
        patientResidingStateCode: profile?.contactDetails?.addresses?.filter(address => address.type === 'Home')?.[0]?.state || '',
        appointmentSource: 'PatientPortal',
      }

      if (mid) {
        payload.marketingCampaignId = mid
      }

      const result = await bookAppointmentAction(payload)

      if (result.state === 'error') {
        setError(result.error as string)
        setLoading(false)
        return
      }
      if (mid) {
        localStorage.removeItem('mid')
      }
    }

    const providerTypeLabel = getNewProviderTypeLabel(newProviderType || "")
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

  return (
    <>
      <FormContainer form={form} onSubmit={bookSlot}>
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
            disabled={loading || Boolean(error) || checkBoxDisabled}
            className={`bg-[#151B4A] ${loading ? 'bg-gray-3' : ''}`}
            style={
              error || checkBoxDisabled ? { opacity: 0.6, color: '#fff' } : {}
            }
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
          newProviderType={newProviderType}
        />
      )}

      {openPrimaryProviderAppointed && (
        <PrimaryProviderAppointedDialog
          open={openPrimaryProviderAppointed}
          setOpen={setOpenPrimaryProviderAppointed}
          onSubmit={setBookingSuccessful}
          newProviderType={newProviderType}
        />
      )}
    </>
  )
}

export { BookAppointmentButton }
