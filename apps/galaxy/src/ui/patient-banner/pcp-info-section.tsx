import { Text } from '@radix-ui/themes'
import { getUserFullName } from '@/utils'
import { getPcpInfoAction } from './actions'
import { LabelAndValue } from './label-and-value'

interface PatientBannerProps {
  patientId: string
}

const PcpInfoSection = async ({ patientId }: PatientBannerProps) => {
  const response = await getPcpInfoAction(patientId)
  if (response.state === 'error') {
    return <Text>{response.error}</Text>
  }

  const pcpInfo = response.data[response.data.length - 1]

  return (
    <LabelAndValue
      label="PCP"
      value={
        pcpInfo
          ? getUserFullName(pcpInfo.externalProvider.legalName)
          : undefined
      }
    />
  )
}

export { PcpInfoSection }
