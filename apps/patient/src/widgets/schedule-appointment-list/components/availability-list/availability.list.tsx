'use client'

import { useMemo } from 'react'
import { useShallow } from 'zustand/react/shallow'
import { useStore } from '../../store'
import { sortAndFilterAppointments } from '../../utils'
import { ProvidersAvailabilityListing } from '../provider-listing'

interface AvailabilityListProps {
  isSchedulingOptimizationEnabled?: boolean
}

const AvailabilityList = ({
  isSchedulingOptimizationEnabled,
}: AvailabilityListProps) => {
  const { data, filters, providerIds } = useStore(
    useShallow((state) => ({
      data: state.data,
      filters: state.filters,
      providerIds: state.providerIds,
    })),
  )

  const sortedProviders = useMemo(
    () =>
      sortAndFilterAppointments(data ?? [], {
        sortBy: filters.sortBy,
        language: filters.language,
        providerIds,
      }),
    [data, filters.sortBy, filters.language],
  )

  return (
    <ProvidersAvailabilityListing
      filters={filters}
      sortedProviders={sortedProviders}
      isSchedulingOptimizationEnabled={isSchedulingOptimizationEnabled}
    />
  )
}
export { AvailabilityList }
