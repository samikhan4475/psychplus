import * as Accordion from '@radix-ui/react-accordion'
import { TriangleDownIcon } from '@radix-ui/react-icons'
import { Flex, Text } from '@radix-ui/themes'
import { DeleteIcon } from '@/components/icons'
import { AllergySpecificationView } from './allergy-specification-view'

interface AllergyAccordionProps {
  title: string
}

const AllergyAccordion = ({ title }: AllergyAccordionProps) => {
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
              <Text size="1">{title}</Text>
            </Flex>
            <Flex gap="1">
              <DeleteIcon />
            </Flex>
          </Accordion.Trigger>
        </Accordion.Header>
        <Accordion.Content className="p-1">
          <AllergySpecificationView />
        </Accordion.Content>
      </Accordion.Item>
    </Accordion.Root>
  )
}

export { AllergyAccordion }
