import { Flex } from '@radix-ui/themes'
import { BlockLabel } from '@/components'
import { Appointment } from '@/types'
import {
  PatientDischargeQuestion,
  TimeOfSpravatoBlock,
  TreatmentObservation,
  ZofranAdministratedBlock,
} from './blocks'

const MonitoringView = ({
  appointmentData,
}: {
  appointmentData: Appointment | null
}) => {
  return (
    <Flex direction="column" gap="2">
      <BlockLabel className="text-3 font-[600]">Monitoring</BlockLabel>
      <ZofranAdministratedBlock appointmentData={appointmentData} />
      <TimeOfSpravatoBlock />
      <PatientDischargeQuestion />
      <TreatmentObservation />
    </Flex>
  )
}

export { MonitoringView }
