import { Flex, Text } from '@radix-ui/themes'
import { Claim } from '@/types'
import { cn, getPatientDOB } from '@/utils'

interface LinkClaimHeaderProps {
  data: Claim
}

const LinkClaimHeader = ({ data }: LinkClaimHeaderProps) => {
  const {
    claimNumber,
    patientName,
    patientAccountNumber,
    patientDateOfBirth,
    patientGender,
  } = data
  return (
    <Flex className="bg-pp-header-bg mt-3 gap-9 rounded-[5px] p-2">
      <LabelAndValue label="Claim Number" value={claimNumber} />
      <LabelAndValue label="Patient Name" value={patientName} />
      <LabelAndValue label="MRN" value={patientAccountNumber} />
      <LabelAndValue label="DOB" value={getPatientDOB(patientDateOfBirth)}/>
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

export { LinkClaimHeader }
