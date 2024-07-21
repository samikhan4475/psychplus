import { Box, Flex, Heading } from '@radix-ui/themes'
import { CODE_NOT_SET } from '@psychplus/codeset'
import { usePatientHistoryContext } from '../../context'
import { useDegreeIndex, useUsStatesIndex } from '../../hooks'
import DescriptiveSection from './descriptive-section'
import { LabelledText } from './text-and-label'

const AdditionalInfo = () => {
  const { profileHistory } = usePatientHistoryContext()
  const usStatesIndex = useUsStatesIndex()
  const degreeIndex = useDegreeIndex()
  const homeNumber = profileHistory.contactDetails?.phoneNumbers?.find(
    (number) => number.type === 'Home',
  )
  const workNumber = profileHistory.contactDetails?.phoneNumbers?.find(
    (number) => number.type === 'Business',
  )
  const homeAddress =
    profileHistory.alternateOrPreviousContactDetails?.addresses?.find(
      (address) => address.type === 'Home',
    )

  return (
    <>
      <Box className="w-[100%]">
        <Flex direction="column" className="col-span-1">
          <Heading size="3" className="pb-1 pl-2 pt-2">
            Additional Contact Info
          </Heading>
          <Flex wrap="wrap" className="justify-between gap-x-4 bg-[#FFFF] p-2">
            <LabelledText label="Home Phone" value={homeNumber?.number ?? ''} />
            <LabelledText label="Ext" value={homeNumber?.extension ?? ''} />
            <LabelledText label="Comment" value={homeNumber?.comment ?? ''} />
            <LabelledText label="Work Phone" value={workNumber?.number ?? ''} />
            <LabelledText label="Ext" value={workNumber?.extension ?? ''} />
            <Box className="flex-1">
              <LabelledText label="Comment" value={workNumber?.comment ?? ''} />
            </Box>
          </Flex>
        </Flex>
      </Box>
      <Box className="w-[100%]">
        <Heading size="3" className="pb-1 pl-2 pt-2">
          Alternate/Previous Info
        </Heading>
        <Flex wrap="wrap" className="justify-between gap-x-8 bg-[#FFFF] p-2">
          <LabelledText
            label="First Name"
            value={profileHistory.alternateOrPreviousName?.firstName ?? ''}
          />
          <LabelledText
            label="Middle Name"
            value={profileHistory.alternateOrPreviousName?.middleName ?? ''}
          />
          <LabelledText
            label="Last Name"
            value={profileHistory.alternateOrPreviousName?.lastName ?? ''}
          />
          <LabelledText
            label="Prefix"
            value={profileHistory.alternateOrPreviousName?.title ?? ''}
          />
          <LabelledText
            label="Suffix"
            value={profileHistory.alternateOrPreviousName?.suffix ?? ''}
          />

          <LabelledText
            label="Prof. Suffix"
            value={
              degreeIndex[
                profileHistory.alternateOrPreviousName?.honors ?? CODE_NOT_SET
              ]
            }
          />
          <LabelledText
            label="Address Line 1"
            value={homeAddress?.street1 ?? ''}
          />
          <Box>
            <LabelledText
              label="Address Line 2"
              value={homeAddress?.street2 ?? ''}
            />
          </Box>
          <Box>
            <LabelledText label="City" value={homeAddress?.city ?? ''} />
          </Box>
          <Box>
            <LabelledText
              label="State"
              value={usStatesIndex[homeAddress?.state ?? CODE_NOT_SET]}
            />
          </Box>
          <Box className="flex-1">
            <LabelledText label="Zip" value={homeAddress?.postalCode ?? ''} />
          </Box>
        </Flex>
      </Box>
      <Box className="w-[100%]">
        <DescriptiveSection />
      </Box>
    </>
  )
}

export { AdditionalInfo }
