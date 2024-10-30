'use client'

import { useEffect, useState } from 'react'
import { AppointmentType } from '@psychplus-v2/constants'
import { CareTeamMember, Consent } from '@psychplus-v2/types'
import { getProviderTypeLabel } from '@psychplus-v2/utils'
import { Box, Flex, Text } from '@radix-ui/themes'
import { clickTrack } from '@psychplus/utils/tracking'
import { useStore } from '@/features/appointments/search/store'
import { checkCareTeamExists } from '../../utils'
import { AppointmentSort } from './appointment-sort'
import {
  AvailabilityList,
  PrimaryProviderAvailabilityCard,
} from './availability-list'
import { ClinicsMapView } from './clinics-map-view'
import { DaysHeader } from './days-header'
import { LoadingPlaceholder } from './loading-placeholder'
import { ProviderCountLabel } from './provider-count-label'
import { ProviderLanguageFilter } from './provider-language-filter'
import { ProviderTypeFilter } from './provider-type-filter'
import { VisitTypeFilter } from './visit-type-filter'
import { ZipCodeSearchForm } from './zipcode-search-form'

interface SearchAppointmentsViewProps {
  userConsents: Consent[]
  careTeam: CareTeamMember[]
  mapKey: string
}

const SearchAppointmentsView = ({
  userConsents,
  careTeam,
  mapKey,
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
    state,
    setCareTeam,
  } = useStore()

  useEffect(() => {
    useStore.persist.rehydrate()
    setHasHydrated(true)

    clickTrack({
      productArea: 'Patient',
      productPageKey: 'Portal Schedule Appointment Screen',
      clickAction: 'Navigation',
      clickActionData: 'Landed',
    })
  }, [])

  useEffect(() => {
    if (!hasHydrated) {
      return
    }
    setCareTeam(careTeam)
    search()
  }, [
    hasHydrated,
    search,
    providerType,
    appointmentType,
    zipCode,
    state,
    startingDate,
    location,
    setCareTeam,
    careTeam,
  ])

  if (!hasHydrated) {
    return <LoadingPlaceholder showFilters />
  }

  const careTeamExists = checkCareTeamExists(
    careTeam,
    getProviderTypeLabel(providerType),
  )

  return (
    <Flex position="relative" direction="column" width="100%" height="100%">
      <Box px="7" className="bg-pp-blue-1 py-[20px]">
        <Flex
          direction={{ initial: 'column', sm: 'row' }}
          justify="between"
          wrap="wrap"
          gap={{ initial: '2', sm: '4' }}
        >
          <Flex gap={{ initial: '2', sm: '9' }} wrap="wrap">
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
            <ZipCodeSearchForm />
          </Flex>
        </Flex>
      </Box>
      {loading ? (
        <LoadingPlaceholder />
      ) : (
        <>
          <Flex>
            <Flex
              align="center"
              pt="6"
              pb="3"
              px="5"
              className="bg-white flex-1 border-b border-b-gray-5"
            >
              {careTeamExists ? (
                <Text
                  weight="medium"
                  className="mr-[48px] w-[240px] text-[20px] text-accent-12"
                >
                  Primary Provider
                </Text>
              ) : (
                <ProviderCountLabel />
              )}
              <DaysHeader />
            </Flex>
            <Box className="bg-white w-1/5"></Box>
          </Flex>
          <Flex>
            <Flex className="flex-1" direction="column">
              {careTeamExists ? (
                <PrimaryProviderAvailabilityCard userConsents={userConsents} />
              ) : null}

              {careTeamExists ? (
                <Box className="bg-white border-pp-gray-3 border-b px-5 py-6">
                  <Text
                    weight="medium"
                    className="mr-[48px] w-[240px] text-[20px] text-accent-12"
                  >
                    Similar Providers
                  </Text>
                </Box>
              ) : null}
              <AvailabilityList userConsents={userConsents} />
            </Flex>
            <ClinicsMapView
              mapKey={mapKey}
              hide={appointmentType === AppointmentType.Virtual}
            />
          </Flex>
        </>
      )}
    </Flex>
  )
}

export { SearchAppointmentsView }
