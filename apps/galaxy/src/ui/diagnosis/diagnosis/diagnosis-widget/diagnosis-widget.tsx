import { Flex, Text } from '@radix-ui/themes'
import { FavoriteView } from './favorite-view'
import { WorkingDiagnosisView } from './working-diagnosis-view'

const DiagnosisWidget = () => {
  return (
    <Flex className="bg-whiteA-12" gap="2">
      <Flex width="70%" direction="column">
        <Text className="bg-pp-bg-table-label px-2 py-1 font-bold">
          Working Diagnosis
        </Text>
        <WorkingDiagnosisView />
      </Flex>
      <Flex width="30%" direction="column">
        <FavoriteView />
      </Flex>
    </Flex>
  )
}

export { DiagnosisWidget }
