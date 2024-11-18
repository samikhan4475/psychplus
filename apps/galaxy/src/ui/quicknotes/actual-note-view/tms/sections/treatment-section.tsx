import React from 'react'
import { Flex, Heading, Text } from '@radix-ui/themes'
import { TmsWidgetSchemaType } from '@/ui/procedures/tms-tab/tms-widget-schema'
import { ProtocolTitles } from '@/ui/procedures/tms-tab/treatment-session/types'
import {
  MaintenanceProtocolSection,
  SaintSection,
  StandardProtocolSection,
  ThetaBurstSimulationSection,
} from '.'
import { LabelAndValue } from '../../shared'

interface Props<T> {
  data: T
}

const TreatmentSection = ({ data }: Props<TmsWidgetSchemaType>) => {
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
        frequencyOfSessions={`${data.frequencyOfSession}/${data.frequencyUnit}`}
        noOfPlannedSessions={data.plannedSession}
        typeOfThetaBurst={data.typeOfThetaBurst}
        duration={`${data.durationFrom} - ${data.durationTo}`}
        burstPattern={data.burstPattern}
      />
    ),
  }
  return (
    <Flex direction={'column'}>
      <Heading size="3" className="my-1">
        Treatment Session
      </Heading>
      <LabelAndValue label="TMS Session No:" value={data.tmdSessionNo} />
      <LabelAndValue label="Protocol Used:" value={data.protocol} />
      <Text className="text-2 font-medium">{data.protocol}:</Text>
      {renderProtocolSection[data.protocol as ProtocolTitles]}
    </Flex>
  )
}

export { TreatmentSection }
