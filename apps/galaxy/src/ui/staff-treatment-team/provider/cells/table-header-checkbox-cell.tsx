import { Checkbox } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { ProviderSchemaType } from '../schema'
import { useStore } from '../store'

interface HeaderCheckboxProps {
  checked: boolean
  onCheckedChange: (value: boolean) => void
}

const TableHeaderCheckboxCell = ({
  checked,
  onCheckedChange,
}: HeaderCheckboxProps) => {
  const { primaryPatients, secondaryPatients } = useStore((state) => ({
    primaryPatients: state.primaryPatients,
    secondaryPatients: state.secondaryPatients,
  }))

  const form = useFormContext<ProviderSchemaType>()
  const isPrimary = form.watch('isPrimary')
  const data = isPrimary ? primaryPatients : secondaryPatients

  const onChange = (value: boolean): void => {
    onCheckedChange(!!value)
    form.setValue(
      'selectedRows',
      value ? data.map((e) => `${e.patientId}`) : [],
    )
  }

  return (
    <Checkbox
      checked={checked}
      className="mt-0.5"
      color="indigo"
      highContrast
      onCheckedChange={onChange}
      aria-label="Select all"
    />
  )
}

export { TableHeaderCheckboxCell }
