import React from 'react'
import { Flex } from '@radix-ui/themes'
import {
  ABSTRACTION,
  ATTENTION,
  DELAYED_RECALL,
  DELAYED_RECALL_HEADING,
  LABELS,
  LANGUAGE,
  MEMORY,
  MEMORY_HEADING,
  MEMORY_HEADING_LABELS,
  MEMORY_LABELS,
  NAMING,
  ORIENTATION,
  ORIENTATION_HEADING,
  ORIENTATION_LABELS,
  VISUOSPATIAL_EXECUTIVE,
} from './constants'
import { MocaTable } from './moca-table'
import { MocaTableToggle } from './moca-table-toggle'

const Moca = () => {
  return (
    <Flex direction="column" gap="2" className="w-full">
      <MocaTable
        labels={LABELS}
        data={[...VISUOSPATIAL_EXECUTIVE, ...NAMING]}
        questionsPerRow={3}
      />
      <MocaTableToggle
        title="Memory"
        headingLabels={MEMORY_HEADING_LABELS}
        labels={MEMORY_LABELS}
        data={MEMORY}
        heading={MEMORY_HEADING}
      />
      <MocaTable data={[...ATTENTION, ...LANGUAGE]} questionsPerRow={2} />
      <MocaTable data={ABSTRACTION} questionsPerRow={2} />
      <MocaTableToggle
        title="Delayed recall"
        labels={MEMORY_LABELS}
        data={DELAYED_RECALL}
        heading={DELAYED_RECALL_HEADING}
      />
      <MocaTableToggle
        title="Orientation"
        labels={ORIENTATION_LABELS}
        data={ORIENTATION}
        heading={ORIENTATION_HEADING}
      />
    </Flex>
  )
}

export { Moca }
