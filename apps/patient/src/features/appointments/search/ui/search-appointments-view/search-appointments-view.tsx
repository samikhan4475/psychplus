'use client'

import { useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import { AppointmentType } from '@psychplus-v2/constants'
import { CareTeamMember, Clinic, Consent } from '@psychplus-v2/types'
import { getProviderTypeLabel } from '@psychplus-v2/utils'
import { Box, Flex, Text } from '@radix-ui/themes'
import { useShallow } from 'zustand/react/shallow'
import { clickTrack } from '@psychplus/utils/tracking'
import { useProfileStore } from '@/features/account/profile/store'
import { useStore } from '@/features/appointments/search/store'
import { useDeepCompareEffect } from '@/hooks'
import { checkCareTeamExists, getStartOfWeek } from '../../utils'
import { AppointmentRadiusFilter } from './appointment-radius-filter'
import { AppointmentSort } from './appointment-sort'
import {
  AvailabilityList,
  PrimaryProviderAvailabilityCard,
} from './availability-list'
import { ClinicsMapView } from './clinics-map-view'
import { DaysHeader } from './days-header'
import { DifferentStateDialog } from './different-state-dialog'
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
  isSchedulingOptimizationEnabled?: boolean
}

const SearchAppointmentsView = ({
  userConsents,
  careTeam,
  mapKey,
  isSchedulingOptimizationEnabled,
}: SearchAppointmentsViewProps) => {
  const [hasHydrated, setHasHydrated] = useState(false)

  const [dialogState, setDialogState] = useState<{
    isOpen: boolean
    clinic: Clinic | undefined
  }>({
    isOpen: false,
    clinic: undefined,
  })

  const handleDialogClose = () => {
    setDialogState({ isOpen: false, clinic: undefined })
  }

  const handleDialogConfirm = () => {
    if (dialogState.clinic) {
      router.push(`book`)
    }
    handleDialogClose()
  }

  const router = useRouter()

  const {
    loading,
    searchLocationsProviders,
    providerType,
    appointmentType,
    zipCode,
    location,
    startingDate,
    state,
    setCareTeam,
    data,
    maxDistanceInMiles,
    careTeamMember,
    search,
  } = useStore(
    useShallow((state) => ({
      providerType: state.providerType,
      appointmentType: state.appointmentType,
      loading: state.loading,
      searchLocationsProviders: state.searchLocationsProviders,
      zipCode: state.zipCode,
      location: state.location,
      startingDate: state.startingDate,
      state: state.state,
      setCareTeam: state.setCareTeam,
      maxDistanceInMiles: state.maxDistanceInMiles,
      data: state.data,
      search: state.search,
      careTeamMember: state.careTeamMember(),
    })),
  )

  const { profile } = useProfileStore((state) => ({
    profile: state.profile,
  }))

  useEffect(() => {
    const hydrateAndInit = async () => {
      await Promise.resolve(useStore.persist.rehydrate())

      const state = useStore.getState()
      if (!state.startingDate) {
        state.setStartingDate(getStartOfWeek(new Date()))
      }

      setHasHydrated(true)

      clickTrack({
        productArea: 'Patient',
        productPageKey: 'Portal Schedule Appointment Screen',
        clickAction: 'Navigation',
        clickActionData: 'Landed',
      })
    }

    hydrateAndInit()
  }, [])

  useDeepCompareEffect(() => {
    if (!hasHydrated) {
      return
    }
    setCareTeam(careTeam)
    if (isSchedulingOptimizationEnabled) {
      searchLocationsProviders()
    } else {
      search()
    }
  }, [
    hasHydrated,
    searchLocationsProviders,
    providerType,
    appointmentType,
    zipCode,
    state,
    startingDate,
    location,
    setCareTeam,
    careTeam,
    maxDistanceInMiles,
    isSchedulingOptimizationEnabled,
  ])

  const careTeamExists = useMemo(
    () => checkCareTeamExists(careTeam, getProviderTypeLabel(providerType)),
    [careTeam, providerType],
  )

  const primaryProviderAvailabilityData = useMemo(
    () =>
      data?.find(
        ({ specialist }) => specialist.id === careTeamMember?.staffDetails?.id,
      ),
    [data, careTeamMember],
  )

  if (!hasHydrated) {
    return <LoadingPlaceholder showFilters />
  }

  return (
    <Flex position="relative" direction="column" width="100%" height="100%">
      <Box px="7" className="bg-pp-blue-1 sticky top-[70px] z-40 py-[20px]">
        <Flex
          direction={{ initial: 'column', sm: 'row' }}
          justify="between"
          wrap="wrap"
          className="flex-nowrap max-lg:flex-wrap max-lg:gap-6 lg:gap-3"
        >
          <Flex className="flex-nowrap max-lg:flex-wrap max-lg:gap-[30px] lg:gap-[20px]">
            <ProviderTypeFilter />
            <VisitTypeFilter />
          </Flex>
          <Flex
            direction={{ initial: 'column', sm: 'row' }}
            className="max-lg:gap-4 lg:gap-3"
          >
            <Flex className="max-lg:gap-4 lg:gap-3">
              {isSchedulingOptimizationEnabled && <AppointmentRadiusFilter />}

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
          <Flex className="!max-md:top-[191px] sticky z-30 max-lg:top-[192px] max-sm:top-[212px] lg:top-[144px]">
            <Flex
              align="center"
              pt="6"
              pb="3"
              px="5"
              className="bg-white flex-1 flex-col gap-2 border-b border-b-gray-5 sm:flex-row"
            >
              {careTeamExists && primaryProviderAvailabilityData ? (
                <Text
                  weight="medium"
                  className="text-accent-12 sm:!mr-0 sm:!w-[100px] sm:!text-[16px] md:!mr-[48px] md:!w-[250px] md:!text-[20px] lg:!mr-[48px] lg:!w-[250px] lg:!text-[20px]"
                >
                  Primary Provider
                </Text>
              ) : (
                <ProviderCountLabel />
              )}
              <DaysHeader />
            </Flex>
            <Box className="bg-white w-1/5 max-md:w-0"></Box>
          </Flex>
          <Flex>
            <Flex className="flex-1" direction="column">
              {careTeamExists && primaryProviderAvailabilityData ? (
                <PrimaryProviderAvailabilityCard
                  userConsents={userConsents}
                  setShowDifferentStateDialog={setDialogState}
                  primaryProviderAvailabilityData={
                    primaryProviderAvailabilityData
                  }
                  isSchedulingOptimizationEnabled={
                    isSchedulingOptimizationEnabled
                  }
                />
              ) : null}

              {careTeamExists && primaryProviderAvailabilityData ? (
                <Box className="bg-white border-pp-gray-3 border-b px-5 py-6">
                  <Text
                    weight="medium"
                    className="text-accent-12 sm:!mr-0 sm:!w-[100px] sm:!text-[16px] md:!mr-[48px] md:!w-[250px] md:!text-[20px] lg:!mr-[48px] lg:!w-[250px] lg:!text-[20px]"
                  >
                    Similar Providers
                  </Text>
                </Box>
              ) : null}
              <AvailabilityList
                userConsents={userConsents}
                setShowDifferentStateDialog={setDialogState}
                isSchedulingOptimizationEnabled={
                  isSchedulingOptimizationEnabled
                }
              />
            </Flex>
            <ClinicsMapView
              mapKey={mapKey}
              hide={appointmentType === AppointmentType.Virtual}
            />
          </Flex>
        </>
      )}
      {dialogState.isOpen && (
        <DifferentStateDialog
          open={dialogState.isOpen}
          setOpen={(isOpen) => setDialogState((prev) => ({ ...prev, isOpen }))}
          onClose={handleDialogClose}
          onConfirm={handleDialogConfirm}
          myState={profile?.contactDetails?.addresses?.[0]?.state ?? 'Unknown'}
          clinic={dialogState.clinic}
        />
      )}
    </Flex>
  )
}

export { SearchAppointmentsView }
