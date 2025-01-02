import React from 'react'
import * as Accordion from '@radix-ui/react-accordion'
import { Flex, Text } from '@radix-ui/themes'
import { ChevronDown } from 'lucide-react'
import { Insurance, InsurancePayer } from '@/features/billing/payments/types'
import { InsuranceForm } from '@/features/billing/payments/ui/insurance-card/insurance-form'

const InsuranceFormView = ({
  insurancePayers,
  onAddInsuranceClick,
  insurance,
  setInsurance,
  onCancel
}: {
  insurancePayers: InsurancePayer[]
  onAddInsuranceClick: (value: string) => void
  insurance: Insurance | undefined
  onCancel?: () => void
  setInsurance: (insurance: Insurance | undefined) => void
}) => {
  return (
    <Accordion.Item value={'add-insurance'}>
      <Accordion.Header className="group flex items-center justify-between">
        <Flex
          align="center"
          justify="between"
          p="2"
          className="w-full rounded-b-2 border-x border-b border-[#DDDDE3] bg-[#EEF2F6]"
        >
          <Text size="3" weight="medium">
            Add/Edit Insurance
          </Text>
          <Flex gap="5">
            <Accordion.Trigger
              onClick={() => {
                onAddInsuranceClick('add-insurance')
                setInsurance(undefined)
              }}
            >
              <ChevronDown
                height={20}
                width={20}
                strokeWidth={2}
                className={`group-data-[state=${'open'}]:rotate-180`}
                aria-hidden
              />
            </Accordion.Trigger>
          </Flex>
        </Flex>
      </Accordion.Header>
      <Accordion.Content className="rounded-b-2 border-x border-b border-[#DDDDE3] p-4">
        <InsuranceForm
          insurancePayers={insurancePayers}
          insurance={insurance}
          onAddInsuranceClick={onAddInsuranceClick}
          onFormClose={onCancel}
        />
      </Accordion.Content>
    </Accordion.Item>
  )
}

export default InsuranceFormView
