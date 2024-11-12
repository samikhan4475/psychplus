import { Flex } from '@radix-ui/themes'
import { BlockLabel } from '@/components'
import {
  OnSiteREMCertifiedTechnician,
  PatientDischargeQuestion,
  TimeOfSpravatoBlock,
  TreatmentObservation,
  ZofranAdministratedBlock,
} from './blocks'

const MonitoringView = () => {
  return (
    <Flex direction="column" gap="2">
      <BlockLabel className="text-3 font-[600]">Monitoring</BlockLabel>
      <OnSiteREMCertifiedTechnician />
      <ZofranAdministratedBlock />
      <TimeOfSpravatoBlock />
      <PatientDischargeQuestion />
      <TreatmentObservation />
    </Flex>
  )
}

export { MonitoringView }
