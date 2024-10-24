import { Flex, Text } from '@radix-ui/themes'
import { FavoriteView } from './favorite-view'
import { RecommendedDiagnosisView } from './recommended-diagnosis-view'
import { WorkingDiagnosisView } from './working-diagnosis-view'

interface DiagnosisWidgetProps {
  patientId: string
  recommended?: boolean
}

const DiagnosisWidget = ({ patientId, recommended }: DiagnosisWidgetProps) => {
  return (
    <Flex className="bg-whiteA-12" gap="2">
      <Flex width="70%" direction="column">
        <Text className="bg-pp-bg-table-label px-2 py-1 font-bold">
          Working Diagnosis
        </Text>
        <WorkingDiagnosisView patientId={patientId} />
        {recommended && <RecommendedDiagnosisView />}
      </Flex>
      <Flex width="30%" direction="column">
        <FavoriteView />
      </Flex>
    </Flex>
  )
}

export { DiagnosisWidget }
