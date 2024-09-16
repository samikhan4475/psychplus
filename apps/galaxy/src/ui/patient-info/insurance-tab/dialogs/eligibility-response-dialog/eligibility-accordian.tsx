'use client'

import * as Accordion from '@radix-ui/react-accordion'
import { ChevronDownIcon } from '@radix-ui/react-icons'
import { Text } from '@radix-ui/themes'
import { CoInsuranceAccordianTable } from './coinsurance-accordian-table'
import { EligibilityResponseHeader } from './eligibility-response-header'
import { PatientInfoAccordian } from './patient-info-accordian'

const EligibilityAccordian = () => {
  return (
    <>
      <EligibilityResponseHeader />
      <Accordion.Root
        type="multiple"
        defaultValue={['item-1', 'item-2']}
        className="mt-1 flex flex-col gap-1"
      >
        <Accordion.Item value="item-1" className="rounded-2 bg-gray-3">
          <Accordion.Header>
            <Accordion.Trigger className="flex w-full cursor-pointer items-center justify-between px-2 py-1 text-left">
              <Text weight="bold" size="2">
                Patient Information
              </Text>
              <ChevronDownIcon />
            </Accordion.Trigger>
          </Accordion.Header>
          <Accordion.Content className="">
            <PatientInfoAccordian />
          </Accordion.Content>
        </Accordion.Item>
        <Accordion.Item value="item-2" className="rounded-2 bg-gray-3 p-1">
          <Accordion.Header>
            <Accordion.Trigger className="flex w-full items-center justify-between px-1">
              <Text weight="bold" size="2">
                Co-Insurance Details
              </Text>
              <ChevronDownIcon />
            </Accordion.Trigger>
          </Accordion.Header>
          <Accordion.Content>
            <CoInsuranceAccordianTable />
          </Accordion.Content>
        </Accordion.Item>
        <Accordion.Item value="item-3" className="rounded-2 bg-gray-3 p-1">
          <Accordion.Header>
            <Accordion.Trigger className="flex w-full items-center justify-between px-2">
              <Text weight="bold" size="2">
                Deductible
              </Text>
              <ChevronDownIcon />
            </Accordion.Trigger>
          </Accordion.Header>
          <Accordion.Content></Accordion.Content>
        </Accordion.Item>
        <Accordion.Item value="item-4" className="rounded-2 bg-gray-3 p-1">
          <Accordion.Header>
            <Accordion.Trigger className="flex w-full items-center justify-between px-2">
              <Text weight="bold" size="2">
                Out of Pocket
              </Text>
              <ChevronDownIcon />
            </Accordion.Trigger>
          </Accordion.Header>
          <Accordion.Content></Accordion.Content>
        </Accordion.Item>
        <Accordion.Item value="item-5" className="rounded-2 bg-gray-3 p-1">
          <Accordion.Header>
            <Accordion.Trigger className="flex w-full items-center justify-between px-2">
              <Text weight="bold" size="2">
                Limitations
              </Text>
              <ChevronDownIcon />
            </Accordion.Trigger>
          </Accordion.Header>
          <Accordion.Content></Accordion.Content>
        </Accordion.Item>
        <Accordion.Item value="item-6" className="rounded-2 bg-gray-3 p-1">
          <Accordion.Header>
            <Accordion.Trigger className="flex w-full items-center justify-between px-2">
              <Text weight="bold" size="2">
                Benefits of Description
              </Text>
              <ChevronDownIcon />
            </Accordion.Trigger>
          </Accordion.Header>
          <Accordion.Content></Accordion.Content>
        </Accordion.Item>
        <Accordion.Item value="item-7" className="rounded-2 bg-gray-3 p-1">
          <Accordion.Header>
            <Accordion.Trigger className="flex w-full items-center justify-between px-2">
              <Text weight="bold" size="2">
                Copay
              </Text>
              <ChevronDownIcon />
            </Accordion.Trigger>
          </Accordion.Header>
          <Accordion.Content></Accordion.Content>
        </Accordion.Item>
        <Accordion.Item value="item-8" className="rounded-2 bg-gray-3 p-1">
          <Accordion.Header>
            <Accordion.Trigger className="flex w-full items-center justify-between px-2">
              <Text weight="bold" size="2">
                Coordination of Benefits
              </Text>
              <ChevronDownIcon />
            </Accordion.Trigger>
          </Accordion.Header>
          <Accordion.Content></Accordion.Content>
        </Accordion.Item>
      </Accordion.Root>
    </>
  )
}

export { EligibilityAccordian }
