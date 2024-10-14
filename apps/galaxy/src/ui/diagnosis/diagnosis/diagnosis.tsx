'use client'

import { Flex, Text } from '@radix-ui/themes'
import { DiagnosisWidget } from './diagnosis-widget'
import { SearchDiagnosis } from './diagnosis-widget/search-diagnosis'

interface DiagnosisProps {
  recommended: boolean
  patientId: string
}

const Diagnosis = ({ recommended, patientId }: DiagnosisProps) => {
  return (
    <>
      <Flex
        align="center"
        p="2"
        className="bg-white -mt-[1px] border border-gray-5"
        gap="2"
      >
        <Text className="text-[16px] font-[600]">Diagnosis</Text>
        <SearchDiagnosis patientId={patientId} />
      </Flex>
      <DiagnosisWidget patientId={patientId} recommended={recommended} />
    </>
  )
}

export { Diagnosis }
