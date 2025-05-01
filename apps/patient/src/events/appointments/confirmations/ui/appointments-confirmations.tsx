'use client'

import React, { useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormContainer } from '@psychplus-v2/components'
import { AppointmentStatus } from '@psychplus-v2/constants'
import { getAppointmentTypeLabel } from '@psychplus-v2/utils'
import { Box, Button, Checkbox, Flex, Text } from '@radix-ui/themes'
import { useForm } from 'react-hook-form'
import z from 'zod'
import {
  BookingConfirmationIcon,
  ConsentView,
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
} from '@/components-v2'
import { confirmOrCancelAppointment } from '../api'
import { AppointmentsView } from '../constants'
import { useStore } from '../store'
import { AppointmentHeader } from './appointment-header'
import { AppointmentLocationDetails } from './appointment-location-details'
import { AppointmentProviderDetails } from './appointment-provider-details'

const schema = z.object({
  userAgreed: z.coerce.boolean().refine((value) => value === true, {
    message: 'You must agree to the policies and conditions',
  }),
})

export type SchemaType = z.infer<typeof schema>

const AppointmentsConfirmations = () => {
  const { setAppointmentView, appointment } = useStore()
  const [showConsentView, setShowConsentView] = useState(false)
  const [loading, setLoading] = useState(false)

  const form = useForm<SchemaType>({
    resolver: zodResolver(schema),
    reValidateMode: 'onChange',
    defaultValues: {
      userAgreed: true,
    },
  })

  const router = useRouter()
  const { id } = useParams<{ id?: string }>()

  if (!appointment || !id) return

  const onSubmit = async (status: AppointmentStatus) => {
    setLoading(true)
    if (appointment.isPatientNeedsToAcceptPolicies) {
      const isValid = await form.trigger('userAgreed')
      if (!isValid) return setLoading(false)
    }

    const response = await confirmOrCancelAppointment({
      appointmentId: id,
      status,
      consentToSignPolicies: appointment.isPatientNeedsToAcceptPolicies,
    })

    if (response.state === 'success') {
      setAppointmentView(
        status === AppointmentStatus.CancelledP
          ? AppointmentsView.Cancelled
          : AppointmentsView.Confirmed,
      )
    }
    setLoading(false)
  }

  return (
    <>
      <ConsentView
        open={showConsentView}
        setOpen={(open) => setShowConsentView(open)}
      />
      <AppointmentHeader
        icon={<BookingConfirmationIcon />}
        title="Visit Confirmation"
        subtitle={
          <>
            You have an upcoming{' '}
            {getAppointmentTypeLabel(appointment.type).toLocaleLowerCase()}{' '}
            visit. Please <br />
            Confirm or Cancel.
          </>
        }
      />

      <AppointmentProviderDetails />

      <Flex
        mt="4"
        py="4"
        gap="5"
        direction="column"
        className="border-y border-[#E3E5F2]"
      >
        <AppointmentLocationDetails />
      </Flex>

      {appointment.isPatientNeedsToAddCreditCard && (
        <Flex py="4" className="border-b border-[#E3E5F2]">
          <Text className="text-[14px] font-[400]">
            Your credit card is required, please{' '}
            <Button
              className="bg-transparent px-2 pt-[5px]"
              variant="ghost"
              onClick={() => router.replace('/billing/credit-debit-cards')}
            >
              Log in
            </Button>{' '}
            and enter your card details
          </Text>
        </Flex>
      )}

      <FormContainer form={form} onSubmit={() => {}}>
        {appointment.isPatientNeedsToAcceptPolicies && (
          <Flex gap="2" direction="column" mt="4">
            <FormFieldContainer>
              <Flex direction="row" gap="2" align="center">
                <Checkbox
                  size="3"
                  defaultChecked={true}
                  onCheckedChange={(checked: boolean) => {
                    form.setValue('userAgreed', checked)
                    form.trigger('userAgreed')
                  }}
                  {...form.register('userAgreed')}
                  highContrast
                />

                <FormFieldLabel className="text-[14px] font-[400]">
                  I agree to electronically sign all the{' '}
                  <Button
                    className="bg-transparent px-2 pt-[5px]"
                    variant="ghost"
                    onClick={() => setShowConsentView(true)}
                  >
                    Policies
                  </Button>
                </FormFieldLabel>
              </Flex>
              <FormFieldError name="userAgreed" />
            </FormFieldContainer>
          </Flex>
        )}

        <Flex
          className="w-full flex-col-reverse items-center justify-between gap-3 sm:flex-row"
          mt="4"
        >
          <Box className="w-full">
            <Button
              className="text-black w-full"
              radius="full"
              color="gray"
              size="3"
              variant="outline"
              type="submit"
              onClick={() => onSubmit(AppointmentStatus.CancelledP)}
              disabled={loading}
            >
              Cancel
            </Button>
          </Box>
          <Box className="w-full">
            <Button
              className="bg-pp-blue-3 w-full"
              radius="full"
              size="3"
              highContrast
              type="submit"
              onClick={() => onSubmit(AppointmentStatus.ConfirmedP)}
              disabled={loading}
            >
              Confirm
            </Button>
          </Box>
        </Flex>
      </FormContainer>
    </>
  )
}

export { AppointmentsConfirmations }
