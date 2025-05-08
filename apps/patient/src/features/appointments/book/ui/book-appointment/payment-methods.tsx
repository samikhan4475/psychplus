'use client'

import { useEffect, useState } from 'react'
import { AppointmentType, PaymentType } from '@psychplus-v2/constants'
import { Box, Flex, Text } from '@radix-ui/themes'
import {
  PaymentMethodAccordion,
  PaymentMethodToggleButtons,
} from '@/components-v2'
import { PaymentMethodProps } from '@/features/appointments/book/types'
import { isInsuranceDisabledBasedOnDiagnosisCodes } from '../../utils'
import { InsuranceNotCoverDialog } from '../insurance-not-cover-dialog'

const PaymentMethods = ({
  creditCards,
  stripeApiKey,
  paymentMethod,
  setPaymentMethod,
  patientInsurances,
  insurancePayers,
  appointmentType,
  diagnosisCodes,
}: PaymentMethodProps) => {
  const optionalText = `${
    paymentMethod === PaymentType.Insurance ? 'Insurance' : 'Credit/Debit Cards'
  } ${
    appointmentType === AppointmentType.InPerson ? '(Optional)' : '(Required)'
  }`
  const [openInsuranceNotCover, setOpenInsuranceNotCover] = useState(false)
  const [disableInsurance, setDisableInsurance] = useState<boolean>(false)

  useEffect(() => {
    if (isInsuranceDisabledBasedOnDiagnosisCodes(diagnosisCodes)) {
      setPaymentMethod(PaymentType.SelfPay)
      setDisableInsurance(true)
      setOpenInsuranceNotCover(true)
    }
  }, [diagnosisCodes])

  return (
    <Box>
      <Flex mt="5" pb="2" direction="column">
        <Flex direction="column" px="3" py="2" gap="3">
          <Text size="7" weight="bold" className="text-[#151B4A]">
            Do you want to use your insurance <br /> for this visit?
          </Text>
          <PaymentMethodToggleButtons
            value={paymentMethod}
            onChange={setPaymentMethod}
            disableInsurance={disableInsurance}
          />
        </Flex>
        <Text size="5" weight="medium" className="mt-7 text-[#151B4A]">
          {optionalText}
        </Text>
      </Flex>

      <PaymentMethodAccordion
        paymentMethod={paymentMethod}
        stripeApiKey={stripeApiKey}
        creditCards={creditCards}
        patientInsurances={patientInsurances}
        insurancePayers={insurancePayers}
      />

      {disableInsurance && openInsuranceNotCover && (
        <InsuranceNotCoverDialog
          open={openInsuranceNotCover}
          setOpen={setOpenInsuranceNotCover}
        />
      )}
    </Box>
  )
}

export { PaymentMethods }
