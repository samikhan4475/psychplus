import { Box, Flex, Heading, Separator, Text } from '@radix-ui/themes'
import { PropsWithChildren } from 'react'

const headingClasses = 'text-[16px] my-1'
const SeparatorClasses = 'my-3 w-full'
const subheadingClasses = 'font-[510]'
const cardContainerClasses = 'text-[12px]'
const cardContentClasses = 'gap-x-1'

const NoteDetail = ({children}: PropsWithChildren) => {
  return (
    <Box className='px-2'>
      <Flex direction="column" className={cardContainerClasses}>
        <Heading className={headingClasses}>Psychiatric Evaluation</Heading>
        <Flex className={cardContentClasses}>
          <span className={subheadingClasses}>Title:</span>
          <span>Psychiatric Evaluation</span>
        </Flex>
        <Flex className={cardContentClasses}>
          <span className={subheadingClasses}>Visit Type:</span>
          <span>Est Pt, Outpatient Office Visit</span>
        </Flex>
        <Flex className={cardContentClasses}>
          <span className={subheadingClasses}>Provider Type:</span>
          <span>John Smith, MD</span>
        </Flex>
        <Flex className={cardContentClasses}>
          <span className={subheadingClasses}>Provider:</span>
          <span>John Smith, MD</span>
        </Flex>
        <Flex className={cardContentClasses}>
          <span className={subheadingClasses}>Location:</span>
          <span>Willow Brooks</span>
        </Flex>
        <Flex className={cardContentClasses}>
          <span className={subheadingClasses}>Service:</span>
          <span>Willow Brooks</span>
        </Flex>
        <Flex className={cardContentClasses}>
          <span className={subheadingClasses}>Date:</span>
          <span>11/21/2024</span>
          <span className={subheadingClasses}>Time:</span>
          <span>00:00</span>
        </Flex>
        <Flex className={cardContentClasses}>
          <span className={subheadingClasses}>Patient:</span>
          <span>Ross Geller</span>
        </Flex>
        <Flex className={cardContentClasses}>
          <span className={subheadingClasses}>DOB:</span>
          <span>11/21/2024</span>
        </Flex>
        <Flex className={cardContentClasses}>
          <span className={subheadingClasses}>Cosigner:</span>
          <span>Roger Parker, MD</span>
        </Flex>
        <Flex className={cardContentClasses}>
          <span className={subheadingClasses}>Visit #</span>
          <span>0000198</span>
        </Flex>
      </Flex>
      <Separator size='3' className={SeparatorClasses} />
      <Flex direction="column" className={cardContainerClasses}>
        <Heading className={headingClasses}>Therapy</Heading>
        <Flex className={cardContentClasses}>
          <span className={subheadingClasses}>Time Spent:</span>
          <span>{'>'} 38</span>
        </Flex>
        <Flex className={cardContentClasses}>
          <span className={subheadingClasses}>Time Spent:</span>
          <span>{'>'} 38</span>
        </Flex>
        <Flex className={cardContentClasses}>
          <span className={subheadingClasses}>Session Participants:</span>
          <span>Patient with Patient/Guardian</span>
        </Flex>
        <Flex className={cardContentClasses}>
          <span className={subheadingClasses}>Therapy Modality:</span>
          <span>Anger Management, Brief Psychotherapy</span>
        </Flex>
        <Flex className={cardContentClasses}>
          <span className={subheadingClasses}>Intervention:</span>
          <span>Coaching, Crisis Intervention</span>
        </Flex>
      </Flex>
      <Separator size='3' className={SeparatorClasses} />
      <Flex direction="column" className={cardContainerClasses}>
        <Heading className={headingClasses}>Past Psychiatry History</Heading>
        <Flex className={cardContentClasses}>
          <span className={subheadingClasses}>Psych Hospitalizations:</span>
          <span>12</span>
          <span className={subheadingClasses}>Suicide Attempts:</span>
          <span>00</span>
        </Flex>
        <Flex className={cardContentClasses}>
          <span className={subheadingClasses}>Depression:</span>
          <span className={subheadingClasses}>Age Started:</span>
          <span>12</span>
        </Flex>
        <Flex className={cardContentClasses}>
          <span className={subheadingClasses}>Bipolar:</span>
          <span className={subheadingClasses}>Age Started:</span>
          <span>12</span>
        </Flex>
        <Flex className={cardContentClasses}>
          <span className={subheadingClasses}>ADHD:</span>
          <span className={subheadingClasses}>Age Started</span>
          <span>12</span>
        </Flex>
      </Flex>
      <Separator size='3' className={SeparatorClasses} />
      <Flex direction="column" className={cardContainerClasses}>
        <Heading className={headingClasses}>Family Psychiatric Hx</Heading>
        <Flex className={cardContentClasses}>
          <span className={subheadingClasses}>Bipolar Disorder:</span>
          <span className={subheadingClasses}>Relationship:</span>
          <span>Brother</span>
        </Flex>
        <Flex className={cardContentClasses}>
          <span className={subheadingClasses}>Alcohol use disorder:</span>
          <span className={subheadingClasses}>Relationship:</span>
          <span>Brother</span>
        </Flex>
      </Flex>
      <Separator size='3' className={SeparatorClasses} />
      <Flex direction="column" className={cardContainerClasses}>
        <Heading className={headingClasses}>Social Hx</Heading>
        <Flex className={cardContentClasses}>
          <span className={subheadingClasses}>Relationship Status:</span>
          <span>Single</span>
        </Flex>
        <Flex className={cardContentClasses}>
          <span className={subheadingClasses}>Professional Education:</span>
          <span>In School</span>
        </Flex>
        <Flex className={cardContentClasses}>
          <span className={subheadingClasses}>Employed:</span>
          <span>Yes</span>
        </Flex>
        <Flex className={cardContentClasses}>
          <span className={subheadingClasses}>Legal History:</span>
          <span>Yes</span>
        </Flex>
        <Flex className={cardContentClasses}>
          <span className={subheadingClasses}>Living:</span>
          <span>With Family</span>
        </Flex>
        <Flex className={cardContentClasses}>
          <span className={subheadingClasses}>Trauma Hx:</span>
          <span>Emotional</span>
        </Flex>
      </Flex>
      <Separator size='3' className={SeparatorClasses} />
      <Flex direction='column' className={cardContainerClasses}>
        <Heading className={headingClasses}>Substance Use Hx</Heading>
        <Flex className={cardContentClasses}>
            <span className={subheadingClasses}>Tobacco:</span>
            <span>Yes</span>
        </Flex>
        <Flex className={cardContentClasses}>
            <span className={subheadingClasses}>Smoke:</span>
            <span className={subheadingClasses}>Start Date:</span>
            <span>03/12/24</span>
            <span className={subheadingClasses}>End Date:</span>
            <span>03/12/24</span>
        </Flex>
        <Flex className={cardContentClasses}>
            <span>Status</span>
            <span>Active</span>
        </Flex>
      </Flex>
      <Separator size='3' className={SeparatorClasses} />
      <Flex direction='column' className={cardContainerClasses}>
        <Heading className={headingClasses}>Past Medical Hx</Heading>
        <Flex className={cardContentClasses}>
            <span className={subheadingClasses}>Pregnant:</span>
            <span className={subheadingClasses}>Date of conception:</span>
            <span>03/21/24</span>
        </Flex>
        <Flex className={cardContentClasses}>
            <span className={subheadingClasses}>Breast Feeding:</span>
            <span className={subheadingClasses}>Days Post Partum:</span>
            <span>12</span>
        </Flex>
      </Flex>
      <Separator size='3' className={SeparatorClasses} />
      <Flex direction='column' className={cardContainerClasses}>
        <Heading className={headingClasses}>Allergies</Heading>
        <Flex className={cardContentClasses}>
            pinicilin | Drug class | Shortness of breath | Mild | Active | 01/21/24 | 02/21/24
        </Flex>
        <Flex className={cardContentClasses}>
            Penetrex | Specific Drug Allergy | Shortness of breath | Mild | Active | 01/21/24 | 02/21/24
        </Flex>
      </Flex>
      <Separator size='3' className={SeparatorClasses} />
      <Flex direction='column' className={cardContainerClasses}>
        <Heading className={headingClasses}>Question</Heading>
        <Text className={subheadingClasses}>PHQ 9</Text>
        <Text className={subheadingClasses}>Number of Scores Added: 10</Text>
        <Text>Score 9, Completed on 03/25/2024 09:27:30 by Provider</Text>
        <Text>Score 9, Completed on 03/25/2024 09:27:30 by Patient</Text>
        <Text>Score 9, Completed on 03/25/2024 09:27:30 by Provider</Text>
      </Flex>
      {children}
      <Separator size='3' className={SeparatorClasses} />
      <Text className='text-[#1C2024] text-[16px] font-[590] mb-3'>
        E-Signed by: DrTEST1 DRTEST1, NP at 4/24/2024
      </Text>
    </Box>
  )
}

export { NoteDetail }
