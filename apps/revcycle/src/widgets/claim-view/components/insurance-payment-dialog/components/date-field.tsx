import { forwardRef } from 'react'
import { Box, Text } from '@radix-ui/themes'
import { DatePicker } from '@psychplus/ui/date-picker'

const DateFieldLabel = forwardRef<
  HTMLInputElement,
  {
    error?: string
    label: string
    date: Date | undefined
    setDate: (date: Date | undefined) => void
  }
>(({ label, date, setDate, error }) => (
  <>
    <Text size="1" className="font-bold">
      {label} <span className="text-[#FF0000]">*</span>
    </Text>
    <Box>
      <DatePicker
        color="gray"
        dateFormat="MM/dd/yyyy"
        buttonClassName="min-w-[170px] justify-between text-left font-regular"
        reverse={true}
        date={date}
        onSelect={setDate}
      />
      {error && (
        <Text size="1" className="text-[#FF0000]">
          {error}
        </Text>
      )}
    </Box>
  </>
))
DateFieldLabel.displayName = 'DateFieldLabel'
export default DateFieldLabel
