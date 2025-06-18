import { Box, Grid, Text } from '@radix-ui/themes'
import {
  formatDateOfBirth,
  getAgeFromDate,
  getCalendarDate,
} from '@/utils'
import { getAddressData } from '../../utils'
import { DisplayAddress } from './display-address'
import { InfoField } from './info-field'
import { useStore } from './store'

const StaffRecordInfo = () => {
  const { selectedRecord } = useStore()

  if (!selectedRecord) {
    return null
  }

  const mailingAddressData = getAddressData(
    selectedRecord.contactInfo.addresses,
    'Mailing',
  )
  const homeAddressData = getAddressData(
    selectedRecord.contactInfo.addresses,
    'Business',
  )

  return (
    <>
      <Box className="bg-pp-table-subRows mb-2 w-full pb-1 pl-2 pr-2 pt-1">
        <Text size="2" weight={'bold'} className="text-black mb-2 pb-2">
          Personal Info
        </Text>
      </Box>
      <Grid columns="6" gap="3" className="mt-4">
        <Box>
          <InfoField
            label="First Name"
            value={selectedRecord.legalName.firstName}
            required
          />
        </Box>
        <Box>
          <InfoField
            label="Last Name"
            value={selectedRecord.legalName.lastName}
            required
          />
        </Box>
        <Box>
          <InfoField
            label="DOB"
            value={
              selectedRecord.dateOfBirth &&
              formatDateOfBirth(selectedRecord.dateOfBirth as string)
            }
            required
          />
        </Box>
        <Box>
          <InfoField
            label="Age"
            value={
              selectedRecord.dateOfBirth &&
              getAgeFromDate(
                getCalendarDate(String(selectedRecord?.dateOfBirth)),
              )
            }
            required
          />
        </Box>
        <Box>
          <InfoField label="Gender" value={selectedRecord.gender} required />
        </Box>
        <Box>
          <InfoField
            label="Languages"
            value={selectedRecord.spokenLanguages?.join(', ')}
            required
          />
        </Box>
      </Grid>
      <Grid columns="3" gap="3" className="mt-4">
        <Box>
          <InfoField
            label="Email"
            value={selectedRecord.contactInfo.email}
            required
          />
        </Box>

        <Box>
          <InfoField
            label="Phone"
            value={selectedRecord.phoneContact}
            required
          />
        </Box>

        <Box>
          <InfoField
            label="Virtual Wait Room"
            value={selectedRecord.virtualRoomLink ? 'Yes' : 'No'}
            required
          />
        </Box>
      </Grid>

      <Grid columns="2" gap="3" className="mt-4">
        <Box>
          <InfoField
            required
            label="Individual NPI"
            value={selectedRecord.npi}
          />
        </Box>

        <Box>
          <InfoField required label="Bio Video" value="" />
        </Box>
      </Grid>
      <Box>
        <InfoField required label="Bio Text" value={selectedRecord.bio} />
      </Box>

      <Grid columns="2" gap="3" className="mt-4">
        <Box>
          <Box className="mb-3">
            <Text weight="bold">Home</Text>
          </Box>
          <Box>
            <DisplayAddress address={homeAddressData} />
          </Box>
        </Box>

        <Box>
          <Box className="mb-3">
            <Text weight="bold">Mailing</Text>
          </Box>
          <Box>
            <Text weight="bold" className="text-1">
              Is your mailing address the same as your home?
            </Text>{' '}
            <Text className="text-1">
              {selectedRecord?.isMailingAddressSameAsPrimary ? 'Yes' : 'No'}
            </Text>
          </Box>
          <Box>
            <DisplayAddress address={mailingAddressData} />

            <Grid columns="3" gap="3">
              <Box>
                <InfoField
                  required
                  label="Credentials"
                  value={selectedRecord.legalName.honors}
                />
              </Box>

              <Box>
                <InfoField
                  required
                  label="Supervised By"
                  value={selectedRecord.supervisedBy}
                />
              </Box>
              <Box>
                <InfoField
                  required
                  label="Status"
                  value={selectedRecord.status}
                />
              </Box>
            </Grid>
          </Box>
        </Box>
      </Grid>
    </>
  )
}

export { StaffRecordInfo }
