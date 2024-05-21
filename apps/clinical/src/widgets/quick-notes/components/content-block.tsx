import { useEffect } from 'react'
import { Box, Flex, Heading, Text, TextArea } from '@radix-ui/themes'
import { Checkbox } from '@psychplus/ui/checkbox'
import { getQuickNotesContentData } from '../api'
import { CheckboxElement } from './checkbox-element'

const ContentBlock = () => {
  const ABAS = [
    'Parent/Caretaker interview',
    'Direct Observation',
    'Report Writing',
  ]
  const ABAP = ['Documentation', 'Standardized Assessments']
  const ABAH = [
    'Review of Documentation',
    'Review of Medical Background',
    'Review of Services & Coordination of Care',
    'Review of Skills',
    'Review of Behaviors',
  ]
  const ABAST = ['VABS-I', 'ABAS-3', 'QABF', 'BASC', 'VBMAPP']
  const ABADO = [
    'Probe Skills',
    'Obtain Baseline Data',
    'Preference Assessment',
    'Client Observation',
    'Rapport Building',
  ]
  const ABARW = [
    'Parent/Caretaker interview',
    'Direct Observation',
    'Report Writing',
    'Probe Skills',
    'Obtain Baseline Data',
    'Preference Assessment',
    'Client Observation',
  ]

  const setting = [
    'Clinic',
    'Home',
    'Community',
    'School',
    'Telehealth / Virtual',
  ]
  const Modality = [
    'In-Person, Face-to-Face',
    'In-Person, Virtual',
    'Non-Face-to-Face',
  ]
  const session_Participants = [
    'Patient',
    'Parent/Guardian',
    'BCBA',
    'Behavior Technician',
    'Registered Behavior Technician',
    'Outside Service Provider(s)',
    'Peer',
  ]

  useEffect(() => {
    getQuickNotesContentData('QuicknoteSectionItemDetailAttribute')
      .then((res) => {
        console.log('Data: ', res)
      })
      .catch((error) => alert(error.message))
  }, [])

  const CPT_Codes = [
    {
      label: 'testlabel',
      value: 'Outpatient Office Visit | New  | In-Person',
    },
    {
      label: 'testlabel',
      value: '99222 | 2595 | 90833',
    },
    {
      label: 'testlabel',
      value: 'Primary',
    },
    {
      label: 'testlabel',
      value: '99203',
    },
    {
      label: 'testlabel',
      value: '99204',
    },
    {
      label: 'testlabel',
      value: '99205',
    },
    {
      label: 'testlabel',
      value: 'Modifier',
    },
    {
      label: 'testlabel',
      value: '25',
    },
    {
      label: 'testlabel',
      value: '59',
    },
    {
      label: 'testlabel',
      value: '95',
    },
    {
      label: 'testlabel',
      value: 'Add-On',
    },
    {
      label: 'testlabel',
      value: '96127 (screen questions)',
    },
    {
      label: 'testlabel',
      value: '96372 (injection)',
    },
    {
      label: 'testlabel',
      value: '90833 therapy 16 min',
    },
    {
      label: 'testlabel',
      value: '90836 therapy 38 min',
    },
    {
      label: 'testlabel',
      value: '90838 therapy 52 min',
    },
    {
      label: 'testlabel',
      value: '90845 (psychoanalysis)',
    },
    {
      label: 'testlabel',
      value: '90785 (interactive complexity)',
    },
    {
      label: 'testlabel',
      value: '99406 (smoking 3 min)',
    },
    {
      label: 'testlabel',
      value: '99407 (smoking 11 min)',
    },
    {
      label: 'testlabel',
      value: '99408 (alcohol-sa 15 min)',
    },
    {
      label: 'testlabel',
      value: '99409 (alcohol-sa 31 min)',
    },
    {
      label: 'testlabel',
      value: '99050 (afterhours)',
    },
  ]

  return (
    <Box className="mb-[1px] gap-2  rounded-[2px] bg-[#EBF3FC] py-1.5">
      <Box className="mb-[1px] rounded-[2px] bg-[#ffffff] p-2">
        <Heading className="mb-[1px] text-[14px] font-[500]">
          Working Diagnosis
        </Heading>
        <Flex></Flex>
      </Box>
      <Box className="mb-[1px] gap-[4px] rounded-[2px] bg-[#ffffff] p-[8px]">
        <Heading className="mb-[1px] text-[14px] font-[500]">
          ABA Service Provided
        </Heading>
        <Box className="mb-[2px] flex">
          <Flex>
            {ABAS.map((value) => (
              <Text as="label" size="2" key={value}>
                <Flex className="mx-0.5">
                  <CheckboxElement label={value} />
                </Flex>
              </Text>
            ))}
          </Flex>
        </Box>
        <Box className="mb-[2px] flex">
          <Flex className="text-[12px] font-[700] leading-[20px]">
            <Text>
              Parent/Caretaker interview{' '}
              <span className="text-[12px] font-[400]">*</span>
            </Text>
          </Flex>
          <Flex>
            {ABAP.map((value) => (
              <Text as="label" size="2" key={value}>
                <Flex className={`mx-0.5`}>
                  <CheckboxElement label={value} />
                </Flex>
              </Text>
            ))}
          </Flex>
        </Box>
        <Box className="mb-[2px] flex">
          <Flex className="text-[12px] font-[700] leading-[20px]">
            <Text>
              History & Documentation{' '}
              <span className="text-[12px] font-[400]">*</span>
            </Text>
          </Flex>
          <Flex>
            {ABAH.map((value) => (
              <Text as="label" size="2" key={value}>
                <Flex className={`mx-0.5`}>
                  <CheckboxElement label={value} />
                </Flex>
              </Text>
            ))}
          </Flex>
        </Box>
        <Box className="mb-[2px] flex">
          <Flex className="text-[12px] font-[700] leading-[20px]">
            <Text>
              Standardized Assessments{' '}
              <span className="text-[12px] font-[400]">*</span>
            </Text>
          </Flex>
          <Flex>
            {ABAST.map((value) => (
              <Text as="label" size="2" key={value}>
                <Flex className={`mx-0.5`}>
                  <CheckboxElement label={value} />
                </Flex>
              </Text>
            ))}
          </Flex>
        </Box>
        <Box className="mb-[2px] flex">
          <Flex className="text-[12px] font-[700] leading-[20px]">
            <Text>
              Direct Observation{' '}
              <span className="text-[12px] font-[400]">*</span>
            </Text>
          </Flex>
          <Flex>
            {ABADO.map((value) => (
              <Text as="label" size="2" key={value}>
                <Flex className={`mx-0.5`}>
                  <CheckboxElement label={value} />
                </Flex>
              </Text>
            ))}
          </Flex>
        </Box>
        <Box className="mb-[2px] flex">
          <Flex className="text-[12px] font-[700] leading-[20px]">
            <Text>
              Report Writing <span className="text-[12px] font-[400]">*</span>
            </Text>
          </Flex>
          <Flex>
            {ABAST.map((value) => (
              <Text as="label" size="2" key={value}>
                <Flex className={`mx-0.5`}>
                  <CheckboxElement label={value} />
                </Flex>
              </Text>
            ))}
          </Flex>
        </Box>
      </Box>
      <Box className="mb-[1px] gap-2 rounded-[2px] bg-[#ffffff] p-[8px]">
        <Heading className="mb-[1px] text-[14px] font-[500]">
          Treatment Planning
        </Heading>
        <Flex>
          {ABARW.map((value) => (
            <Text as="label" size="2" key={value}>
              <Flex className={`mx-0.5`}>
                <CheckboxElement label={value} />
              </Flex>
            </Text>
          ))}
        </Flex>
      </Box>
      <Box className="mb-[1px] gap-2 rounded-[2px] bg-[#ffffff] p-[8px]">
        <Heading className="mb-[1px] text-[14px] font-[500]">
          Observation Notes
        </Heading>
        <Box>
          <TextArea placeholder="Reply to comment…" />
        </Box>
      </Box>
      <Box className="mb-[1px] gap-2 rounded-[2px] bg-[#ffffff] p-[8px]">
        <Heading className="mb-[1px] text-[14px] font-[500]">Setting</Heading>
        <Box>
          <Flex>
            {setting.map((value) => (
              <Text as="label" size="2" key={value}>
                <Flex className={`mx-0.5`}>
                  <CheckboxElement label={value} />
                </Flex>
              </Text>
            ))}
          </Flex>
        </Box>
      </Box>
      <Box className="mb-[1px] gap-2 rounded-[2px] bg-[#ffffff] p-[8px]">
        <Heading className="mb-[1px] text-[14px] font-[500]">Modality</Heading>
        <Box>
          <Flex>
            {Modality.map((value) => (
              <Text as="label" size="2" key={value}>
                <Flex className={`mx-0.5`}>
                  <CheckboxElement label={value} />
                </Flex>
              </Text>
            ))}
          </Flex>
        </Box>
      </Box>
      <Box className="mb-[1px] gap-2 rounded-[2px] bg-[#ffffff] p-[8px]">
        <Heading className="mb-[1px] text-[14px] font-[500]">
          Session Participants
        </Heading>
        <Box>
          <Box>
            <Flex>
              {session_Participants.map((value) => (
                <Text as="label" size="2" key={value}>
                  <Flex className={`mx-0.5`}>
                    <CheckboxElement label={value} />
                  </Flex>
                </Text>
              ))}
            </Flex>
          </Box>
          <Box className={`Flex`}>
            other{' '}
            <Box>
              {' '}
              <TextArea size="1" placeholder="Reply to comment…" />{' '}
            </Box>
          </Box>
        </Box>
      </Box>
      <Box className="mb-[1px] gap-2 rounded-[2px] bg-[#ffffff] p-[8px]">
        <Heading className="mb-[1px] text-[14px] font-[500]">
          Time Spent
        </Heading>
        <Box></Box>
      </Box>
      <Box className="mb-[1px] gap-2 rounded-[2px] bg-[#ffffff] p-[8px]">
        <Heading className="mb-[1px] text-[14px] font-[500]">CPT Codes</Heading>
        <Box>
          {CPT_Codes.map((item) => (
            <Flex
              className="flex max-w-[280px] items-center border bg-[#C8D6FF]"
              key={item.value}
            >
              <Box className="flex cursor-pointer items-center border-r p-1 ">
                <Checkbox
                  data-testid={item.value}
                  onCheckedChange={(checked) => {
                    console.log(item.label)
                  }}
                />
              </Box>
              <Text as="label" size="2" ml="2" htmlFor={item.value}>
                {item.value}
              </Text>
            </Flex>
          ))}
        </Box>
      </Box>
    </Box>
  )
}

export { ContentBlock }
