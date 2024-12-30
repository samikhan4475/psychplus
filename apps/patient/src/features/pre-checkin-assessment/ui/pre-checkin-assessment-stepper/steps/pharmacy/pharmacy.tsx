'user client'

import React, { useState } from 'react'
import { Flex } from '@radix-ui/themes'
import AddPharmacy from './add-pharmacy/AddPharmacy'
import ViewPharmacy from './view-pharmacy/ViewPharmacy'

const Pharmacy = () => {
  const [shouldShowAddView, setShouldShowAddView] = useState(false)
  return (
    <Flex
      className="bg-white rounded-[8px] border border-[#d9e2fc] px-5 pb-9 pt-7"
      direction="column"
    >
      {shouldShowAddView ? (
        <AddPharmacy setShouldShowAddView={setShouldShowAddView} />
      ) : (
        <ViewPharmacy setShouldShowAddView={setShouldShowAddView} />
      )}
    </Flex>
  )
}

export { Pharmacy }
