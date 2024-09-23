import { Flex, Select } from '@radix-ui/themes'
import { PropsWithRow } from '@/components'
import { CODESETS } from '@/constants'
import { useCodesetCodes } from '@/hooks'
import { BookedAppointment } from '../../types/schedule'

const VisitSequenceSelectCell = ({
  row: { original: appointment },
}: PropsWithRow<BookedAppointment>) => {
  const codes = useCodesetCodes(CODESETS.VisitSequence)
  const items = codes.map((code) => (
    <Select.Item key={code.value} value={code.value}>
      {code.display}
    </Select.Item>
  ))
  return (
    <Flex p="1" width="100%">
      <Select.Root defaultValue={appointment.visitSequence} size="1">
        <Select.Trigger placeholder="Select" className="w-full text-gray-12" />
        <Select.Content position="popper" align="center" highContrast>
          {items}
        </Select.Content>
      </Select.Root>
    </Flex>
  )
}

export { VisitSequenceSelectCell }
