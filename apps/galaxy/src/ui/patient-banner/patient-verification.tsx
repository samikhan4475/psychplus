import { Flex, Text } from '@radix-ui/themes'
import { PatientProfile } from '@/types'

const colors: Record<string, string> = {
  Pending: 'pp-blue',
  Verified: 'pp-states-success',
  Unverifiable: 'pp-states-error',
  Active: 'pp-states-success',
}

interface PatientVerificationProps {
  patientVerifications: PatientProfile
}

const PatientVerification = ({
  patientVerifications,
}: PatientVerificationProps) => {
  const { verificationStatus, patientConsent, creditCardVerificationStatus } =
    patientVerifications

  const verificationFields: { label: string; status?: string }[] = [
    { label: 'Profile', status: verificationStatus },
    { label: 'Policy', status: patientConsent },
    { label: 'Credit', status: creditCardVerificationStatus },
  ]

  const getColor = (status?: string) =>
    colors[status || 'Unverifiable'] || 'pp-states-error'

  return (
    <Flex gap="1" className="whitespace-nowrap">
      <Text className="text-[11.5px] font-[600]">Verify</Text>
      <Flex gap="1" align="center">
        {verificationFields.map(({ label, status }) => (
          <Flex key={label} align="center" gap="2px">
            <Text className={`text-[11.5px] text-${getColor(status)}`}>
              {label}
            </Text>
          </Flex>
        ))}
      </Flex>
    </Flex>
  )
}

export { PatientVerification }
