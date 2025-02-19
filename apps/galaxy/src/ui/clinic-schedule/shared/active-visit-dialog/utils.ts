import { SelectOptionType, SharedCode } from '@/types'
import { ActiveVisitSchemaType } from './active-visit-form'
import { ActiveVisitFilters, AppointmentStatus } from './types'

const getInitialVisitFiltersValues = (
  filters: ActiveVisitFilters,
): Partial<ActiveVisitSchemaType> => ({
  providerIds: [filters.staffId],
  appointmentStatus: AppointmentStatus.Scheduled,
  startingDate: filters?.startDateTime ?? '',
  endingDate: filters?.endDateTime ?? '',
  age: '',
  gender: '',
  locationId: '',
  name: '',
  serviceId: '',
  visitType: '',
})

const getActiveVisitStatusOptions = (
  code: SharedCode[],
): SelectOptionType[] => {
  return code?.reduce<SelectOptionType[]>(
    (options, { attributes = [], display: label, value }) => {
      if (
        attributes.some(
          ({ name, value }) => name === 'Group' && value === 'Active',
        )
      ) {
        options.push({ label, value })
      }
      return options
    },
    [],
  )
}

const getServiceOptions = (
  map: Record<string, string>,
  serviceCodes: SelectOptionType[],
) => {
  return serviceCodes.map((code) => ({
    ...code,
    label: map[code.label],
  }))
}

export {
  getInitialVisitFiltersValues,
  getActiveVisitStatusOptions,
  getServiceOptions,
}
