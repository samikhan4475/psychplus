'use client'

import { Flex, Text } from '@radix-ui/themes'
import { WidgetAddButton } from '@/components'
import { DiagnosisList } from '../diagnosis-list'
import { FavouriteDiagnosis } from '../favourite-diagnosis'
import { DiagnosisSaveButton, SearchDiagnosisField } from '../shared'

const AddDiagnosisDialog = () => {
  return (
    <WidgetAddButton title="Add Diagnosis">
      <Flex
        justify="between"
        align="center"
        p="2"
        className="bg-white border border-gray-5"
        gap="2"
      >
        <SearchDiagnosisField />
        <DiagnosisSaveButton />
      </Flex>
      <Flex className="bg-whiteA-12" gap="2">
        <Flex width="70%" direction="column">
          <Text className="bg-pp-bg-table-label px-2 py-1 font-bold">
            Working Discharge Diagnosis
          </Text>
          <DiagnosisList />
        </Flex>
        <Flex width="30%" direction="column">
          <FavouriteDiagnosis />
        </Flex>
      </Flex>
    </WidgetAddButton>
  )
}

export { AddDiagnosisDialog }
