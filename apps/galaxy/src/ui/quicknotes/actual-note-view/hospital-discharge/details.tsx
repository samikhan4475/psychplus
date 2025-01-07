import { Flex } from '@radix-ui/themes'

import { BlockContainer } from '../shared'
import { HospitalDischargeWidgetSchemaType } from '@/ui/hospital/hospital-discharge-widget/hospital-discharge-widget-schema'
import HospitalDischargeListView from './hospital-discharge-list-view'
import { hospitalDischargeKeys } from '@/ui/hospital/hospital-discharge-widget/data'
import { sortByMapping } from '../hospital-initial/utils'
import { HospitalInitialPrefixes } from '@/ui/hospital/hospital-initial-widget/constants'

interface Props<T> {
  data: T
}

const Details = ({ data }: Props<HospitalDischargeWidgetSchemaType>) => {
  const sortedStrengths = sortByMapping(
    HospitalInitialPrefixes.STRENGTHS,
    data.strengths,
  )
  const sortedLiabilities = sortByMapping(
    HospitalInitialPrefixes.LIABILITIES,
    data.liabilites,
  )

  return (
    <BlockContainer heading="Hospital Discharge">
      <Flex direction="column" gap="3">
        <HospitalDischargeListView
          keys={hospitalDischargeKeys}
          data={{
            ...data,
            strengths: sortedStrengths,
            liabilites: sortedLiabilities,
          }}
        />
      </Flex>
    </BlockContainer>
  )
}

export { Details }
