import React from 'react'
import * as Accordion from '@radix-ui/react-accordion'
import { Flex, Text } from '@radix-ui/themes'
import { ChevronDown } from 'lucide-react'
import AccordionContent from './accordion-content'

const accordions = [
  {
    title: 'GAD-7',
    questions: [
      'Feeling nervous, anxious or on edge',
      'Not being able to stop or control worrying',
      'Worrying too much about different things',
      'Trouble relaxing',
      'Being so restless that it is hard to sit still',
      'Becoming easily annoyed or irritable',
      'Feeling afraid as if something awful might happen',
    ],
    options: [
      'Not at all',
      'Some days',
      'More than half the days',
      'Nearly every day',
    ],
  },
  {
    title: 'SNAP-IV',
    questions: [
      'Often fails to give close attention to details or makes careless mistakes in schoolwork or tasks.',
      'Often has difficulty sustaining attention in tasks or play activities.',
      'Often does not seem to listen when spoken to directly.',
      'Often does not follow through on instructions and fails to finish schoolwork, chores, or duties.',
      'Often has difficulty organizing tasks and activities.',
      'Often avoids, dislikes, or reluctantly engages in tasks requiring sustained mental effort.',
      'Often loses things necessary for tasks or activities (e.g., toys, school assignments, pencils, or books.)',
      'Often is distracted by extraneous stimuli.',
      'Often is forgetful in daily activities',
    ],
    options: ['Not at all', 'just a little', 'Quite a bit', 'Very much'],
  },
  {
    title: 'PCL-5',
    questions: [
      'Repeated, disturbing and unwanted memories of the stressful experience?',
      'Suddenly feeling or acting as if the stressful experience were actually happening again (as if you were actually back there reliving it)?',
      'Feeling very upset when something reminded you of the stressful experience?',
      'Having strong physical reactions when something reminded you of the stressful experience (for example, heart pounding, sweating)?',
      'Avoiding memories, thoughts, or feelings related to the stressful experience?',
      'Avoiding external reminders of the stressful experience (for example, people, places, conversations, activities, objects, or situations)?',
      'Trouble remembering important parts of the stressful experience?',
      'Having strong negative beliefs about yourself, other people, or the world (for example, having thoughts such as: I am bad, there is something seriously wrong with me, no one can be trusted, the world is completely dangerous)?',
      'Blaming yourself or someone else for the stressful experience or what happened after it?',
      'Having strong negative feelings such as fear, horror, anger, guilt, or shame?',
      'Loss of interest in activities that you used to enjoy?',
      'Feeling distant or cut off from other people?',
      'Trouble experiencing positive feelings (for example, being unable to feel happiness or have loving feelings for people close to you)?',
      'Irritable behaviour, angry outbursts, or acting aggressively?',
      'Taking too many risks or doing things that could cause you harm?',
      'Being “superalert” or watchful or on guard?',
      'Feeling jumpy or easily startled?',
      'Having difficulty concentrating?',
      'Trouble falling or staying asleep?',
    ],
    options: [
      'Not at all',
      'A little bit',
      'Quite a bit',
      'Moderately',
      'Extremely',
    ],
  },
]

const QuestionaireView = () => {
  const borderClass = (idx: number) => {
    if (idx === 0) {
      return 'rounded-t-2 border-x border-t'
    } else if (idx === accordions.length - 1) {
      return 'rounded-b-2 border-x border-b'
    } else {
      return 'border-x'
    }
  }

  return (
    <Accordion.Root type="multiple">
      {accordions.map((accordion, index) => (
        <Accordion.Item value={accordion.title} key={accordion.title}>
          <Accordion.Header className="group flex items-center justify-between">
            <Flex
              align="center"
              justify="between"
              p="2"
              className={`w-full border-[#DDDDE3] bg-[#EEF2F6] ${borderClass(
                index,
              )}`}
            >
              <Text size="3" weight="medium">
                {accordion.title}
              </Text>
              <Flex gap="5">
                <Accordion.Trigger>
                  <ChevronDown
                    height={20}
                    width={20}
                    strokeWidth={2}
                    className={`group-data-[state=${'open'}]:rotate-180`}
                    aria-hidden
                  />
                </Accordion.Trigger>
              </Flex>
            </Flex>
          </Accordion.Header>
          <Accordion.Content className="flex-wrap rounded-b-2 border-x border-b border-[#DDDDE3] p-4">
            <AccordionContent
              questions={accordion.questions}
              options={accordion.options}
            />
          </Accordion.Content>
        </Accordion.Item>
      ))}
    </Accordion.Root>
  )
}

export default QuestionaireView
