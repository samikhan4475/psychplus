'use client'

import { Box, Flex, Text } from '@radix-ui/themes'
import { formatDate, getMaskedPhoneNumber } from '@/utils'
import TextInputField from './text-input-field'
import { Pharmacy } from './types'

const PharmacyDetailsGeneralInformationSection = ({
  pharmacy,
}: {
  pharmacy: Pharmacy
}) => {
  return (
    <Box className="border-pp-gray-2 rounded-3 border">
      <Box className="shadow-sm bg-pp-table-subRows p-2">
        <Text className="text-pp-black-3 mb-2 text-[14px] font-bold">
          General Information
        </Text>
      </Box>
      <Flex gap="2" className="p-3" wrap="wrap">
        <TextInputField label="Name" value={pharmacy.name} />
        <TextInputField label="NCPDP ID" value={pharmacy.ncpdpId} />
        <TextInputField label="NPI" value={pharmacy.npi} />
        <TextInputField label="Status" value={pharmacy.resourceStatus} />
        <TextInputField label="Can Dispense" value={pharmacy.resourceStatus} />
        <TextInputField
          label="Address 1"
          value={pharmacy.contactDetails?.addresses?.[0]?.street1}
        />
        <TextInputField
          label="Address 2"
          value={pharmacy.contactDetails?.addresses?.[0]?.street2 ?? ''}
        />
        <TextInputField
          label="City"
          value={pharmacy.contactDetails?.addresses?.[0]?.city}
        />
        <TextInputField
          label="State"
          value={pharmacy.contactDetails?.addresses?.[0]?.state}
        />
        <TextInputField
          label="Zip"
          value={pharmacy.contactDetails?.addresses?.[0]?.postalCode}
        />
        <TextInputField
          label="Postal+4"
          value={pharmacy.contactDetails?.addresses?.[0]?.postalPlus4Code ?? ''}
        />
        <TextInputField
          label="Primary Phone"
          value={getMaskedPhoneNumber(
            pharmacy.contactDetails?.phoneNumbers?.[0]?.number,
          )}
          width="w-[300px]"
        />
        <TextInputField
          label="Fax"
          value={getMaskedPhoneNumber(
            pharmacy.contactDetails?.phoneNumbers?.[0]?.number,
          )}
          width="w-[300px]"
        />
        <TextInputField
          label="Active Start Date"
          value={formatDate(pharmacy.enabledDateFrom) || ''}
        />
        <TextInputField
          label="Active End Date"
          value={formatDate(pharmacy.enabledDateTo) || ''}
        />
      </Flex>
    </Box>
  )
}

export { PharmacyDetailsGeneralInformationSection }
