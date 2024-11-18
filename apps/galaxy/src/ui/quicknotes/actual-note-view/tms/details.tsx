import { Separator } from '@radix-ui/themes'
import { TmsWidgetSchemaType } from '@/ui/procedures/tms-tab/tms-widget-schema'
import { BlockContainer, LabelAndValue } from '../shared'
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
}

const Details = ({ data }: Props<TmsWidgetSchemaType>) => {
  return (
    <BlockContainer heading="TMS">
      <LabelAndValue label="Title:" value="Psychiatric Evaluation" />
      <LabelAndValue label="Visit Type:" value="Outpatient Office Visit" />
      <LabelAndValue label="Provider Type:" value="Therapy" />
      <LabelAndValue label="Provider:" value="John Smith, MD" />
      <LabelAndValue label="Location:" value="Willow Brooks" />
      <LabelAndValue label="Service:" value="Willow Brooks" />
      <LabelAndValue label="Date:" value="11/22/24" />
      <LabelAndValue label="Duration:" value="20 mins" />
      <LabelAndValue label="Patient:" value="Ross Galler" />
      <LabelAndValue label="DOB:" value="11/21/2024" />
      <LabelAndValue label="Cosigner:" value="John Smith, MD" />
      <LabelAndValue label="Visit #:" value="0000198" />
      <Separator className="my-3 w-full" />
      <TreatmentSection data={data} />
      <PrecautionsSection data={data} />
      <MotorThresholdSection data={data} />
      <CurrentTreatmentSection data={data} />
      <TreatmentObservationSection data={data} />
      <MonitoringSection data={data} />
      <DischargePlanSection data={data} />
    </BlockContainer>
  )
}

export { Details }
