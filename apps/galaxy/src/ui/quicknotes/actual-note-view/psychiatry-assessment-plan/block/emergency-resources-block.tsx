import { Box, Flex, Text } from '@radix-ui/themes'
import { Relationship } from '@/types'
import { getUserFullName } from '@/utils'
import { LabelAndValue } from '../../shared'
import { crisisActionPlan, emergencyResources } from '../constants'

interface EmergencyResourcesBlockProps {
  patientRelationships: Relationship[]
}

const EmergencyResourcesBlock = ({
  patientRelationships,
}: EmergencyResourcesBlockProps) => {
  return (
    <Flex direction="column" gap="4">
      <LabelAndValue
        label={'Emergency Resources Provided'}
        value={
          <ul className="list-disc pl-16">
            {Object.entries(emergencyResources).map(([label, value]) => (
              <li key={value} className="">
                <Text weight="medium">
                  {label} : {value}
                </Text>
              </li>
            ))}
          </ul>
        }
      />
      <LabelAndValue
        label={'Crisis Action Plan Provided'}
        value={crisisActionPlan}
      />
      <LabelAndValue
        label="Support System"
        value={
          <Box>
            {patientRelationships.map((relationship) => (
              <Flex key={relationship.id} direction="row">
                <Text>
                  {getUserFullName(
                    {
                      firstName: relationship?.name?.firstName,
                      middleName: relationship?.name?.middleName,
                      lastName: relationship?.name?.lastName,
                    },
                    true,
                  )}{' '}
                  |{' '}
                </Text>
                <Text>
                  {relationship?.contactDetails?.phoneNumbers?.[0]?.number}
                </Text>
              </Flex>
            ))}
          </Box>
        }
        flexDirection="column"
      />
    </Flex>
  )
}

export { EmergencyResourcesBlock }
