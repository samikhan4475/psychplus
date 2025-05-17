'use client'

import { useState } from 'react'
import * as Accordion from '@radix-ui/react-accordion'
import { TriangleDownIcon, TriangleUpIcon } from '@radix-ui/react-icons'
import { Flex, Text } from '@radix-ui/themes'
import { X } from 'lucide-react'
import {
  CheckboxInput,
  FormFieldContainer,
  FormFieldLabel,
  SelectInput,
} from '@/components'
import { DRUG_INTERACTION_ACCORDIAN } from '@/ui/medications/patient-medications-widget/patient-medications-option'

const overrideReasonOptions = [
  { value: 'pharmacy', label: 'Pharmacy' },
  { value: 'print', label: 'Print' },
]

const DrugAccordionHeader = ({
  isOpen,
  toggleOpen,
  interactionCount,
}: {
  isOpen: boolean
  toggleOpen: () => void
  interactionCount: number
}) => (
  <Accordion.Header className="flex cursor-pointer items-center justify-between rounded-2 p-1.5 px-1">
    <Accordion.Trigger className="flex items-center gap-1" onClick={toggleOpen}>
      {isOpen ? (
        <TriangleDownIcon width={20} height={20} />
      ) : (
        <TriangleUpIcon width={20} height={20} />
      )}
      <Text size="2" weight="bold" className="text-red-10">
        Drug Interactions Found ({interactionCount})
      </Text>
    </Accordion.Trigger>
    <Flex gap="3" align="center">
      <Text as="label" size="1" className="text-pp-black-3 font-medium">
        <Flex gap="1" align="center">
          <CheckboxInput field="isRequiresMedicalVisit" size="1" highContrast />
          Override All
        </Flex>
      </Text>
      <FormFieldContainer className="flex-1 flex-row items-center gap-2">
        <FormFieldLabel className="!text-1 font-bold">Reason</FormFieldLabel>
        <SelectInput
          options={overrideReasonOptions}
          field=""
          buttonClassName="w-[120px] h-7"
        />
      </FormFieldContainer>
    </Flex>
  </Accordion.Header>
)

const DrugInteractionItem = ({ drug, id }: { drug: string; id: string }) => (
  <Flex
    direction="column"
    gap="2"
    key={id}
    className="mb-2 rounded-2 border-[1px] border-[#f8a971] bg-[#FEEBE7] p-2 px-3"
  >
    <Flex align="start" justify="between">
      <Text size="2" weight="medium">
        Concomitant use of drug <Text className="mx-0.5 font-bold">{drug}</Text>{' '}
        and Drug B may increase the risk of specific adverse effects or reduced
        effectiveness.
      </Text>
      <X className="cursor-pointer" />
    </Flex>
    <Flex align="center" gap="2" className="pr-3">
      <Text as="label" size="1" className="text-pp-black-3 font-bold">
        <Flex gap="1" align="center">
          <CheckboxInput field="isRequiresMedicalVisit" size="1" />
          Override Interaction
        </Flex>
      </Text>
      <FormFieldContainer className="flex-1 flex-row items-center gap-2">
        <FormFieldLabel className="!text-1 font-bold">Reason</FormFieldLabel>
        <SelectInput
          options={overrideReasonOptions}
          field=""
          buttonClassName="w-full h-7"
          className="w-full"
        />
      </FormFieldContainer>
    </Flex>
  </Flex>
)

const DrugInteractionAccordian = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Accordion.Root
      type="single"
      collapsible
      className="border-pp-table-border rounded-2 border"
    >
      <Accordion.Item value="interactions">
        <DrugAccordionHeader
          isOpen={isOpen}
          toggleOpen={() => setIsOpen(!isOpen)}
          interactionCount={DRUG_INTERACTION_ACCORDIAN.length}
        />
        <Accordion.Content className="my-2 p-1">
          {DRUG_INTERACTION_ACCORDIAN.map(({ id, drug }) => (
            <DrugInteractionItem key={id} id={id.toString()} drug={drug} />
          ))}
        </Accordion.Content>
      </Accordion.Item>
    </Accordion.Root>
  )
}

export { DrugInteractionAccordian }
