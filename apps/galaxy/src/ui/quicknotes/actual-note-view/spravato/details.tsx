'use client'

import { Flex, Separator } from '@radix-ui/themes'
import { SpravatoWidgetSchemaType } from '@/ui/procedures/spravato-tab/spravato-widget-schema'
import { BlockContainer, LabelAndValue } from '../shared'
import { AdverseReaction } from './adverse-reaction'
import { DischargePlan } from './discharge-plan'
import { Monitoring } from './monitoring'
import { PrecautionAndWarning } from './precaution-and-warning'
import { SpravatoListView } from './spravato-list-view'
import { VitalSigns } from './vital-signs'

interface Props<T> {
  data: T
}

const Details = ({ data }: Props<SpravatoWidgetSchemaType>) => {
  return (
    <BlockContainer heading="Spravato">
      <LabelAndValue label="Title:" value="Psychiatric Evaluation" />
      <LabelAndValue label="Visit Type:" value="Spravato" />
      <LabelAndValue label="Provider Type:" value="Therapy" />
      <LabelAndValue label="Provider:" value="DR, John Smith" />
      <LabelAndValue label="Location:" value="Willow Brooks" />
      <LabelAndValue label="Service:" value="Group Therapy" />
      <LabelAndValue label="Date:" value="11/22/24" />
      <LabelAndValue label="Time:" value="00:00" />
      <LabelAndValue label="Duration:" value="20 mins" />
      <LabelAndValue label="Patient:" value="Ross Galler" />
      <LabelAndValue label="DOB:" value="11/21/2024" />
      <LabelAndValue label="Cosigner:" value="Dr, Parmeet" />
      <LabelAndValue label="Visit #:" value="0000198" />
      <Separator className="my-3 w-full" />
      <Flex direction="column" gap="3">
        <SpravatoListView data={data} label="Dosing" />
        <PrecautionAndWarning data={data} />
        <Separator className="my-3 w-full" />
        <Monitoring data={data} />
        <Separator className="my-3 w-full" />
        <VitalSigns data={data} />
        <AdverseReaction data={data} />
        <Separator className="my-3 w-full" />
        <DischargePlan data={data} />
      </Flex>
    </BlockContainer>
  )
}

export { Details }
