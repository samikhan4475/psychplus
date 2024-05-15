import { ProviderType } from '@psychplus-v2/constants'
import { useStore } from '@/features/appointments/search/store'
import { AppointmentFilterRadioGroup } from './appointment-filter-radio-group'

const ProviderTypeFilter = () => {
  const { providerType, setProviderType } = useStore((state) => ({
    providerType: state.providerType,
    setProviderType: state.setProviderType,
  }))

  return (
    <AppointmentFilterRadioGroup
      title="Provider Type"
      value={providerType.toString()}
      onChange={(value) => setProviderType(Number(value))}
      options={[
        { value: ProviderType.Psychiatrist.toString(), label: 'Psychiatrist' },
        { value: ProviderType.Therapist.toString(), label: 'Therapist' },
      ]}
    />
  )
}

export { ProviderTypeFilter }
