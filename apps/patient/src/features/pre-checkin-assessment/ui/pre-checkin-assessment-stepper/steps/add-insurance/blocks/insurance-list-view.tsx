import React from 'react'
import * as Accordion from '@radix-ui/react-accordion'
import { Flex, Text } from '@radix-ui/themes'
import { ChevronDown } from 'lucide-react'
import { Insurance } from '@/features/billing/payments/types'
import InsuranceList from './insurance-list'

const InsuranceListView = ({
  patientInsurance,
  onAddInsuranceClick,
  setInsurance,
}: {
  patientInsurance: Insurance[]
  onAddInsuranceClick: (value: string) => void
  setInsurance: (insurance: Insurance | undefined) => void
}) => {
  return (
    <Accordion.Item value={'insurance-list'}>
      <Accordion.Header className="group flex items-center justify-between">
        <Flex
          align="center"
          justify="between"
          p="2"
          className="w-full rounded-t-2 border-x border-t border-[#DDDDE3] bg-[#EEF2F6]"
        >
          <Text size="3" weight="medium">
            Insurance on File
          </Text>
          <Flex gap="5">
            <Accordion.Trigger
              onClick={() => onAddInsuranceClick('insurance-list')}
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
      <Accordion.Content className="border-x border-b border-[#DDDDE3] p-4">
        <InsuranceList
          patientInsurance={patientInsurance}
          onAddInsuranceClick={onAddInsuranceClick}
          setInsurance={setInsurance}
        />
      </Accordion.Content>
    </Accordion.Item>
  )
}

export default InsuranceListView
