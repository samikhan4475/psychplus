import * as Accordion from '@radix-ui/react-accordion'
import { Flex } from '@radix-ui/themes'
import { SpecimenAccordionTrigger } from './accordion-trigger'
import { AdditivesAndCollectionRow } from './additives-and-collection-row'
import { DateTimeAndVolume } from './date-time-and-volume'
import { SiteAndRole } from './site-and-role'
import { TestAndTypeRow } from './test-and-type-row'
import { TextInputsRow } from './text-inputs-row'

const SpecimenAccordian = ({ index }: { index: number }) => {
  return (
    <Accordion.Root
      className="border-pp-focus-bg mb-2 rounded-1 border-[1px]"
      type="single"
      defaultValue="item-1"
      collapsible
    >
      <Accordion.Item className="shadow-sm bg-pp-bg-accent" value="item-1">
        <Accordion.AccordionTrigger className="w-[100%]">
          <SpecimenAccordionTrigger index={index} />
        </Accordion.AccordionTrigger>

        <Accordion.AccordionContent className="bg-[#ffffff]">
          <Flex direction="column" gap="2" px="3" py="2" maxWidth={'770px'}>
            <TestAndTypeRow index={index} />
            <AdditivesAndCollectionRow index={index} />
            <SiteAndRole index={index} />
            <DateTimeAndVolume index={index} />
            <TextInputsRow index={index} />
          </Flex>
        </Accordion.AccordionContent>
      </Accordion.Item>
    </Accordion.Root>
  )
}

export { SpecimenAccordian }
