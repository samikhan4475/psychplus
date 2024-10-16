import { Select } from '@radix-ui/themes'
import { CODESETS } from '@/constants'
import { useCodesetCodes } from '@/hooks'

const VisitStatusDropdown = ({ value }: { value: string }) => {
  const codes = useCodesetCodes(CODESETS.AppointmentStatus)
  const items = codes.map((code) => (
    <Select.Item key={code.value} value={code.value}>
      {code.display}
    </Select.Item>
  ))
  return (
    <Select.Root defaultValue={value} size="1">
      <Select.Trigger
        placeholder="Select"
        className="bg-pp-warning-bg text-pp-warning-text h-4 w-[116px] rounded-[4px] px-1.5 text-[12px] text-gray-12"
      />
      <Select.Content position="popper" align="center" highContrast>
        {items}
      </Select.Content>
    </Select.Root>
  )
}

export { VisitStatusDropdown }
