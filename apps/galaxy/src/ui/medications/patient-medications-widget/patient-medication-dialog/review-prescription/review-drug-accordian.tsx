'use client'

import * as Accordion from '@radix-ui/react-accordion'
import { ScrollArea, Text } from '@radix-ui/themes'
import { ChevronDown } from 'lucide-react'
import { Prescription } from '../../types'
import { ReviewDrugDetail } from './review-drug-detail'
import { ReviewDrugWarning } from './review-drug-warning'

interface ReviewDrugAccordianProps {
  prescriptions?: Prescription[]
}

const ReviewDrugAccordian = ({ prescriptions }: ReviewDrugAccordianProps) => {
  return (
    <ScrollArea scrollbars="both" className="max-h-[400px]">
      {prescriptions?.map((drug, index) => (
        <Accordion.Root
          key={String(drug?.id)}
          type="single"
          className="border-pp-focus-bg my-1 overflow-hidden rounded-3 border"
          collapsible
          defaultValue="0"
        >
          <Accordion.Item value={String(index)}>
            <Accordion.Header className="px-2 py-0.5">
              <Accordion.Trigger className="flex w-full items-center justify-between gap-1">
                <Text size="2" weight="medium" align="left">
                  {drug?.prescriptionDrugs[0]?.drugDescription ??
                    'No Description Found'}
                </Text>
                <ChevronDown color="gray" />
              </Accordion.Trigger>
            </Accordion.Header>
            <Accordion.Content className="px-3 py-2">
              <ReviewDrugWarning drug={drug} />
              <ReviewDrugDetail drug={drug} />
            </Accordion.Content>
          </Accordion.Item>
        </Accordion.Root>
      ))}
    </ScrollArea>
  )
}

export { ReviewDrugAccordian }
