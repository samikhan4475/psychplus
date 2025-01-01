import { Appointment } from '@/types'
import { TimedVisitStatusSelect } from '../shared/table-cells'

const VisitStatusDropdown = ({ appointment }: { appointment: Appointment }) => {
  return (
    <TimedVisitStatusSelect
      appointment={appointment}
      className="bg-pp-warning-bg !text-pp-warning-text h-4 w-[116px] rounded-[4px] px-1.5 text-[12px] text-gray-12"
    />
  )
}

export { VisitStatusDropdown }

/* <Select.Root defaultValue={value} size="1">
<Select.Trigger
  placeholder="Select"
  className="bg-pp-warning-bg text-pp-warning-text h-4 w-[116px] rounded-[4px] px-1.5 text-[12px] text-gray-12"
/>
<Select.Content position="popper" align="center" highContrast>
  {items}
</Select.Content>
</Select.Root> */
