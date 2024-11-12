import { RadioGroup } from '@/components'

const POST_TREATMENT_OPTIONS = [
  {
    label: 'Taxi/Uber/Lift',
    value: 'Taxi/Uber/Lift',
  },
  {
    label: 'Public Transportation',
    value: 'Public Transportation',
  },
  {
    label: 'Ambulance (if medically necessary)',
    value: 'Ambulance (if medically necessary)',
  },
  {
    label: 'Driver Service',
    value: 'Driver Service',
  },
  {
    label: 'Family/Friend Driver',
    value: 'Family/Friend Driver',
  },
  {
    label: 'Other',
    value: 'Other',
  },
]

const TransportationBlock = () => {
  return (
    <RadioGroup
      field="postTreatmentTransportation"
      options={POST_TREATMENT_OPTIONS}
    />
  )
}

export { TransportationBlock }
