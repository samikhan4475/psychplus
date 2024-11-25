import { Flex } from '@radix-ui/themes'
import { PatientVital, UnitSystem } from '@/ui/vitals'
import { AddVitalsTable as VitalsTable } from '@/ui/vitals/vitals-widget/buttons/add-vitals/add-vitals-table'
import { BlockContainer } from '../shared'

const Details = ({ data }: { data: PatientVital[] }) => {
  return (
    <BlockContainer heading="Vitals">
      {data.length > 0 && (
        <Flex className="max-w-[360px]">
          <VitalsTable data={data} unitSystem={UnitSystem.Metric} />
        </Flex>
      )}
    </BlockContainer>
  )
}

export { Details }
