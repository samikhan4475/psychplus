import * as Accordion from '@radix-ui/react-accordion'
import { ChevronDownIcon } from '@radix-ui/react-icons'
import { Flex, Grid, Text } from '@radix-ui/themes'
import { Question, TestLabsType } from '../types'
import { TestQuestionInput } from './test-question-input'

const TestQuestionItem = ({ test }: { test: TestLabsType }) => {
  return (
    <Accordion.Root type="single" defaultValue="item-1" collapsible>
      <Accordion.Item
        value="item-1"
        className="border-pp-focus-bg rounded-2 border border-solid"
      >
        <Accordion.AccordionTrigger className="bg-pp-bg-accent h-7 w-full">
          <Flex direction="row" align="center" justify="between" px="2">
            <Text className="text-1 font-[600]">{test?.testName ?? ''}</Text>
            <ChevronDownIcon />
          </Flex>
        </Accordion.AccordionTrigger>
        <Accordion.AccordionContent>
          <Grid columns="3" gap="2" width="auto" p="2">
            {test?.askAtOrderEntries &&
              test?.askAtOrderEntries.length > 0 &&
              test?.askAtOrderEntries.map((item: Question) => (
                <TestQuestionInput
                  key={item.id}
                  question={item}
                  id={test?.labTestCode ?? ''}
                  testAnswer={
                    test?.labTestAnswers && test?.labTestAnswers.length > 0
                      ? test?.labTestAnswers.find(
                          (e) => e.questionCode === item.questionCode,
                        )
                      : null
                  }
                />
              ))}
          </Grid>
        </Accordion.AccordionContent>
      </Accordion.Item>
    </Accordion.Root>
  )
}

export { TestQuestionItem }
