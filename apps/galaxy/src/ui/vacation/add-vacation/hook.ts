import { useFormContext, useWatch } from 'react-hook-form'
import { SchemaType } from './schema'

const useUpdateDuration = () => {
  const form = useFormContext<SchemaType>()

  const fromDate = useWatch({
    control: form.control,
    name: 'fromDate',
  })
  const fromTime = useWatch({
    control: form.control,
    name: 'fromTime',
  })
  const toDate = useWatch({
    control: form.control,
    name: 'toDate',
  })
  const toTime = useWatch({
    control: form.control,
    name: 'toTime',
  })

  if (!fromDate || !fromTime || !toDate || !toTime) return
  const fromDateTime = new Date(`${fromDate}T${fromTime}`)
  const toDateTime = new Date(`${toDate}T${toTime}`)

  const durationInMs = toDateTime.getTime() - fromDateTime.getTime()
  let durationInDays = durationInMs / (1000 * 60 * 60 * 24)

  if (typeof durationInDays === 'number' && !isNaN(durationInDays)) {
    durationInDays = +durationInDays.toFixed(1)
    form.setValue('duration', durationInDays)
  }
}

export { useUpdateDuration }
