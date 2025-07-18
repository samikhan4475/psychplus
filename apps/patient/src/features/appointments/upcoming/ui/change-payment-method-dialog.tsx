'use client'

import {
  CloseDialogIcon,
  EditIcon,
  FormError,
  FormInfo,
  PaymentMethodAccordion,
  PaymentMethodToggleButtons,
} from '@/components-v2'
import { CreditCard } from '@/features/billing/credit-debit-cards/types'
import { Insurance, InsurancePayer } from '@/features/billing/payments/types'
import { NoteSectionItem } from '@/features/note/types'
import { useToast } from '@/providers'
import { PaymentType } from '@psychplus-v2/constants'
import { Appointment } from '@psychplus-v2/types'
import { DialogClose } from '@radix-ui/react-dialog'
import { Box, Button, Dialog, Flex, Text, Tooltip } from '@radix-ui/themes'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import {
  insuranceMayNotCoverMessage,
  isInsuranceDisabledBasedOnDiagnosisCodes,
} from '../../book/utils'
import { changeAppointmentPaymentMethod } from '../actions/change-appointment-payment-method'

const ChangePaymentMethodDialog = ({
  appointment,
  creditCards,
  stripeApiKey,
  patientInsurances,
  insurancePayers,
  diagnosisCodes,
}: {
  appointment: Appointment
  creditCards: CreditCard[]
  stripeApiKey: string
  patientInsurances: Insurance
  insurancePayers: InsurancePayer[]
  diagnosisCodes: NoteSectionItem[]
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState<PaymentType>(
    PaymentType[appointment.paymentResponsibilityTypeCode]
  )
  const [error, setError] = useState<string>()
  const [warning, setWarning] = useState<string>()
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const { toast } = useToast()
  const [disableInsurance, setDisableInsurance] = useState<boolean>(false)

  useEffect(() => {
    setError('')
  }, [paymentMethod, patientInsurances])

  useEffect(() => {
    if (
      isInsuranceDisabledBasedOnDiagnosisCodes(diagnosisCodes) &&
      appointment.isSelfPay
    ) {
      setDisableInsurance(true)
      setWarning(insuranceMayNotCoverMessage(appointment.type))
    }
  }, [diagnosisCodes, appointment])

  const onSave = async () => {
    setLoading(true)

    if (
      paymentMethod === PaymentType.Insurance &&
      !patientInsurances?.policies?.length
    ) {
      setError('Please add insurance or choose self-pay to book an appointment')
      setLoading(false)
      return
    }
    const result = await changeAppointmentPaymentMethod({
      appointmentId: appointment.id,
      paymentMethod: paymentMethod.split(' ').join('')
    })

    if (result.state === 'error') {
      setError(result.error)
    } else {
      setIsOpen(false)
      toast({
        type: 'success',
        title: 'Payment Method Changed',
      })
    }

    router.refresh()
    setLoading(false)
  }

  return (
    <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
      <Tooltip
        content="Change Payment Method"
        delayDuration={300}
        className="max-w-[200px]"
      >
        <Dialog.Trigger>
          <Button variant="ghost" className="bg-[white]">
            <EditIcon />
          </Button>
        </Dialog.Trigger>
      </Tooltip>
      <Dialog.Content className="relative max-w-[1000px]">
        <CloseDialogIcon />
        <FormError message={error} />
        <Dialog.Title
          className="font-sans -tracking-[0.25px]"
          weight="bold"
          size="5"
        >
          Payment Method
        </Dialog.Title>
        <Box mt="5">
          <FormInfo message={warning} />
        </Box>
        <Flex
          className="rounded-t-3 border border-b-0 border-[#D9E2FC] bg-[#FCFDFF]"
          mt="5"
          pb="2"
          direction="column"
        >
          <Flex direction="column" px="3" py="2" gap="3">
            <Text size={{ initial: "3", sm: "4" }} weight="medium">
              Select the payment method you want to use for this visit
            </Text>
            <PaymentMethodToggleButtons
              value={paymentMethod}
              onChange={setPaymentMethod}
              disableInsurance={disableInsurance}
            />
          </Flex>
        </Flex>

        <PaymentMethodAccordion
          paymentMethod={paymentMethod}
          stripeApiKey={stripeApiKey}
          creditCards={creditCards}
          patientInsurances={patientInsurances}
          insurancePayers={insurancePayers}
        />

        <Flex gap="3" justify="end" mt="5">
          <DialogClose>
            <Button
              color="gray"
              size="3"
              className="hover:bg-gray-2 active:bg-gray-3"
              variant="outline"
            >
              <Text weight="medium" className="text-[#151B4A]">
                Cancel
              </Text>
            </Button>
          </DialogClose>
          <Button
            highContrast
            radius="full"
            size="3"
            disabled={loading}
            className={`px-5 ${loading && 'bg-gray-3'}`}
            onClick={onSave}
          >
            <Text weight="medium">Update Info</Text>
          </Button>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  )
}

export { ChangePaymentMethodDialog }
