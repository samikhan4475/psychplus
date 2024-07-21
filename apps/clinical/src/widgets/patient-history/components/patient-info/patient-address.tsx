import { Box, Flex, Grid, Heading, Text } from '@radix-ui/themes'
import { CODE_NOT_SET } from '@psychplus/codeset'
import { usePatientHistoryContext } from '../../context'
import { useUsStatesIndex } from '../../hooks'
import { LabelledText } from './text-and-label'

const PatientAddress = () => {
  const { profileHistory } = usePatientHistoryContext()
  const usStatesIndex = useUsStatesIndex()
  const homeAddress = profileHistory.contactDetails?.addresses?.find(
    (address) => address.type === 'Home',
  )
  const mailingAddress = profileHistory.contactDetails?.addresses?.find(
    (address) => address.type === 'Mailing',
  )

  return (
    <Flex direction="column">
      <Heading size="3" className="pb-1 pl-2 pt-2">
        Address
      </Heading>
      <Grid columns='2' className="gap-2 bg-[#FFFF] px-2 pb-2 pt-3">
        <Box className="col-span-1">
          <Flex direction='column' className="gap-4">
            <Heading size="3" className="py-1">
              Primary <span className="text-[#FF0000]">*</span>
            </Heading>
            <LabelledText
              required
              label="Address 1"
              value={homeAddress?.street1 ?? ''}
            />
            <LabelledText
              label="Address 2"
              value={homeAddress?.street1 ?? ''}
            />
            <Flex className="bg-gray-200 gap-3">
              <Box className="flex-1">
                <LabelledText
                  required
                  label="City"
                  value={homeAddress?.city ?? ''}
                />
              </Box>
              <Box className="flex-1">
                <LabelledText
                  required
                  label="State"
                  value={usStatesIndex[homeAddress?.state ?? CODE_NOT_SET]}
                />
              </Box>
              <Box className="flex-1">
                <LabelledText
                  required
                  label="Zip"
                  value={homeAddress?.postalCode ?? ''}
                />
              </Box>
            </Flex>
          </Flex>
        </Box>
        <Box className="col-span-1">
          <Flex direction='column' className="gap-4">
            <Flex className="w-[100%] gap-2">
              <Heading size="3" className="py-1">
                Mail
              </Heading>
              <Flex
                align="center"
                className="box-border w-[70%] grow justify-between rounded-[4px] px-3 py-1 text-[12px]"
              >
                <Text weight="bold" className="text-[12px]">
                  Is your mailing address same as primary?
                </Text>
                {profileHistory.contactDetails?.isMailingAddressSameAsPrimary
                  ? 'Yes'
                  : 'No'}
              </Flex>
            </Flex>
            <LabelledText
              required
              label="Address 1"
              value={mailingAddress?.street1 ?? ''}
            />
            <LabelledText
              label="Address 2"
              value={mailingAddress?.street1 ?? ''}
            />
            <Flex className="bg-gray-200 gap-x-20">
              <Box>
                <LabelledText
                  required
                  label="City"
                  value={mailingAddress?.city ?? ''}
                />
              </Box>
              <Box>
                <LabelledText
                  required
                  label="State"
                  value={usStatesIndex[mailingAddress?.state ?? CODE_NOT_SET]}
                />
              </Box>
              <Box>
                <LabelledText
                  required
                  label="Zip"
                  value={mailingAddress?.postalCode ?? ''}
                />
              </Box>
            </Flex>
          </Flex>
        </Box>
      </Grid>
    </Flex>
  )
}

export default PatientAddress
