'use client'

import React from 'react'
import { Box, Flex, Text } from '@radix-ui/themes'
import { getMaskedPhoneNumber } from '@/utils'
import { Prescription } from '../../types'
import { ReviewLabel } from '../shared'

interface ReviewPharmacyInformationProps {
  prescriptions?: Prescription[]
}
const ReviewPharmacyInformation = ({
  prescriptions,
}: ReviewPharmacyInformationProps) => {
  const prescriptionsPhone = prescriptions?.[0]?.pharmacyPhone
  const prescriptionsName = prescriptions?.[0]?.prescriptionPharmacyName
  const prescriptionAddress = `${prescriptions?.[0]?.pharmacyAddress?.street1} ${prescriptions?.[0]?.pharmacyAddress?.city} ${prescriptions?.[0]?.pharmacyAddress?.state} ${prescriptions?.[0]?.pharmacyAddress?.country}`
  const prescriptionFax = prescriptions?.[0]?.pharmacyFax

  return (
    <Flex direction="column" className="overflow-hidden rounded-2 shadow-3">
      <Box className="bg-pp-bg-accent px-2 py-0.5">
        <Text size="2" weight="medium">
          Pharmacy Information
        </Text>
      </Box>
      <Flex gap="3" className="px-3 py-2" direction="column" wrap="wrap">
        <ReviewLabel title="Pharmacy" value={prescriptionsName} />
        <ReviewLabel title="Address" value={prescriptionAddress} />
        <Flex gap="3" direction="row">
          <ReviewLabel
            title="Phone"
            value={getMaskedPhoneNumber(prescriptionsPhone ?? '')}
          />
          <ReviewLabel
            title="Fax"
            value={getMaskedPhoneNumber(prescriptionFax ?? '')}
          />
        </Flex>
      </Flex>
    </Flex>
  )
}

export { ReviewPharmacyInformation }
