'use client'

import { Flex } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { BlockLabel } from '@/components'
import { ProtocolTitles } from '../types'
import {
  AcceleratedProtocol,
  DTMSProtocol,
  MaintenanceProtocol,
  ProtocolSelection,
  StandardProtocol,
  ThetaBurstSimulation,
} from './blocks'

const ProtocolsViews: {
  [key: string]: () => JSX.Element
} = {
  [ProtocolTitles.StandardProtocol]: StandardProtocol,
  [ProtocolTitles.AcceleratedProtocol]: AcceleratedProtocol,
  [ProtocolTitles.DTMSProtocol]: DTMSProtocol,
  [ProtocolTitles.MaintenanceProtocol]: MaintenanceProtocol,
  [ProtocolTitles.ThetaBurstStimulation]: ThetaBurstSimulation,
}

const ProtocolUsed = () => {
  const form = useFormContext()

  const selected = form.watch('protocol')

  const SelectedProtocolView = ProtocolsViews[selected]

  return (
    <Flex direction="column" gap="2">
      <BlockLabel className="text-2 font-[600]">Protocol UsedSSS</BlockLabel>
      <Flex direction="row" gap="1">
        {Object.values(ProtocolTitles).map((item) => (
          <ProtocolSelection key={item} protocolTitle={item} />
        ))}
      </Flex>
      <Flex
        gap="1"
        className="border-pp-grey rounded-2 border border-solid p-2"
        direction="column"
      >
        <SelectedProtocolView />
      </Flex>
    </Flex>
  )
}

export { ProtocolUsed }
