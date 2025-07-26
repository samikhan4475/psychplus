'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { getUserInitials } from '@psychplus-v2/utils'
import { CheckIcon, StarFilledIcon, StarIcon } from '@radix-ui/react-icons'
import { Avatar, Box, Flex, Text } from '@radix-ui/themes'
import { getCodeDisplay } from '@psychplus/codeset'
import { Popover } from '@psychplus/ui/popover'
import { isMobile } from '@psychplus/utils/client'
import { DownArrowIcon } from '@/components'
import {
  LegacyWeeklyAvailabilitySlots,
  WeeklyAvailabilitySlots,
} from '../../components'
import { useStore } from '../../store'
import type { ClinicWithSlots, StaffWithClinicsAndSlots } from '../../types'
import { renderStaffName } from '../../utils'

interface ProviderWithClinicAndWeeklyAvailabilityProps {
  staffWithClinicsAndSlots: StaffWithClinicsAndSlots
  isSchedulingOptimizationEnabled?: boolean
}

const ProviderWithClinicAndWeeklyAvailability = ({
  staffWithClinicsAndSlots,
  isSchedulingOptimizationEnabled,
}: ProviderWithClinicAndWeeklyAvailabilityProps) => {
  const { codeSetIndex, filters } = useStore()
  const specialistTypeCodeSet = codeSetIndex.SpecialistType
  const [selectedClinicIndex, setSelectedClinicIndex] = useState(0)
  const [slotsLoading, setSlotsLoading] = useState(false)

  useEffect(() => {
    setSelectedClinicIndex(0)
  }, [filters.appointmentType])

  return (
    <Flex className="w-full flex-col gap-5 md:flex-row md:gap-0">
      <Flex
        direction="column"
        gap="2"
        className="md:min-w-[300px] lg:min-w-[380px]"
      >
        <Flex align="center" gap="2" className="w-10/12 md:w-11/12">
          <Avatar
            src={
              staffWithClinicsAndSlots?.staff?.hasPhoto
                ? `/api/staff/${staffWithClinicsAndSlots?.staff?.id}/profileimage`
                : undefined
            }
            color="gray"
            fallback={getUserInitials(
              staffWithClinicsAndSlots?.staff?.legalName,
            )}
            className="h-[56px] w-[56px]"
            radius="full"
          />

          <Flex direction="column" gap="1" className="text-[#151B4A]">
            <Text className="text-3 font-bold md:text-5">
              {renderStaffName(staffWithClinicsAndSlots.staff)}
            </Text>
            <StarRating
              rating={staffWithClinicsAndSlots.staff.rating?.valueOf()}
            />
            <Flex align="center">
              <Text size="1" className="text-[#194595]" ml="1">
                {getCodeDisplay(
                  specialistTypeCodeSet,
                  staffWithClinicsAndSlots.staffTypeCode.toString(),
                )}
              </Text>
            </Flex>
          </Flex>
        </Flex>
        {renderLanguageAndLocation(
          filters.appointmentType,
          staffWithClinicsAndSlots,
          selectedClinicIndex,
          setSelectedClinicIndex,
          slotsLoading,
        )}
      </Flex>
      <Flex className="sm:w-[700px] md:min-w-[700px] lg:min-w-[700px]">
        {isSchedulingOptimizationEnabled ? (
          <WeeklyAvailabilitySlots
            staff={staffWithClinicsAndSlots.staff}
            staffTypeCode={staffWithClinicsAndSlots.staffTypeCode}
            clinicWithSlots={
              staffWithClinicsAndSlots.clinicWithSlots[selectedClinicIndex]
            }
            slotsLoading={slotsLoading}
            setSlotsLoading={setSlotsLoading}
            onClinicChange={setSelectedClinicIndex}
            selectedClinic={selectedClinicIndex}
          />
        ) : (
          <LegacyWeeklyAvailabilitySlots
            staff={staffWithClinicsAndSlots.staff}
            staffTypeCode={staffWithClinicsAndSlots.staffTypeCode}
            clinicWithSlots={
              staffWithClinicsAndSlots.clinicWithSlots[selectedClinicIndex]
            }
          />
        )}
      </Flex>
    </Flex>
  )
}

const StarRating = ({ rating }: { rating?: number }) => {
  const numericRating = rating ?? 0;

  return (
    <Flex align="center" gap="1">
      {Array.from({ length: 5 }, (_, index) => (
        <Box key={index}>
          {(numericRating === 0 || index + 1 <= numericRating) ? (
            <StarFilledIcon height={16} width={16} color="#FFC700" />
          ) : (
            <StarIcon height={16} width={16} color="#FFC700" />
          )}
        </Box>
      ))}
      <Text className="text-xs pt-[1px] font-medium text-[#1C2024]">
        {numericRating}
      </Text>
    </Flex>
  );
};


