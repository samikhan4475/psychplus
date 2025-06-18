import { Flex, Text } from '@radix-ui/themes'
import { useWatch } from 'react-hook-form'
import { cn, formatDateOfBirth } from '@/utils'

const PatientClaimDetails = () => {
  const [patientGender, patientDateOfBirth, patientAccountNumber] = useWatch({
    name: ['patientGender', 'patientDateOfBirth', 'patientAccountNumber'],
  })
  if (!patientGender && !patientDateOfBirth && !patientAccountNumber)
    return null
  return (
    <Flex className="bg-pp-header-bg mt-3 gap-9 rounded-[5px] p-2">
      <LabelAndValue label="MRN" value={patientAccountNumber} />
      <LabelAndValue
        label="DOB"
        value={formatDateOfBirth(patientDateOfBirth)}
      />
      <LabelAndValue label="Gender" value={patientGender} />
    </Flex>
  )
}

interface LabelAndValueProps {
  label: string
  value?: string
}

const LabelAndValue = ({ label, value }: LabelAndValueProps) => (
  <Flex gap="1" className="whitespace-nowrap">
    <Text className="text-[11.5px] font-[500]">{label}</Text>
    <Text
      className={cn('text-[11.5px]', {
        'italic text-gray-9': !value,
      })}
    >
      {value ?? 'N/A'}
    </Text>
  </Flex>
)

export { PatientClaimDetails }
