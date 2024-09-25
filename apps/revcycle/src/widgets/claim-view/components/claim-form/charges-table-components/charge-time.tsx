import { TextField } from '@radix-ui/themes'
import { UseFormReturn, useWatch } from 'react-hook-form'
import { useStore } from '@/widgets/claim-view/store'
import { SchemaType } from '../add-claim-form'
import { ClaimServiceLine } from '../types'
import useCalculateBilledAmount from '../useCalculateBilledAmount'
import useCalculateMinutes from '../useCalculateMinutes'

interface TableCellTimeProps {
  row: {
    original: ClaimServiceLine
    index: number
  }
  form: UseFormReturn<SchemaType>
  isStartTime: boolean // Flag to differentiate between start and end time
}

const TableCellTime = ({ row, form, isStartTime }: TableCellTimeProps) => {
  const { setValue } = form
  const { setSelectedClaimBilledAmt } = useStore((state) => ({
    setSelectedClaimBilledAmt: state.setSelectedClaimBilledAmt,
  }))

  const calculateMinutes = useCalculateMinutes()
  const calculateBilledAmount = useCalculateBilledAmount()

  const isAnesthesia = useWatch({
    control: form.control,
    name: `claimServiceLines.${row.index}.isAnesthesia`,
  })

  const startTime = useWatch({
    control: form.control,
    name: `claimServiceLines.${row.index}.startTime`,
  })

  const endTime = useWatch({
    control: form.control,
    name: `claimServiceLines.${row.index}.endTime`,
  })

  const unitAmount = useWatch({
    control: form.control,
    name: `claimServiceLines.${row.index}.unitAmount`,
  })

  const safeUnitAmount = unitAmount ?? 0

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    const minutes = isStartTime
      ? calculateMinutes(value, endTime ?? '')
      : calculateMinutes(startTime ?? '', value)

    const units = (minutes / 15).toFixed(1)
    const calculatedValue = (Number(units) * safeUnitAmount).toFixed(2)

    setValue(
      isStartTime
        ? `claimServiceLines.${row.index}.startTime`
        : `claimServiceLines.${row.index}.endTime`,
      value,
      {
        shouldValidate: true,
      },
    )
    setValue(`claimServiceLines.${row.index}.minutes`, minutes.toString(), {
      shouldValidate: true,
    })
    setValue(`claimServiceLines.${row.index}.units`, Number(units), {
      shouldValidate: true,
    })
    setValue(
      `claimServiceLines.${row.index}.totalAmount`,
      parseFloat(calculatedValue),
      {
        shouldValidate: true,
      },
    )

    const updatedBilledAmount = calculateBilledAmount(
      form.getValues('claimServiceLines'),
    )
    form.setValue(`totalAmount`, updatedBilledAmount)
    setSelectedClaimBilledAmt(Number(updatedBilledAmount))
  }

  return (
    <TextField.Root
      type="time"
      className="h-[22px]"
      placeholder="Select time"
      value={isStartTime ? startTime : endTime}
      onChange={handleChange}
      disabled={!isAnesthesia}
    />
  )
}

export { TableCellTime }
