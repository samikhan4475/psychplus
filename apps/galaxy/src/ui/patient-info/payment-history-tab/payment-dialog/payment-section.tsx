'use client'

import React, { useEffect, useState } from 'react'
import { Flex } from '@radix-ui/themes'
import { Appointment } from '@/types'
import { StaffComments } from '@/ui/visit/edit-visit/components/staff-comments'
import { getPatientPaymentHistoryAction } from '../actions'
import { PaymentDetails } from './payment-details/payment-details'
import { PaymentDetailForm } from './payment-form'
import { PaymentHistory } from './payment-history'
import { PaymentOptions } from './payment-options'
import { useStore } from './store'
import { twoDecimal } from './utils'

interface PaymentdetailDialogProps {
  stripeApiKey: string
  patientId: string
  googleApiKey: string
  toggleOpen: () => void
  appointment?: Appointment
  onClose?: () => void
}

const PaymentSection = ({
  stripeApiKey,
  patientId,
  googleApiKey,
  toggleOpen,
  appointment,
  onClose,
}: PaymentdetailDialogProps) => {
  const { fetchPatientCreditCards } = useStore((state) => ({
    fetchPatientCreditCards: state.fetchPatientCreditCards,
  }))
  const [remainingBalance, setRemainingBalance] = useState('')
  useEffect(() => {
    if (!patientId) return
    Promise.all([
      getPatientPaymentHistoryAction({ patientIds: [patientId] }),
      fetchPatientCreditCards(patientId),
    ]).then(([transactionsResult]) => {
      if (transactionsResult.state === 'success') {
        const remainingDue =
          transactionsResult?.data?.paymentHistory?.remainingDue ?? 0
        setRemainingBalance(twoDecimal(remainingDue))
      }
    })
  }, [patientId, fetchPatientCreditCards])

  return (
    <Flex direction="column" gap="2" mt="2">
      <PaymentDetailForm
        patientId={patientId}
        closeDialog={toggleOpen}
        onClose={onClose}
        remainingBalance={remainingBalance}
      >
        <PaymentOptions patientId={patientId} />
        <PaymentDetails
          stripeApiKey={stripeApiKey}
          patientId={patientId}
          googleApiKey={googleApiKey}
          appointment={appointment}
        />
      </PaymentDetailForm>
      {!appointment?.appointmentId ? (
        <PaymentHistory patientId={patientId} />
      ) : (
        <StaffComments appointmentId={appointment?.appointmentId} />
      )}
    </Flex>
  )
}

export { PaymentSection }
