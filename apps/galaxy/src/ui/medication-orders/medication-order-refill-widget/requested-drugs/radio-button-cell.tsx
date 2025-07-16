import * as RadixRadioGroup from '@radix-ui/react-radio-group'
import { Flex } from '@radix-ui/themes'
import { Row } from '@tanstack/react-table'
import { Patient } from '@/ui/patient-lookup/types'
import { useStore } from '../store'
import { PharmacyNotificationDrugModel } from '../types'

interface TableRowRadioCellProps {
  row: Row<PharmacyNotificationDrugModel>
  onSelect: (data: PharmacyNotificationDrugModel) => void
  selectedDrugId?: string
}

const TableRowRadioCell = ({
  row,
  onSelect,
  selectedDrugId,
}: TableRowRadioCellProps) => {
  const isChecked = selectedDrugId === row.original.id
  const handleChange = () => {
    onSelect(row.original)
  }

  return (
    <Flex justify="between" align="center">
      <RadixRadioGroup.Root
        value={isChecked ? 'yes' : ''}
        onValueChange={handleChange}
        className="flex items-center gap-1.5"
      >
        <RadixRadioGroup.Item
          className="rounded-full flex h-[12px] w-[12px] items-center justify-center border border-gray-9 data-[state=checked]:bg-blue-11"
          value="yes"
          id={row.id}
        >
          <RadixRadioGroup.Indicator className="after:bg-white after:rounded-full flex h-full w-full items-center justify-center after:block after:h-[4px] after:w-[4px] after:content-['']" />
        </RadixRadioGroup.Item>
      </RadixRadioGroup.Root>
    </Flex>
  )
}

export { TableRowRadioCell }
