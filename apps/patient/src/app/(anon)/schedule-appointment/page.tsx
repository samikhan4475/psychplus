'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { Flex, Text } from '@radix-ui/themes'
import { CodeSet } from '@psychplus/codeset'
import { getCodeSet } from '@psychplus/codeset/api.client'
import { psychPlusBlueColor } from '@/components'
import {
  AvailableSlots,
  CalendarRow,
  Filter,
  MapboxComponent,
  ProvidersComponent,
} from './components'
import { useStore } from './store'
import { DUMMY_LOCATIONS, DUMMY_STAFF, Filters } from './types'

const ScheduleAppointmentPage = () => {
  const searchParams = useSearchParams()
  const { setCodeSets, setStaff } = useStore()
  const [languageCodeSet, setLanguageCodeSet] = useState<CodeSet>()
  const [specialistTypeCodeSet, setSpecialistTypeCodeSet] = useState<CodeSet>()
  const [filters, setFilters] = useState<Filters>({
    providerType: searchParams.get('providerType') || '',
    appointmentType: searchParams.get('appointmentType') || '',
    zipCode: searchParams.get('zipCode') || '',
    sortBy: '',
    language: '',
  })

  useEffect(() => {
    getCodeSet('Language').then(setLanguageCodeSet)
    getCodeSet('SpecialistType').then(setSpecialistTypeCodeSet)
  }, [])

  setCodeSets(languageCodeSet, specialistTypeCodeSet)
  setStaff(DUMMY_STAFF)

  const handleFilterChange = (key: keyof Filters, value: string) => {
    setFilters((prevFilters) => ({ ...prevFilters, [key]: value }))
  }

  const filteredStaff = DUMMY_STAFF.filter(
    (provider) =>
      ((filters.providerType === 'Psychiatrist' &&
        provider.staffRoleCode === '1') ||
        (filters.providerType === 'Therapist' &&
          provider.staffRoleCode === '2')) &&
      (filters.language
        ? provider?.spokenLanguages?.[0] === filters.language
        : true),
  )

  return (
    <Flex direction="column" className="w-full">
      <Filter filters={filters} onFilterChange={handleFilterChange} />

      <Flex
        className="w-full border border-gray-3"
        py="5"
        px="7"
        align="center"
      >
        <Flex style={{ flex: 1 }}>
          <Flex
            style={{
              color: psychPlusBlueColor,
              flex: 1,
            }}
          >
            <Text size="5">{filteredStaff.length} Providers</Text>
          </Flex>
          <Flex style={{ flex: 2.3 }}>
            <CalendarRow />
          </Flex>
        </Flex>
        <Flex
          style={{
            flex: filters.appointmentType === 'In-Person' ? 0.28 : 0,
          }}
        ></Flex>
      </Flex>

      <Flex className="w-full">
        <Flex direction="column" style={{ flex: 1 }}>
          {filteredStaff.map((provider) => (
            <Flex
              py="5"
              px="7"
              className="border-b border-b-gray-3"
              key={provider.id}
            >
              <Flex style={{ flex: 1 }}>
                <ProvidersComponent
                  staff={provider}
                  appointmentType={filters.appointmentType}
                />
              </Flex>
              <Flex
                style={{
                  flex: filters.appointmentType === 'In-Person' ? 1.9 : 2,
                }}
              >
                <AvailableSlots />
              </Flex>
            </Flex>
          ))}
        </Flex>

        <Flex
          justify="end"
          style={{
            flex: filters.appointmentType === 'In-Person' ? 0.28 : 0,
          }}
        >
          {filters.appointmentType === 'In-Person' && (
            <MapboxComponent
              key={JSON.stringify(DUMMY_LOCATIONS)}
              width={350}
              height={700}
              zoom={17}
              locations={DUMMY_LOCATIONS}
            />
          )}
        </Flex>
      </Flex>
    </Flex>
  )
}

export default ScheduleAppointmentPage
