import { Flex } from '@radix-ui/themes'
import { PatientVital, UnitSystem } from '@/ui/vitals'
import { AddVitalsTable as VitalsTable } from '@/ui/vitals/vitals-widget/buttons/add-vitals/add-vitals-table'
import { BlockContainer } from '../shared'

const Details = ({
  data,
  className,
}: {
  data: PatientVital[]
  className?: string
}) => {
  return (
    <BlockContainer heading="Vitals">
      {data.length > 0 && (
        <Flex className={className}>
          <VitalsTable data={data} unitSystem={UnitSystem.Metric} />
        </Flex>
      )}
    </BlockContainer>
  )
}

export { Details }
