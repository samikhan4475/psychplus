import { useMemo } from 'react'
import * as Accordion from '@radix-ui/react-accordion'
import { ChevronDownIcon } from '@radix-ui/react-icons'
import { Flex, Text } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { LabOrderSchemaType } from '../../lab-order-schema'
import { TestQuestionItem } from './test-question-item-accordion'

const TestQuestionsView = () => {
  const form = useFormContext<LabOrderSchemaType>()
  const testLabs = form.watch('testLabs')

  const availableQuestions = useMemo(
    () =>
      testLabs?.filter(
        (item) => item.askAtOrderEntries && item.askAtOrderEntries?.length > 0,
      ),
    [testLabs],
  )

  return (
    availableQuestions &&
    availableQuestions?.length > 0 && (
      <Accordion.Root type="single" defaultValue="item-1" collapsible>
        <Accordion.Item value="item-1">
          <Accordion.AccordionTrigger className="bg-pp-bg-table-label h-6 w-full rounded-t-2">
            <Flex direction="row" align="center" justify="between" px="2">
              <Text className="text-1 font-[600]">Test Questions</Text>
              <ChevronDownIcon />
            </Flex>
          </Accordion.AccordionTrigger>
          <Accordion.AccordionContent className="rounded-b-2 border border-solid border-[#01012E22]">
            <Flex direction="column" gap="2" px="1" py="2">
              {availableQuestions?.map((item) => (
                <TestQuestionItem test={item} key={item.id} />
              ))}
            </Flex>
          </Accordion.AccordionContent>
        </Accordion.Item>
      </Accordion.Root>
    )
  )
}

export { TestQuestionsView }
