import { Flex, Text } from '@radix-ui/themes'
import { CloseIcon, QuestionIcon, TickIcon } from '@/components/icons'
import { PatientProfile } from '@/types'

const icons: Record<string, JSX.Element> = {
  Pending: <QuestionIcon height={11} width={11} />,
  Verified: <TickIcon height={11} width={11} />,
  Unverifiable: <CloseIcon height={11} width={11} />,
  Active: <TickIcon height={11} width={11} />,
}

interface PatientVerificationProps {
  patientVerifications: PatientProfile
}

const PatientVerification = ({
  patientVerifications,
}: PatientVerificationProps) => {
  const {
    verificationStatus,
    patientConsent,
    insuranceVerification,
    creditCardVerificationStatus,
  } = patientVerifications

  const verificationFields: { label: string; status?: string }[] = [
    { label: 'P', status: verificationStatus },
    { label: 'I', status: insuranceVerification },
    { label: 'P&C', status: patientConsent },
    { label: 'CC', status: creditCardVerificationStatus },
  ]

  const getIcon = (status?: string) =>
    icons[status || 'Unverifiable'] || <CloseIcon height={11} width={11} />

  return (
    <Flex gap="1" className="whitespace-nowrap">
      <Text className="text-[11.5px] font-[600]">Verify</Text>
      <Flex gap="1" align="center">
        {verificationFields.map(({ label, status }) => (
          <Flex key={label} align="center" gap="2px">
            <Text className="text-[11.5px]">{label}</Text>
            {getIcon(status)}
          </Flex>
        ))}
      </Flex>
    </Flex>
  )
}

export { PatientVerification }
