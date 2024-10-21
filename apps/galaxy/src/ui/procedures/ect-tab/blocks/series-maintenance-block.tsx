import { RadioSelectInput } from '@/components'

const BLOCK_ID = 'seriesMaintenance'

const BLOCK_OPTIONS = [
  {
    label: 'Series',
    value: 'series',
  },
  {
    label: 'Maintenance',
    value: 'maintenance',
  },
]

const SeriesMaintenanceBlock = () => {
  return (
    <RadioSelectInput
      field={BLOCK_ID}
      options={BLOCK_OPTIONS}
    />
  )
}

export { SeriesMaintenanceBlock }
