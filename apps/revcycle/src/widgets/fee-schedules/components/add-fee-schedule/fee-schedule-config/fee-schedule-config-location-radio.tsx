import { useEffect, useState } from 'react'
import { Box, Flex, Text } from '@radix-ui/themes'
import { RadioGroup } from '@psychplus/ui/radio-group'
import { getInsuranceByPayers } from '../../../api.client'
import { Insurance } from '../../../types'
import {
  MultiSelectDropdown,
  type MultiSelectOption,
} from '../../multi-select-dropdown'

const getMultiSelectDdOptions = (
  insurances: Insurance[],
): MultiSelectOption[] => {
  const options = []

  for (const insurance of insurances) {
    if (insurance.plans.length > 0) {
      for (const plan of insurance.plans) {
        if (plan.isActive && !plan.isTest) {
          options.push({ value: plan.id, label: plan.name })
        }
      }
    }
  }
  return options
}

const FeeScheduleConfigLocationRadio = () => {
  const [payerOptions, setPayerOptions] = useState<MultiSelectOption[]>([])
  const [primaryPayer, setPrimaryPayer] = useState<string>('PAYER')

  const getPayerOptions = async () => {
    const insurances = await getInsuranceByPayers()
    const options = getMultiSelectDdOptions(insurances)
    setPayerOptions(options)
  }
  useEffect(() => {
    getPayerOptions()
  }, [])

  return (
    <>
      <Box pl="2" pt="1">
        <RadioGroup.Root
          defaultValue="PAYER"
          onValueChange={(val) => setPrimaryPayer(val)}
        >
          <Flex gap="2" direction="column">
            <Text as="label" size="2">
              <Flex gap="2" direction="column">
                <div>
                  <RadioGroup.Item value="PAYER" /> Payer (based on the primary
                  payer)
                </div>
                {primaryPayer === 'PAYER' && (
                  <Box pl="2">
                    <MultiSelectDropdown options={payerOptions} width="400px" />
                  </Box>
                )}
              </Flex>
            </Text>
            <Text as="label" size="2">
              <Flex gap="2" direction="column">
                <div>
                  <RadioGroup.Item value="PAYER_TYPE" /> Payer Type (based on
                  the primary payer)
                </div>
                {primaryPayer === 'PAYER_TYPE' && (
                  <Box pl="2">
                    <MultiSelectDropdown options={payerOptions} width="400px" />
                  </Box>
                )}
              </Flex>
            </Text>
            <Text as="label" size="2">
              <Flex gap="2">
                <div>
                  <RadioGroup.Item value="PATIENT_ACCOUNT_TYPE" disabled />{' '}
                  Patient Account Type
                </div>
                {primaryPayer === 'PATIENT_ACCOUNT_TYPE' && (
                  <MultiSelectDropdown options={payerOptions} />
                )}
              </Flex>
            </Text>
          </Flex>
        </RadioGroup.Root>
      </Box>
    </>
  )
}

export { FeeScheduleConfigLocationRadio }
