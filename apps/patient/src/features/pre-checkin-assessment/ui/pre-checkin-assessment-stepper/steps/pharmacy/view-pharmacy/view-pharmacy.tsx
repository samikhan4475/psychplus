import React from 'react'
import { Flex, Text } from '@radix-ui/themes'
import { PatientPharmacy } from '@/features/pharmacy/types'
import AddButton from '../../../shared-blocks/add-button'
import { PharmacyTableBlock } from './blocks'

type ViewPharmacyProps = {
  toggleAddPharmacyForm: () => void
  pharmacies: PatientPharmacy[]
  isDawSystemFeatureFlagEnabled?: boolean
}

const ViewPharmacy = ({
  toggleAddPharmacyForm,
  pharmacies,
  isDawSystemFeatureFlagEnabled,
}: ViewPharmacyProps) => {
  return (
    <Flex gap="5" direction="column">
      <Flex className="w-full" justify="between" align="center">
        <Text className="text-[24px] font-medium">Pharmacy</Text>
        {!isDawSystemFeatureFlagEnabled && (
          <AddButton label="Add New Pharmacy" onClick={toggleAddPharmacyForm} />
        )}
      </Flex>

      <PharmacyTableBlock
        pharmacies={pharmacies}
        isDawSystemFeatureFlagEnabled={isDawSystemFeatureFlagEnabled}
      />
    </Flex>
  )
}

export { ViewPharmacy }
