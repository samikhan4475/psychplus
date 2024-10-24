import { Flex, Text } from '@radix-ui/themes'
import { PlusCircleIcon, StarIcon } from 'lucide-react'
import { Recommended_Data } from '../constants'

const RecommendedDiagnosisView = () => {
  return (
    <>
      <Text className="bg-pp-bg-table-label px-2 py-1 font-bold">
        Recommended (10)
      </Text>
      <Flex direction="column" p="2" gap="2">
        {Recommended_Data.map((item) => (
          <Flex gap="2" align="center" key={item.id}>
            <Flex
              align="center"
              justify="between"
              width="100%"
              className="border-pp-lavender-blue bg-pp-bg-table-cell rounded-2 border"
              px="2"
              py="1"
            >
              <Text className="text-[11px]">{item.text}</Text>
              <Flex gap="2" align="center">
                <StarIcon
                  stroke="#0F6CBD"
                  strokeWidth="1"
                  height="15"
                  width="15"
                />
                <PlusCircleIcon
                  stroke="#194595"
                  strokeWidth="2"
                  height="15"
                  width="15"
                />
              </Flex>
            </Flex>
          </Flex>
        ))}
      </Flex>
    </>
  )
}

export { RecommendedDiagnosisView }
