'use client'

import { Flex, RadioGroup, Text } from '@radix-ui/themes'
import { useStore } from './store'

const PatientBillingRadio = () => {
  const { patientBilling, setPatientBilling } = useStore((state) => ({
    patientBilling: state.patientBilling,
    setPatientBilling: state.setPatientBilling,
  }))
  return (
    <Flex direction="row" gap="2" align="center">
      <Text size="1" weight="medium">
        Patient Billing (default)
      </Text>
      <RadioGroup.Root
        highContrast
        size="1"
        orientation="horizontal"
        value={patientBilling}
        onValueChange={setPatientBilling}
      >
        <Flex gap="4" align="center">
          <RadioGroup.Item value="self-pay">Self Pay</RadioGroup.Item>
          <RadioGroup.Item value="insurance">Insurance</RadioGroup.Item>
        </Flex>
      </RadioGroup.Root>
    </Flex>
  )
}

export { PatientBillingRadio }
