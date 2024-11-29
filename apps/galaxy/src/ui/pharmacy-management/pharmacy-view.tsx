'use client'

import { useEffect } from 'react'
import { Flex } from '@radix-ui/themes'
import { CurrentPharmaciesTable } from './current-pharmacies-table'
import { PharmacyFilterForm } from './filter-form'
import { PharmacyHeader } from './pharmacy-header'
import { PharmacyListTablePagination } from './pharmacy-list-table-pagination'
import { useStore } from './store'

const PharmacyView = () => {
  const { data, fetchPatientPharmacies, loading } = useStore((state) => ({
    data: state.data,
    loading: state.loading,
    fetchPatientPharmacies: state.fetchPatientPharmacies,
  }))

  useEffect(() => {
    fetchPatientPharmacies()
  }, [])

  return (
    <Flex direction="column" width="100%" gap="1">
      <PharmacyHeader />
      <PharmacyFilterForm />
      <CurrentPharmaciesTable data={data ?? []} loading={loading} />
      <PharmacyListTablePagination />
    </Flex>
  )
}

export { PharmacyView }
