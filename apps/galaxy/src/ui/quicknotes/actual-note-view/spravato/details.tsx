'use client'

import { Flex, Separator } from '@radix-ui/themes'
import { Appointment } from '@/types'
import { SpravatoWidgetSchemaType } from '@/ui/procedures/spravato-tab/spravato-widget-schema'
import { BlockContainer } from '../shared'
import { AdverseReaction } from './adverse-reaction'
import { DischargePlan } from './discharge-plan'
import { Monitoring } from './monitoring'
import { PrecautionAndWarning } from './precaution-and-warning'
import { ProcurementMethod } from './procurement-method'
import { SpravatoListView } from './spravato-list-view'
import { VitalSigns } from './vital-signs'

interface Props<T> {
  data: T
  appointmentData?: Appointment
}

const Details = ({
  data,
  appointmentData,
}: Props<SpravatoWidgetSchemaType>) => {
  return (
    <BlockContainer heading="Spravato">
      <Flex direction="column" gap="3">
        <SpravatoListView
          data={data}
          label="Dosing"
          appointment={appointmentData}
        />
        <PrecautionAndWarning data={data} />
        <Separator className="my-3 w-full" />
        <Monitoring data={data} />
        <Separator className="my-3 w-full" />
        <VitalSigns data={data} />
        <AdverseReaction data={data} />
        <Separator className="my-3 w-full" />
        <DischargePlan data={data} />
        <Separator className="my-3 w-full" />
        <ProcurementMethod data={data} />
      </Flex>
    </BlockContainer>
  )
}

export { Details }
