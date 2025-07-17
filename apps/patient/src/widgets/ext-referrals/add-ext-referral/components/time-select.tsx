'use client'

import { useMemo } from 'react'
import { getLocalTimeZone } from '@internationalized/date'
import { generateTimeIntervals } from '@psychplus-v2/utils'
import { addHours, isToday } from 'date-fns'
import { useFormContext } from 'react-hook-form'
import { FormField } from '@/components-v2'
import { SelectInput } from '@/components-v2/select-input'
import { SchemaType } from './schema'

const TimeSelect = () => {
  const { watch } = useFormContext<SchemaType>()
  const selectedDate = watch('requestedTime')

  const options = useMemo(() => {
    const allOptions = generateTimeIntervals()

    if (!selectedDate) return allOptions

    const selectedDateObj = selectedDate.toDate(getLocalTimeZone())

    if (!isToday(selectedDateObj)) return allOptions

    const nowPlus2 = addHours(new Date(), 2)

    return allOptions.filter((opt) => {
      const [h, m] = opt.value.split(':').map(Number)
      const optionTime = new Date()
      optionTime.setHours(h, m, 0, 0)
      return optionTime >= nowPlus2
    })
  }, [selectedDate])

  return (
    <FormField containerClassName="flex-1" name="time" label="Select Time">
      <SelectInput
        field="time"
        placeholder="--Please Select--"
        options={options}
        buttonClassName="font-regular h-[38px] border-pp-gray-2  text-gray-12 text-2 w-full 
        border border-solid !outline-none [box-shadow:none] 
        bg-white  [&_span]:bg-red-500 disabled:bg-gray-3"
        variant="soft"
        disabled={!selectedDate}
        size="1"
      />
    </FormField>
  )
}

export { TimeSelect }