const renderLanguageAndLocation = (
  appointmentType: string,
  staffWithClinicsAndSlots: StaffWithClinicsAndSlots,
  selectedClinicIndex: number,
  onChangeLocation: (id: number) => void,
  slotsLoading: boolean,
) => (
  <Flex direction="column" gap="2" className="w-[272px]">
    {appointmentType === 'In-Person' && (
      <Flex gap="1">
        <Flex mt="1" className="text-2 md:text-3">
          Location:
        </Flex>
        <ClinicsDropDown
          clinics={staffWithClinicsAndSlots.clinicWithSlots}
          onClinicSelect={onChangeLocation}
          selectedClinicIndex={selectedClinicIndex}
          slotsLoading={slotsLoading}
        />
      </Flex>
    )}

    {appointmentType === 'In-Person' && (
      <Flex align="start" className="w-52 flex-wrap justify-between" gap="2">
        <Flex align="end" className="gap-[17px] text-2 md:text-3">
          Distance:
          <Text className="text-2 text-[#575759] md:text-3">
            {
              staffWithClinicsAndSlots?.clinicWithSlots[selectedClinicIndex]
                ?.clinic?.distanceInMiles
            }
            mi
          </Text>
        </Flex>
      </Flex>
    )}

    <Flex gap="3" align="start" className="w-24">
      <Text className="text-2 font-regular leading-5 text-[#1C2024] md:text-3">
        Language:
      </Text>
      <Flex className="gap-[2px]">
        {staffWithClinicsAndSlots.staff?.spokenLanguages?.map((language) => (
          <Text
            className="text-2 font-regular leading-5 text-[#575759] after:content-[','] last:after:hidden md:text-3"
            key={language}
          >
            {language}
          </Text>
        ))}
      </Flex>
    </Flex>
  </Flex>
)

const ClinicsDropDown = ({
  clinics,
  onClinicSelect,
  selectedClinicIndex,
  slotsLoading,
}: {
  clinics: ClinicWithSlots[]
  onClinicSelect: (id: number) => void
  selectedClinicIndex: number
  slotsLoading: boolean
}) => {
  const closeRef = useRef<HTMLButtonElement>(null)

  const closeMenu = useCallback(() => {
    if (closeRef.current) {
      closeRef.current.click()
    }
  }, [closeRef])

  const defaultClinic = clinics[selectedClinicIndex]
  return (
    <Popover.Root>
      <Popover.Close ref={closeRef} id="popover-close">
        <div />
      </Popover.Close>
      <Popover.Trigger
        className="cursor-pointer rounded-3 p-1 hover:bg-gray-2"
        disabled={slotsLoading}
      >
        <Flex key={defaultClinic.clinic.id}>
          <Text className="text-2 text-[#575759] md:text-3">
            {defaultClinic?.clinic.name}{' '}
            {defaultClinic?.clinic.contact?.addresses?.[0].street1}{' '}
            {defaultClinic?.clinic.contact?.addresses?.[0].city}
            {', '}
            {defaultClinic?.clinic.contact?.addresses?.[0].state}{' '}
            {defaultClinic?.clinic.contact?.addresses?.[0].postalCode}
          </Text>
          <Flex>
            <DownArrowIcon
              height={isMobile() ? 12 : 18}
              width={isMobile() ? 12 : 18}
            />
          </Flex>
        </Flex>
      </Popover.Trigger>
      <Popover.Content
        align="end"
        className="max-h-[300px] overflow-y-auto p-2"
      >
        {clinics.map((clinic, idx) => (
          <Box
            key={clinic.clinic.id}
            className="cursor-pointer rounded-3 py-2 text-[#575759] hover:bg-[#151B4A] hover:text-[#FFFFFF]"
            onClick={() => {
              onClinicSelect(idx)
              closeMenu()
            }}
          >
            <Flex>
              <Flex className="w-7">
                {idx === selectedClinicIndex && (
                  <CheckIcon color="#151B4A" height={18} width={18} />
                )}
              </Flex>
              <Flex pr="7">
                <Text size="2">
                  {clinic.clinic.name}{' '}
                  {clinic.clinic.contact?.addresses?.[0].street1}
                  <br />
                  {clinic.clinic.contact?.addresses?.[0].city}
                  {', '}
                  {clinic.clinic.contact?.addresses?.[0].state}{' '}
                  {clinic.clinic.contact?.addresses?.[0].postalCode}
                </Text>
              </Flex>
            </Flex>
          </Box>
        ))}
      </Popover.Content>
    </Popover.Root>
  )
}

export { ProviderWithClinicAndWeeklyAvailability }
