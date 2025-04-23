'use client'

import * as Accordion from '@radix-ui/react-accordion'
import { TriangleDownIcon } from '@radix-ui/react-icons'
import { Flex, Text } from '@radix-ui/themes'
import { X } from 'lucide-react'
import { DRUG_INTERACTION_ACCORDIAN } from '../../patient-medications-option'
import { DrugInteractionFound } from './drug-interaction-found'
import { OverrideInteractionCheckbox } from './override-interaction'
import { ReasonAccordianSelect } from './reason-accordian-select'

const DrugInteractionAccordian = () => {
  return (
    <Accordion.Root
      type="single"
      collapsible
      className="border-pp-table-border  rounded-2 border"
    >
      <Accordion.Item value="interactions">
        <Accordion.Header className=" flex cursor-pointer items-center justify-between rounded-2 p-1.5 px-1">
          <Accordion.Trigger className="flex items-center gap-1">
            <TriangleDownIcon width={20} height={20} />
            <Text size="2" weight="bold" className="text-red-10">
              Drug Interactions Found ({DRUG_INTERACTION_ACCORDIAN.length})
            </Text>
          </Accordion.Trigger>
          <DrugInteractionFound />
        </Accordion.Header>
        <Accordion.Content className="my-2 p-1">
          {DRUG_INTERACTION_ACCORDIAN.map((el) => (
            <Flex
              direction="column"
              gap="2"
              key={el.id}
              className="mb-2 rounded-2 border-[1px] border-[#f8a971] bg-[#FEEBE7] p-2 px-3"
            >
              <Flex align="start" justify="between">
                <Text size="2" weight="medium">
                  Concomitant use of drug
                  <Text className="mx-0.5 font-bold">{el.drug}</Text> and Drug B
                  may increase the risk of specific adverse effects or reduced
                  effectiveness.
                </Text>
                <X className="cursor-pointer" />
              </Flex>
              <Flex align="center" gap="2" className="pr-3">
                <OverrideInteractionCheckbox />
                <ReasonAccordianSelect />
              </Flex>
            </Flex>
          ))}
        </Accordion.Content>
      </Accordion.Item>
    </Accordion.Root>
  )
}

export { DrugInteractionAccordian }
