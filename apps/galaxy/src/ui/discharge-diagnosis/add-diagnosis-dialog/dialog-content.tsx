import { Flex, Text } from '@radix-ui/themes'
import { DiagnosisList } from '../diagnosis-list'
import { FavouriteDiagnosis } from '../favourite-diagnosis'

const DialogContent = () => {
  return (
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
  )
}

export { DialogContent }
