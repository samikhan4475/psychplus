import React from 'react'
import { Flex, Heading, Text } from '@radix-ui/themes'
import { Appointment } from '@/types'
import { TmsWidgetSchemaType } from '@/ui/procedures/tms-tab/tms-widget-schema'
import { ProtocolTitles } from '@/ui/procedures/tms-tab/treatment-session/types'
import { getTMSSessionNumber } from '@/ui/procedures/tms-tab/utils'
import {
  DTMSProtocolSection,
  MaintenanceProtocolSection,
  SaintSection,
  StandardProtocolSection,
  ThetaBurstSimulationSection,
} from '.'
import { LabelAndValue } from '../../shared'

interface Props<T> {
  data: T
  appointment?: Appointment
}

const TreatmentSection = ({
  data,
  appointment,
}: Props<TmsWidgetSchemaType>) => {
  const renderProtocolSection = {
    [ProtocolTitles.StandardProtocol]: <StandardProtocolSection />,
    [ProtocolTitles.AcceleratedProtocol]: <SaintSection />,
    [ProtocolTitles.MaintenanceProtocol]: (
      <MaintenanceProtocolSection
        frequencyOfSessions={`${data.frequencyOfSession}/${data.frequencyUnit}`}
        noOfPlannedSessions={data.plannedSession}
      />
    ),
    [ProtocolTitles.ThetaBurstStimulation]: (
      <ThetaBurstSimulationSection
        frequencyOfSessions={`${data.thetaBurstFrequencyOfSession}/${data?.frequencyUnitThetaBurst}`}
        noOfPlannedSessions={data.plannedSessionThetaBurst}
        typeOfThetaBurst={data.typeOfThetaBurst}
        duration={`${data.durationFrom} sec - ${data.durationTo}`}
        burstPattern={data.burstPattern}
        intermittentDurationFrom={data.intermittentDurationFrom}
      />
    ),
    [ProtocolTitles.DTMSProtocol]: (
      <DTMSProtocolSection
        frequencyOfSessions={`${data.dtmsFrequencyOfSession}/${data?.dtmsFrequencyUnit}`}
        noOfPlannedSessions={data.dtmsPlannedSession}
        frequency={data?.dtmsStimulationFrequency}
        interTrainInterval={data?.dtmsStimulationInterTrainInterval}
        pulseTrainDuration={data?.dtmsStimulationPulseTrainDuration}
      />
    ),
  }
  const tmsSessionNo = getTMSSessionNumber(appointment)
  return (
    <Flex direction={'column'}>
      <Heading size="3" className="my-1">
        Treatment Session
      </Heading>
      <LabelAndValue label="TMS Session No:" value={tmsSessionNo} />
      <LabelAndValue label="Protocol Used:" value={data.protocol} />
      <Text className="text-2 font-medium">{data.protocol}:</Text>
      {renderProtocolSection[data.protocol as ProtocolTitles]}
    </Flex>
  )
}

export { TreatmentSection }
