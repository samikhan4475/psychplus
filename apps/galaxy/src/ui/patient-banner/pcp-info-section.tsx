import { getUserFullName } from '@/utils'
import { LabelAndValue } from './label-and-value'
import { ExternalProviderDetail } from '../pcp'

interface PcpInfoSectionProps {
  pcp: ExternalProviderDetail
}

const PcpInfoSection = ({ pcp }: PcpInfoSectionProps) => {
  return (
    <LabelAndValue
      label="PCP"
      value={
        pcp ? getUserFullName(pcp.externalProvider.legalName) : undefined
      }
    />
  )
}

export { PcpInfoSection }
