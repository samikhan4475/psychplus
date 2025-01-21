import * as Accordion from '@radix-ui/react-accordion'
import { TriangleDownIcon } from '@radix-ui/react-icons'
import { Flex, Text } from '@radix-ui/themes'
import { StarIcon } from 'lucide-react'
import { DeleteIcon } from '@/components/icons'
import { MedicationSpecificationView } from './medication-specification-view'

const MedicationAccordion = () => {
  return (
    <Accordion.Root type="multiple" className="mt-1">
      <Accordion.Item
        value="item-1"
        className="border-pp-table-border rounded-2 border p-1"
      >
        <Accordion.Header>
          <Accordion.Trigger className="flex w-full cursor-pointer items-center justify-between px-2 py-1 text-left">
            <Flex gap="1">
              <TriangleDownIcon />
              <Text size="1">
                penicillAMINE 250 mg oral one tablet every 6 hours{' '}
              </Text>
            </Flex>
            <Flex gap="1">
              <DeleteIcon />
              <StarIcon
                stroke="#A0B6DC"
                fill="#A0B6DC"
                height="15"
                cursor="pointer"
                width="15"
              />
            </Flex>
          </Accordion.Trigger>
        </Accordion.Header>
        <Accordion.Content className="p-1">
          <MedicationSpecificationView />
        </Accordion.Content>
      </Accordion.Item>
    </Accordion.Root>
  )
}

export { MedicationAccordion }
