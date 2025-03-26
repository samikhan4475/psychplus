import { useEffect, useState } from 'react'
import { ExternalProviderDetail } from '@/ui/pcp'
import { getUserFullName } from '@/utils'
import { getPcpInfoAction } from '../../actions'
import { LabelAndValue } from './label-and-value'

interface PatientCardPCPSection {
  patientId: string
}

const PatientCardPCPSection = ({ patientId }: PatientCardPCPSection) => {
  const [pcpResponse, setPcpResponse] = useState<ExternalProviderDetail>()

  const fetchPatientPCPDetails = async () => {
    const pcp = await getPcpInfoAction(patientId)
    if (pcp.state === 'success') {
      const filterPatientPCP = pcp?.data?.find(
        (item: ExternalProviderDetail) =>
          item.patientId.toString() === patientId,
      )

      setPcpResponse(filterPatientPCP)
    }
  }
  useEffect(() => {
    fetchPatientPCPDetails()
  }, [patientId])

  return (
    <LabelAndValue
      label="PCP"
      value={
        pcpResponse
          ? getUserFullName(pcpResponse.externalProvider.legalName)
          : undefined
      }
    />
  )
}

export { PatientCardPCPSection }
