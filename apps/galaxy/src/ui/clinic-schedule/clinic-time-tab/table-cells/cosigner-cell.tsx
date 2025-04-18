import { Flex } from '@radix-ui/themes'
import { LongTextCell, PropsWithRow } from '@/components'
import { ClinicSchedule } from '../types'

const CosignerCell = ({
  row: { original: clinicTime },
}: PropsWithRow<ClinicSchedule>) => {
  return (
    <Flex align="center" gapX="1">
      <LongTextCell className="min-w-32">
        {clinicTime.cosignerName}
      </LongTextCell>
    </Flex>
  )
}

export { CosignerCell }
