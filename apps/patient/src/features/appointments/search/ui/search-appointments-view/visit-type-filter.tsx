import { AppointmentType } from '@psychplus-v2/constants'
import { getAppointmentTypeLabel } from '@psychplus-v2/utils'
import { useStore } from '@/features/appointments/search/store'
import { AppointmentFilterRadioGroup } from './appointment-filter-radio-group'

const VisitTypeFilter = () => {
  const { appointmentType, setAppointmentType, loading } = useStore(
    (state) => ({
      appointmentType: state.appointmentType,
      setAppointmentType: state.setAppointmentType,
      loading: state.loading,
    }),
  )

  return (
    <AppointmentFilterRadioGroup
      disabled={loading}
      title="Type"
      value={appointmentType}
      onChange={setAppointmentType}
      options={[
        {
          value: AppointmentType.Virtual,
          label: getAppointmentTypeLabel(AppointmentType.Virtual),
        },
        {
          value: AppointmentType.InPerson,
          label: getAppointmentTypeLabel(AppointmentType.InPerson),
        },
      ]}
    />
  )
}

export { VisitTypeFilter }
