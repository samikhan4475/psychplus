import { Flex, Text } from '@radix-ui/themes'
import { PlusCircleIcon, StarIcon } from 'lucide-react'
import { Recommended_Data } from '../constants'

const RecommendedDiagnosisView = () => {
  return (
    <>
      <Text className="px-2 py-1 font-bold bg-pp-bg-table-label">Recommended (10)</Text>
      <Flex direction="column" p="2" gap="2">
        {Recommended_Data.map((item) => (
          <Flex gap="2" align="center" key={item.id}>
            <Flex
              align="center"
              justify="between"
              width="100%"
              className="rounded-2 border border-pp-lavender-blue bg-pp-bg-table-cell"
              px="2"
              py="1"
            >
              <Text>{item.text}</Text>
              <Flex gap="2">
                <StarIcon stroke="#0F6CBD" strokeWidth="1" />
                <PlusCircleIcon stroke="#194595" strokeWidth="2" />
              </Flex>
            </Flex>
          </Flex>
        ))}
      </Flex>
    </>
  )
}

export { RecommendedDiagnosisView }
