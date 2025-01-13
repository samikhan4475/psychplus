'use client'

import { Flex, Text } from '@radix-ui/themes'
import { DiagnosisWidget } from './diagnosis-widget'
import { DiagnosisSaveButton } from './diagnosis-widget/diagnosis-save-button'
import { SearchDiagnosis } from './diagnosis-widget/search-diagnosis'


const Diagnosis = () => {
  return (
    <>
      <Flex
        justify="between"
        align="center"
        p="2"
        className="bg-white -mt-[1px] border border-gray-5"
        gap="2"
      >
        <Flex gap="2">
          <Text className="text-[16px] font-[600]">Working Diagnosis</Text>
          <SearchDiagnosis />
        </Flex>
        <DiagnosisSaveButton />
      </Flex>
      <DiagnosisWidget />
    </>
  )
}

export { Diagnosis }
