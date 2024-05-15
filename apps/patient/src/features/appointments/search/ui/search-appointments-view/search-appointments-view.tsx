'use client'

import { useEffect, useState } from 'react'
import { AppointmentType } from '@psychplus-v2/constants'
import { Consent } from '@psychplus-v2/types'
import { Box, Flex } from '@radix-ui/themes'
import { useStore } from '@/features/appointments/search/store'
import { AppointmentSort } from './appointment-sort'
import { AvailabilityList } from './availability-list'
import { DaysHeader } from './days-header'
import { LoadingPlaceholder } from './loading-placeholder'
import { ProviderCountLabel } from './provider-count-label'
import { ProviderLanguageFilter } from './provider-language-filter'
import { ProviderTypeFilter } from './provider-type-filter'
import { VisitTypeFilter } from './visit-type-filter'
import { ZipCodeSearchForm } from './zipcode-search-form'

interface SearchAppointmentsViewProps {
  userConsents: Consent[]
}

const SearchAppointmentsView = ({
  userConsents,
}: SearchAppointmentsViewProps) => {
  const [hasHydrated, setHasHydrated] = useState(false)

  const {
    loading,
    search,
    providerType,
    appointmentType,
    zipCode,
    location,
    startingDate,
  } = useStore((state) => ({
    loading: state.loading,
    search: state.search,
    providerType: state.providerType,
    appointmentType: state.appointmentType,
    zipCode: state.zipCode,
    location: state.location,
    language: state.language,
    sortBy: state.sortBy,
    setZipCode: state.setZipCode,
    next: state.next,
    startingDate: state.startingDate,
  }))

  useEffect(() => {
    useStore.persist.rehydrate()
    setHasHydrated(true)
  }, [])

  useEffect(() => {
    if (!hasHydrated) {
      return
    }

    search()
  }, [
    hasHydrated,
    search,
    providerType,
    appointmentType,
    zipCode,
    startingDate,
    location,
  ])

  if (!hasHydrated) {
    return <LoadingPlaceholder showFilters />
  }

  return (
    <Flex position="relative" direction="column" width="100%" height="100%">
      <Box px="5" py="4" className="bg-white">
        <Flex
          direction={{ initial: 'column', sm: 'row' }}
          justify="between"
          wrap="wrap"
          gap={{ initial: '2', sm: '4' }}
        >
          <Flex gap={{ initial: '2', sm: '4' }} wrap="wrap">
            <ProviderTypeFilter />
            <VisitTypeFilter />
          </Flex>
          <Flex
            direction={{ initial: 'column', sm: 'row' }}
            gap={{ initial: '2', sm: '4' }}
          >
            <Flex gap={{ initial: '2', sm: '4' }}>
              <AppointmentSort />
              <ProviderLanguageFilter />
            </Flex>
            {appointmentType === AppointmentType.InPerson ? (
              <ZipCodeSearchForm />
            ) : null}
          </Flex>
        </Flex>
      </Box>
      {loading ? (
        <LoadingPlaceholder />
      ) : (
        <>
          <Flex
            align="center"
            py="6"
            px="5"
            className="bg-white border-y border-y-gray-5"
          >
            <ProviderCountLabel />
            <DaysHeader />
          </Flex>
          <AvailabilityList userConsents={userConsents} />
        </>
      )}
    </Flex>
  )
}

export { SearchAppointmentsView }
