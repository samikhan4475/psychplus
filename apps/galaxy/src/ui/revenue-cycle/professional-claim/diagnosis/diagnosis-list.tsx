import { Cross1Icon } from '@radix-ui/react-icons'
import { Box, Flex, Text } from '@radix-ui/themes'
import { ClaimDiagnosis } from '@/types'

interface DiagnosisListProps {
  claimDiagnosis: ClaimDiagnosis[]
  handleRemoveDiagnosis: (diagnosisCode: string) => void
}

const DiagnosisList: React.FC<DiagnosisListProps> = ({
  claimDiagnosis,
  handleRemoveDiagnosis,
}) => {
  const activeDiagnoses = claimDiagnosis.filter(
    (item) => item.recordStatus === 'Active',
  )

  return (
    <Flex
      align="center"
      justify="start"
      gap="2"
      mt="2"
      className="flex-row flex-wrap"
    >
      {activeDiagnoses.map((icdItem, index) => (
        <Box
          className="border-pp-icd-border bg-pp-icd-bg rounded-[20px] border-2 px-2"
          key={icdItem.diagnosisCode}
        >
          <Flex align="center" justify="center" gap="2">
            <Text>{`${index + 1}. ${icdItem.diagnosisCode}`}</Text>
            <Cross1Icon
              onClick={() => handleRemoveDiagnosis(icdItem.diagnosisCode ?? '')}
            />
          </Flex>
        </Box>
      ))}
    </Flex>
  )
}

export default DiagnosisList
