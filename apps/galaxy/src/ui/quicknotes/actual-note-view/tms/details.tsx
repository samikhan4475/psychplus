import { Appointment } from '@/types'
import { TmsWidgetSchemaType } from '@/ui/procedures/tms-tab/tms-widget-schema'
import { BlockContainer } from '../shared'
import {
  CurrentTreatmentSection,
  DischargePlanSection,
  MonitoringSection,
  MotorThresholdSection,
  PrecautionsSection,
  TreatmentObservationSection,
  TreatmentSection,
} from './sections'

interface Props<T> {
  data: T
  appointment?: Appointment
  patientId: string
}

const Details = ({
  data,
  appointment,
  patientId,
}: Props<TmsWidgetSchemaType>) => {
  return (
    <BlockContainer heading="TMS">
      <TreatmentSection data={data} appointment={appointment} />
      <PrecautionsSection data={data} />
      <MotorThresholdSection data={data} />
      <CurrentTreatmentSection data={data} />
      <TreatmentObservationSection data={data} patientId={patientId} />
      <MonitoringSection data={data} />
      <DischargePlanSection data={data} />
    </BlockContainer>
  )
}

export { Details }
