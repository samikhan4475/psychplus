import { Box, Flex, Heading, Text, TextArea } from '@radix-ui/themes'
import { Checkbox } from '@psychplus/ui/checkbox'
import { CheckboxElement } from './checkbox-element'
import { useEffect } from 'react'
import { getQuickNotesContentData } from '../api'


const ContentBlock = () => {

  const ABAS = ['Parent/Caretaker interview', 'Direct Observation', 'Report Writing']
  const ABAP = ['Documentation', 'Standardized Assessments']
  const ABAH = ["Review of Documentation", "Review of Medical Background", "Review of Services & Coordination of Care", "Review of Skills", "Review of Behaviors"]
  const ABAST = ['VABS-I', 'ABAS-3', 'QABF', 'BASC', 'VBMAPP']
  const ABADO = ['Probe Skills', 'Obtain Baseline Data', 'Preference Assessment', 'Client Observation', 'Rapport Building']
  const ABARW = ['Parent/Caretaker interview', 'Direct Observation', 'Report Writing', 'Probe Skills', 'Obtain Baseline Data', 'Preference Assessment', 'Client Observation']

  const setting = ['Clinic', 'Home', 'Community', 'School', 'Telehealth / Virtual']
  const Modality = ['In-Person, Face-to-Face', 'In-Person, Virtual', 'Non-Face-to-Face']
  const session_Participants = ['Patient', 'Parent/Guardian', 'BCBA', 'Behavior Technician', 'Registered Behavior Technician', 'Outside Service Provider(s)', 'Peer']

  useEffect(() => {
    getQuickNotesContentData('QuicknoteSectionItemDetailAttribute')
      .then((res) => {
        console.log("Data: ", res)
      })
      .catch((error) => alert(error.message))
  }, [])

  const CPT_Codes = [
    {
      label: "testlabel",
      value: "Outpatient Office Visit | New  | In-Person"
    },
    {
      label: "testlabel",
      value: "99222 | 2595 | 90833"
    },
    {
      label: "testlabel",
      value: "Primary"
    },
    {
      label: "testlabel",
      value: "99203"
    },
    {
      label: "testlabel",
      value: "99204"
    },
    {
      label: "testlabel",
      value: "99205"
    },
    {
      label: "testlabel",
      value: "Modifier"
    },
    {
      label: "testlabel",
      value: "25"
    },
    {
      label: "testlabel",
      value: "59"
    },
    {
      label: "testlabel",
      value: "95"
    },
    {
      label: "testlabel",
      value: "Add-On"
    },
    {
      label: "testlabel",
      value: "96127 (screen questions)"
    },
    {
      label: "testlabel",
      value: "96372 (injection)"
    },
    {
      label: "testlabel",
      value: "90833 therapy 16 min"
    },
    {
      label: "testlabel",
      value: "90836 therapy 38 min"
    },
    {
      label: "testlabel",
      value: "90838 therapy 52 min"
    },
    {
      label: "testlabel",
      value: "90845 (psychoanalysis)"
    },
    {
      label: "testlabel",
      value: "90785 (interactive complexity)"
    },
    {
      label: "testlabel",
      value: "99406 (smoking 3 min)"
    },
    {
      label: "testlabel",
      value: "99407 (smoking 11 min)"
    },
    {
      label: "testlabel",
      value: "99408 (alcohol-sa 15 min)"
    },
    {
      label: "testlabel",
      value: "99409 (alcohol-sa 31 min)"
    },
    {
      label: "testlabel",
      value: "99050 (afterhours)"
    },
  ]

  return (
    <Box className="bg-[#EBF3FC] py-1.5  rounded-[2px] mb-[1px] gap-2">
      <Box className="bg-[#ffffff] rounded-[2px] mb-[1px] p-2">
        <Heading className="text-[14px] mb-[1px] font-[500]">
          Working Diagnosis
        </Heading>
        <Flex>

        </Flex>
      </Box>
      <Box className="bg-[#ffffff] rounded-[2px] mb-[1px] p-[8px] gap-[4px]">
        <Heading className="text-[14px] mb-[1px] font-[500]">
          ABA Service Provided
        </Heading>
        <Box className="flex mb-[2px]">
          <Flex>{
            ABAS.map((value) => (
              <Text as="label" size="2" key={value}>
                <Flex  className="mx-0.5">
                  <CheckboxElement label={value} />
                </Flex>
              </Text>
            ))
          }
          </Flex>
        </Box>
        <Box className="flex mb-[2px]">
          <Flex className="font-[700] text-[12px] leading-[20px]">
            <Text>
              Parent/Caretaker interview <span className="font-[400] text-[12px]" >*</span>
            </Text>
          </Flex>
          <Flex>{
            ABAP.map((value) => (
              <Text as="label" size="2" key={value}>
                <Flex  className={`mx-0.5`}>
                  <CheckboxElement label={value} />
                </Flex>
              </Text>
            ))
          }
          </Flex>
        </Box>
        <Box className="flex mb-[2px]">
          <Flex className="font-[700] text-[12px] leading-[20px]">
            <Text>
              History & Documentation <span className="font-[400] text-[12px]" >*</span>
            </Text>
          </Flex>
          <Flex>{
            ABAH.map((value) => (
              <Text as="label" size="2" key={value}>
                <Flex  className={`mx-0.5`}>
                  <CheckboxElement label={value} />
                </Flex>
              </Text>
            ))
          }
          </Flex>
        </Box>
        <Box className="flex mb-[2px]">
          <Flex className="font-[700] text-[12px] leading-[20px]">
            <Text>
              Standardized Assessments <span className="font-[400] text-[12px]" >*</span>
            </Text>
          </Flex>
          <Flex>{
            ABAST.map((value) => (
              <Text as="label" size="2" key={value}>
                <Flex  className={`mx-0.5`}>
                  <CheckboxElement label={value} />
                </Flex>
              </Text>
            ))
          }
          </Flex>
        </Box>
        <Box className="flex mb-[2px]">
          <Flex className="font-[700] text-[12px] leading-[20px]">
            <Text>
              Direct Observation <span className="font-[400] text-[12px]" >*</span>
            </Text>
          </Flex>
          <Flex>{
            ABADO.map((value) => (
              <Text as="label" size="2" key={value}>
                <Flex  className={`mx-0.5`}>
                  <CheckboxElement label={value} />
                </Flex>
              </Text>
            ))
          }
          </Flex>
        </Box>
        <Box className="flex mb-[2px]">
          <Flex className="font-[700] text-[12px] leading-[20px]">
            <Text>
              Report Writing <span className="font-[400] text-[12px]" >*</span>
            </Text>
          </Flex>
          <Flex>{
            ABAST.map((value) => (
              <Text as="label" size="2" key={value}>
                <Flex  className={`mx-0.5`}>
                  <CheckboxElement label={value} />
                </Flex>
              </Text>
            ))
          }
          </Flex>
        </Box>
      </Box >
      <Box className="bg-[#ffffff] rounded-[2px] mb-[1px] p-[8px] gap-2">
        <Heading className="text-[14px] mb-[1px] font-[500]">
          Treatment Planning
        </Heading>
        <Flex>{
          ABARW.map((value) => (
            <Text as="label" size="2" key={value}>
              <Flex  className={`mx-0.5`}>
                <CheckboxElement label={value} />
              </Flex>
            </Text>
          ))
        }
        </Flex>

      </Box>
      <Box className="bg-[#ffffff] rounded-[2px] mb-[1px] p-[8px] gap-2">
        <Heading className="text-[14px] mb-[1px] font-[500]">
          Observation Notes
        </Heading>
        <Box>
          <TextArea placeholder="Reply to comment…" />
        </Box>
      </Box>
      <Box className="bg-[#ffffff] rounded-[2px] mb-[1px] p-[8px] gap-2">
        <Heading className="text-[14px] mb-[1px] font-[500]">
          Setting
        </Heading>
        <Box>
          <Flex>{
            setting.map((value) => (
              <Text as="label" size="2" key={value}>
                <Flex className={`mx-0.5`}>
                  <CheckboxElement label={value} />
                </Flex>
              </Text>
            ))
          }
          </Flex>
        </Box>
      </Box>
      <Box className="bg-[#ffffff] rounded-[2px] mb-[1px] p-[8px] gap-2">
        <Heading className="text-[14px] mb-[1px] font-[500]">
          Modality
        </Heading>
        <Box>
          <Flex>{
            Modality.map((value) => (
              <Text as="label" size="2" key={value}>
                <Flex className={`mx-0.5`}>
                  <CheckboxElement label={value} />
                </Flex>
              </Text>
            ))
          }
          </Flex>
        </Box>
      </Box>
      <Box className="bg-[#ffffff] rounded-[2px] mb-[1px] p-[8px] gap-2">
        <Heading className="text-[14px] mb-[1px] font-[500]">
          Session Participants
        </Heading>
        <Box>
          <Box>
            <Flex>{
              session_Participants.map((value) => (
                <Text as="label" size="2" key={value}>
                  <Flex className={`mx-0.5`}>
                    <CheckboxElement label={value} />
                  </Flex>
                </Text>
              ))
            }
            </Flex>
          </Box>
          <Box className={`Flex`} >
            other <Box> <TextArea size="1" placeholder="Reply to comment…" /> </Box>
          </Box>

        </Box>
      </Box>
      <Box className="bg-[#ffffff] rounded-[2px] mb-[1px] p-[8px] gap-2">
        <Heading className="text-[14px] mb-[1px] font-[500]">
          Time Spent
        </Heading>
        <Box>

        </Box>
      </Box>
      <Box className="bg-[#ffffff] rounded-[2px] mb-[1px] p-[8px] gap-2">
        <Heading className="text-[14px] mb-[1px] font-[500]">
          CPT Codes
        </Heading>
        <Box>
          {CPT_Codes.map((item) => (
            <Flex  className="border flex items-center bg-[#C8D6FF] max-w-[280px]" key={item.value}>
              <Box className="border-r p-1 flex items-center cursor-pointer ">
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

    </Box >
  )
}

export { ContentBlock }
