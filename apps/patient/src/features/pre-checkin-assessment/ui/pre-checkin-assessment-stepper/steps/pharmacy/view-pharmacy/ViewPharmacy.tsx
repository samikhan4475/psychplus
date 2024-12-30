import React from 'react'
import { Flex, Text } from '@radix-ui/themes'
import AddButton from '../../../shared-blocks/add-button'
import PharmacyTableBlock from './blocks/pharmacy-table-block'

type ViewPharmacyProps = {
  setShouldShowAddView: (value: boolean) => void
}

const ViewPharmacy = ({ setShouldShowAddView }: ViewPharmacyProps) => {
  return (
    <Flex gap="5" direction="column">
      <Flex className="w-full" justify={'between'} align={'center'}>
        <Text className="text-[24px] font-medium">Pharmacy</Text>
        <AddButton
          label="Add New Pharmacy"
          onClick={() => setShouldShowAddView(true)}
        />
      </Flex>
      <PharmacyTableBlock />
    </Flex>
  )
}

export default ViewPharmacy
