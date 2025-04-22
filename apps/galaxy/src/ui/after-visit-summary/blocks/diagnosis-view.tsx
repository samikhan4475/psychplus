import React from 'react'
import { Flex, Text } from '@radix-ui/themes'
import { MoveVertical } from 'lucide-react'
import { LoadingPlaceholder } from '@/components'
import { useProviderRecommendationsStore } from '../store'

function DiagnosisView() {
  const { loadingWorkingDiagnosis, workingDiagnosisData } =
    useProviderRecommendationsStore()

  if (loadingWorkingDiagnosis) {
    return <LoadingPlaceholder className="h-full w-full p-8" />
  }

  return (
    <Flex direction="column" gap="1" className="bg-white my-2 rounded-1 p-2">
      <Text className="text-[16px] font-[600] text-accent-12">Diagnosis</Text>
      <Flex direction="column" gap="1">
        {workingDiagnosisData.length > 0 ? (
          workingDiagnosisData.map((item, index) => (
            <Flex
              key={`${item.code}-${index}`}
              className="bg-white cursor-default"
              gap="2"
              align="center"
            >
              <Text weight="medium" className="text-[11px]">
                {index + 1}.
              </Text>
              <Flex
                align="center"
                justify="between"
                width="100%"
                className="drag border-pp-focus-bg rounded-2 border"
                px="2"
                py="1"
              >
                <Flex align="center" gap="2">
                  <MoveVertical strokeWidth="1" height="18" width="18" />
                  <Text className="text-[11px]">
                    {item.code} {item.description}
                  </Text>
                </Flex>
              </Flex>
            </Flex>
          ))
        ) : (
          <Flex
            direction="column"
            gap="1"
            className="bg-white my-2 rounded-1 p-2 pb-0"
            justify="center"
            align="center"
            p="4"
          >
            <Text>No diagnosis data available</Text>
          </Flex>
        )}
      </Flex>
    </Flex>
  )
}

export { DiagnosisView }
