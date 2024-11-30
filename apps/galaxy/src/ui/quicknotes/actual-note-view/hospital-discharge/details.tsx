import { Flex, Separator } from '@radix-ui/themes'

import { BlockContainer, LabelAndValue } from '../shared'
import { HospitalDischargeWidgetSchemaType } from '@/ui/hospital/hospital-discharge-widget/hospital-discharge-widget-schema'
import HospitalDischargeListView from './hospital-discharge-list-view'
import { hospitalDischargeKeys } from '@/ui/hospital/hospital-discharge-widget/data'

interface Props<T> {
  data: T
}

const Details = ({ data }: Props<HospitalDischargeWidgetSchemaType>) => {
  return (
    <BlockContainer heading="Hospital Discharge">
      <Separator className="my-3 w-full" />
      <Flex direction="column" gap="3">
        <HospitalDischargeListView keys={hospitalDischargeKeys} data={data} />
      </Flex>
    </BlockContainer>
  )
}

export { Details }
