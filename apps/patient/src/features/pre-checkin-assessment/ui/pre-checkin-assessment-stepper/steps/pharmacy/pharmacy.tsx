'user client'

import React, { useState } from 'react'
import { Flex } from '@radix-ui/themes'
import { type PatientPharmacy } from '@/features/pharmacy/types'
import { AddPharmacy } from './add-pharmacy'
import { ViewPharmacy } from './view-pharmacy'

const Pharmacy = ({
  pharmacies,
  isDawSystemFeatureFlagEnabled,
}: {
  pharmacies: PatientPharmacy[]
  isDawSystemFeatureFlagEnabled?: boolean
}) => {
  const [shouldShowAddView, setShouldShowAddView] = useState(false)
  const toggleAddPharmacyForm = () => setShouldShowAddView((prev) => !prev)

  return (
    <Flex
      className="bg-white rounded-[8px] border border-[#d9e2fc] px-5 pb-9 pt-7"
      direction="column"
    >
      {shouldShowAddView ? (
        <AddPharmacy
          pharmacies={pharmacies}
          toggleAddPharmacyForm={toggleAddPharmacyForm}
        />
      ) : (
        <ViewPharmacy
          pharmacies={pharmacies}
          toggleAddPharmacyForm={toggleAddPharmacyForm}
          isDawSystemFeatureFlagEnabled={isDawSystemFeatureFlagEnabled}
        />
      )}
    </Flex>
  )
}

export { Pharmacy }
