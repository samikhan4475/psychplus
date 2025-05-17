import * as Accordion from '@radix-ui/react-accordion'
import { TriangleDownIcon } from '@radix-ui/react-icons'
import { Flex, Text } from '@radix-ui/themes'
import { useFieldArray } from 'react-hook-form'
import { DeleteIcon } from '@/components/icons'
import { AllergySpecificationView } from './allergy-specification-view'
import { PropsWithIndex } from './types'

interface AllergyAccordionProps extends PropsWithIndex {
  title: string
}

const AllergyAccordion = ({ title, index }: AllergyAccordionProps) => {
  const { remove } = useFieldArray({
    name: 'allergies',
  })
  return (
    <Accordion.Root type="multiple" className="mt-1">
      <Accordion.Item
        value="item-1"
        className="border-pp-table-border rounded-2 border p-1"
      >
        <Accordion.Header>
          <Flex align="center">
            <Accordion.Trigger className="flex w-full cursor-pointer items-center justify-between px-2 py-1 text-left">
              <Flex gap="1">
                <TriangleDownIcon />
                <Text size="1">{title}</Text>
              </Flex>
            </Accordion.Trigger>
            <Flex
              gap="1"
              className="cursor-pointer"
              onClick={() => remove(index)}
            >
              <DeleteIcon />
            </Flex>
          </Flex>
        </Accordion.Header>
        <Accordion.Content className="p-1">
          <AllergySpecificationView index={index} />
        </Accordion.Content>
      </Accordion.Item>
    </Accordion.Root>
  )
}

export { AllergyAccordion }
