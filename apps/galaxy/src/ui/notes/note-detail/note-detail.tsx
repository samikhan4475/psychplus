import { PropsWithChildren } from 'react'
import { Box, Flex, Heading, Separator, Strong, Text } from '@radix-ui/themes'

const separatorClass = 'my-3 w-full bg-pp-gray-2 h-[1px]'

const NoteDetail = ({ children }: PropsWithChildren) => {
  return (
    <Box className="px-2 py-3">
      <Flex direction="column">
        <Heading size={'3'} my={'1'} weight={'medium'}>
          Psychiatric Evaluation
        </Heading>
        <Flex gapX={'1'}>
          <Text as="span" size={'1'} weight={'medium'}>
            Title:
          </Text>
          <Text as="span" size={'1'}>
            Psychiatric Evaluation
          </Text>
        </Flex>
        <Flex gapX={'1'}>
          <Text as="span" size={'1'} weight={'medium'}>
            Visit Type:
          </Text>
          <Text as="span" size={'1'}>
            Est Pt, Outpatient Office Visit
          </Text>
        </Flex>
        <Flex gapX={'1'}>
          <Text as="span" size={'1'} weight={'medium'}>
            Provider Type:
          </Text>
          <Text as="span" size={'1'}>
            John Smith, MD
          </Text>
        </Flex>
        <Flex gapX={'1'}>
          <Text as="span" size={'1'} weight={'medium'}>
            Provider:
          </Text>
          <Text as="span" size={'1'}>
            John Smith, MD
          </Text>
        </Flex>
        <Flex gapX={'1'}>
          <Text as="span" size={'1'} weight={'medium'}>
            Location:
          </Text>
          <Text as="span" size={'1'}>
            Willow Brooks
          </Text>
        </Flex>
        <Flex gapX={'1'}>
          <Text as="span" size={'1'} weight={'medium'}>
            Service:
          </Text>
          <Text as="span" size={'1'}>
            Willow Brooks
          </Text>
        </Flex>
        <Flex gapX={'1'}>
          <Text as="span" size={'1'} weight={'medium'}>
            Date:
          </Text>
          <Text as="span" size={'1'}>
            11/21/2024
          </Text>
          <Text as="span" size={'1'} weight={'medium'}>
            Time:
          </Text>
          <Text as="span" size={'1'}>
            00:00
          </Text>
        </Flex>
        <Flex gapX={'1'}>
          <Text as="span" size={'1'} weight={'medium'}>
            Patient:
          </Text>
          <Text as="span" size={'1'}>
            Ross Geller
          </Text>
        </Flex>
        <Flex gapX={'1'}>
          <Text as="span" size={'1'} weight={'medium'}>
            DOB:
          </Text>
          <Text as="span" size={'1'}>
            11/21/2024
          </Text>
        </Flex>
        <Flex gapX={'1'}>
          <Text as="span" size={'1'} weight={'medium'}>
            Cosigner:
          </Text>
          <Text as="span" size={'1'}>
            Roger Parker, MD
          </Text>
        </Flex>
        <Flex gapX={'1'}>
          <Text as="span" size={'1'} weight={'medium'}>
            Visit #
          </Text>
          <Text as="span" size={'1'}>
            0000198
          </Text>
        </Flex>
      </Flex>
      <Separator size="3" className={separatorClass} />
      <Flex direction="column">
        <Heading size={'3'} my={'1'} weight={'medium'}>
          Therapy
        </Heading>
        <Flex gapX={'1'}>
          <Text as="span" size={'1'} weight={'medium'}>
            Time Spent:
          </Text>
          <Text as="span" size={'1'}>
            {'>'} 38
          </Text>
        </Flex>
        <Flex gapX={'1'}>
          <Text as="span" size={'1'} weight={'medium'}>
            Time Spent:
          </Text>
          <Text as="span" size={'1'}>
            {'>'} 38
          </Text>
        </Flex>
        <Flex gapX={'1'}>
          <Text as="span" size={'1'} weight={'medium'}>
            Session Participants:
          </Text>
          <Text as="span" size={'1'}>
            Patient with Patient/Guardian
          </Text>
        </Flex>
        <Flex gapX={'1'}>
          <Text as="span" size={'1'} weight={'medium'}>
            Therapy Modality:
          </Text>
          <Text as="span" size={'1'}>
            Anger Management, Brief Psychotherapy
          </Text>
        </Flex>
        <Flex gapX={'1'}>
          <Text as="span" size={'1'} weight={'medium'}>
            Intervention:
          </Text>
          <Text as="span" size={'1'}>
            Coaching, Crisis Intervention
          </Text>
        </Flex>
      </Flex>
      <Separator size="3" className={separatorClass} />
      <Flex direction="column">
        <Heading size={'3'} my={'1'} weight={'medium'}>
          Past Psychiatry History
        </Heading>
        <Flex gapX={'1'}>
          <Text as="span" size={'1'} weight={'medium'}>
            Psych Hospitalizations:
          </Text>
          <Text as="span" size={'1'}>
            12
          </Text>
          <Text as="span" size={'1'} weight={'medium'}>
            Suicide Attempts:
          </Text>
          <Text as="span" size={'1'}>
            00
          </Text>
        </Flex>
        <Flex gapX={'1'}>
          <Text as="span" size={'1'} weight={'medium'}>
            Depression:
          </Text>
          <Text as="span" size={'1'} weight={'medium'}>
            Age Started:
          </Text>
          <Text as="span" size={'1'}>
            12
          </Text>
        </Flex>
        <Flex gapX={'1'}>
          <Text as="span" size={'1'} weight={'medium'}>
            Bipolar:
          </Text>
          <Text as="span" size={'1'} weight={'medium'}>
            Age Started:
          </Text>
          <Text as="span" size={'1'}>
            12
          </Text>
        </Flex>
        <Flex gapX={'1'}>
          <Text as="span" size={'1'} weight={'medium'}>
            ADHD:
          </Text>
          <Text as="span" size={'1'} weight={'medium'}>
            Age Started
          </Text>
          <Text as="span" size={'1'}>
            12
          </Text>
        </Flex>
      </Flex>
      <Separator size="3" className={separatorClass} />
      <Flex direction="column">
        <Heading size={'3'} my={'1'} weight={'medium'}>
          Family Psychiatric Hx
        </Heading>
        <Flex gapX={'1'}>
          <Text as="span" size={'1'} weight={'medium'}>
            Bipolar Disorder:
          </Text>
          <Text as="span" size={'1'} weight={'medium'}>
            Relationship:
          </Text>
          <Text as="span" size={'1'}>
            Brother
          </Text>
        </Flex>
        <Flex gapX={'1'}>
          <Text as="span" size={'1'} weight={'medium'}>
            Alcohol use disorder:
          </Text>
          <Text as="span" size={'1'} weight={'medium'}>
            Relationship:
          </Text>
          <Text as="span" size={'1'}>
            Brother
          </Text>
        </Flex>
      </Flex>
      <Separator size="3" className={separatorClass} />
      <Flex direction="column">
        <Heading size={'3'} my={'1'} weight={'medium'}>
          Social Hx
        </Heading>
        <Flex gapX={'1'}>
          <Text as="span" size={'1'} weight={'medium'}>
            Relationship Status:
          </Text>
          <Text as="span" size={'1'}>
            Single
          </Text>
        </Flex>
        <Flex gapX={'1'}>
          <Text as="span" size={'1'} weight={'medium'}>
            Professional Education:
          </Text>
          <Text as="span" size={'1'}>
            In School
          </Text>
        </Flex>
        <Flex gapX={'1'}>
          <Text as="span" size={'1'} weight={'medium'}>
            Employed:
          </Text>
          <Text as="span" size={'1'}>
            Yes
          </Text>
        </Flex>
        <Flex gapX={'1'}>
          <Text as="span" size={'1'} weight={'medium'}>
            Legal History:
          </Text>
          <Text as="span" size={'1'}>
            Yes
          </Text>
        </Flex>
        <Flex gapX={'1'}>
          <Text as="span" size={'1'} weight={'medium'}>
            Living:
          </Text>
          <Text as="span" size={'1'}>
            With Family
          </Text>
        </Flex>
        <Flex gapX={'1'}>
          <Text as="span" size={'1'} weight={'medium'}>
            Trauma Hx:
          </Text>
          <Text as="span" size={'1'}>
            Emotional
          </Text>
        </Flex>
      </Flex>
      <Separator size="3" className={separatorClass} />
      <Flex direction="column">
        <Heading size={'3'} my={'1'} weight={'medium'}>
          Substance Use Hx
        </Heading>
        <Flex gapX={'1'}>
          <Text as="span" size={'1'} weight={'medium'}>
            Tobacco:
          </Text>
          <Text as="span" size={'1'}>
            Yes
          </Text>
        </Flex>
        <Flex gapX={'1'}>
          <Text as="span" size={'1'} weight={'medium'}>
            Smoke:
          </Text>
          <Text as="span" size={'1'} weight={'medium'}>
            Start Date:
          </Text>
          <Text as="span" size={'1'}>
            03/12/24
          </Text>
          <Text as="span" size={'1'} weight={'medium'}>
            End Date:
          </Text>
          <Text as="span" size={'1'}>
            03/12/24
          </Text>
        </Flex>
        <Flex gapX={'1'}>
          <Text as="span" size={'1'}>
            Status
          </Text>
          <Text as="span" size={'1'}>
            Active
          </Text>
        </Flex>
      </Flex>
      <Separator size="3" className={separatorClass} />
      <Flex direction="column">
        <Heading size={'3'} my={'1'} weight={'medium'}>
          Past Medical Hx
        </Heading>
        <Flex gapX={'1'}>
          <Text as="span" size={'1'} weight={'medium'}>
            Pregnant:
          </Text>
          <Text as="span" size={'1'} weight={'medium'}>
            Date of conception:
          </Text>
          <Text as="span" size={'1'}>
            03/21/24
          </Text>
        </Flex>
        <Flex gapX={'1'}>
          <Text as="span" size={'1'} weight={'medium'}>
            Breast Feeding:
          </Text>
          <Text as="span" size={'1'} weight={'medium'}>
            Days Post Partum:
          </Text>
          <Text as="span" size={'1'}>
            12
          </Text>
        </Flex>
      </Flex>
      <Separator size="3" className={separatorClass} />
      <Flex direction="column">
        <Heading size={'3'} my={'1'} weight={'medium'}>
          Allergies
        </Heading>
        <Text as="div" size={'1'}>
          pinicilin | Drug class | Shortness of breath | Mild | Active |
          01/21/24 | 02/21/24
        </Text>
        <Text as="div" size={'1'}>
          Penetrex | Specific Drug Allergy | Shortness of breath | Mild | Active
          | 01/21/24 | 02/21/24
        </Text>
      </Flex>
      <Separator size="3" className={separatorClass} />
      <Flex direction="column">
        <Heading size={'3'} my={'1'} weight={'medium'}>
          Question
        </Heading>
        <Heading size={'1'}>PHQ 9</Heading>
        <Text as="span" size={'1'} weight={'regular'} className="text-gray-10">
          Number of Scores Added: 10
        </Text>
        <Text as="span" size={'1'}>
          <Strong>Score 9</Strong>, Completed on 03/25/2024 09:27:30 by
          <Strong> Provider</Strong>
        </Text>
        <Text as="span" size={'1'}>
          <Strong>Score 9</Strong>, Completed on 03/25/2024 09:27:30 by
          <Strong> Patient</Strong>
        </Text>
        <Text as="span" size={'1'}>
          <Strong>Score 9</Strong>, Completed on 03/25/2024 09:27:30 by
          <Strong> Provider</Strong>
        </Text>
      </Flex>
      {children}
      <Separator size="3" className={separatorClass} />
      <Heading size={'3'} my={'1'} weight={'medium'}>
        E-Signed by: DrTEST1 DRTEST1, NP at 4/24/2024
      </Heading>
    </Box>
  )
}

export { NoteDetail }
