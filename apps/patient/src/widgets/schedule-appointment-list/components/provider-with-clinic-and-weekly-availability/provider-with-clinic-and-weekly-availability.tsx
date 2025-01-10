'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { CheckIcon, StarFilledIcon, StarIcon } from '@radix-ui/react-icons'
import { Box, Flex, Text } from '@radix-ui/themes'
import { getCodeDisplay } from '@psychplus/codeset'
import { getStaffProfilePicture } from '@psychplus/staff/api.client'
import { Popover } from '@psychplus/ui/popover'
import { DownArrowIcon } from '@/components'
import { DistanceIcon } from '@/components/icons/distance-icon'
import { LocationMarkerIcon } from '@/components/icons/location-marker-icon'
import { WeeklyAvailabilitySlots } from '../../components'
import { useStore } from '../../store'
import type {
  ClinicWithSlots,
  StaffWithClinicsAndSlots,
} from '../../types'
import { renderProfileImage, renderStaffName } from '../../utils'

const ProviderWithClinicAndWeeklyAvailability = ({
  staffWithClinicsAndSlots,
  onConfirm,
}: {
  staffWithClinicsAndSlots: StaffWithClinicsAndSlots
  onConfirm?: () => void
}) => {
  const [profileImage, setProfileImage] = useState<string | undefined>()
  const { codeSetIndex, filters } = useStore()
  const specialistTypeCodeSet = codeSetIndex.SpecialistType

  const [selectedClinicId, setSelectedClinicId] = useState(
    staffWithClinicsAndSlots.clinicWithSlots[0].clinic.id,
  )

  useEffect(() => {
    getStaffProfilePicture(staffWithClinicsAndSlots.staff.id).then(
      setProfileImage,
    )
  }, [])

  return (
    <Flex className="hhera w-full flex-col gap-5 sm:flex-row sm:gap-0">
      <Flex direction="column" gap="2" className="w-[343px] lg:w-[425px]">
        <Flex align="center" gap="2" className="w-11/12">
          {renderProfileImage(
            profileImage,
            staffWithClinicsAndSlots.staff.legalName.firstName[0],
          )}
          <Flex direction="column" gap="1" className="text-[#151B4A]">
            <Text className="font-bold" size="5">
              {renderStaffName(staffWithClinicsAndSlots.staff)}
            </Text>

            <Flex align="center" gap="1">
              {Array.from({ length: 5 }, (_, index) => index + 1).map(
                (value) => (
                  <Box key={value}>
                    {value <=
                    (staffWithClinicsAndSlots.staff.rating?.valueOf() ?? 0) ? (
                      <StarFilledIcon height={16} width={16} color="#FFC700" />
                    ) : (
                      <StarIcon height={16} width={16} color="#FFC700" />
                    )}
                  </Box>
                ),
              )}
              <Text className="text-xs pt-[1px] font-medium text-[#1C2024]">
                {staffWithClinicsAndSlots.staff.rating?.valueOf()}
                <Text className="text-normal text-[#60646C]">(10)</Text>
              </Text>
            </Flex>

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
          selectedClinicId,
          setSelectedClinicId,
        )}
      </Flex>

      <Flex
        style={{ flex: filters.appointmentType === 'In-Person' ? 1.6 : 1.7 }}
      >
        <WeeklyAvailabilitySlots
          staff={staffWithClinicsAndSlots.staff}
          staffTypeCode={staffWithClinicsAndSlots.staffTypeCode}
          clinicWithSlots={staffWithClinicsAndSlots.clinicWithSlots.find(
            (clinic) => clinic.clinic.id === selectedClinicId,
          )}
          onConfirm={onConfirm}
        />
      </Flex>
    </Flex>
  )
}

const renderLanguageAndLocation = (
  appointmentType: string,
  staffWithClinicsAndSlots: StaffWithClinicsAndSlots,
  selectedClinicId: number,
  onChangeLocation: (id: number) => void,
) => (
  <Flex direction="column" gap="2" className="w-[272px]">
    {appointmentType === 'In-Person' && (
      <Flex gap="1">
        <Flex mt="1">
          <LocationMarkerIcon />
        </Flex>
        <ClinicsDropDown
          clinics={staffWithClinicsAndSlots.clinicWithSlots}
          onClinicSelect={onChangeLocation}
          selectedClinicId={selectedClinicId}
        />
      </Flex>
    )}

    {appointmentType === 'In-Person' && (
      <Flex align="start" className="w-52 flex-wrap justify-between" gap="2">
        <Flex align="end" className="gap-[17px]">
            <DistanceIcon />
            <Text className="text-[#575759] text-[14px]">
              {
                staffWithClinicsAndSlots.clinicWithSlots.find(
                  (clinic) => clinic.clinic.id === selectedClinicId,
                )?.clinic.distanceInMiles
              }
              mi
            </Text>
          </Flex>
      </Flex>
    )}

    <Flex gap="3" align="start" className="w-24">
      <Text
        className="text-[14px] font-regular leading-5 text-[#1C2024]"
        size="2"
      >
        Language:
      </Text>
      <Flex className="gap-[2px]">
        {staffWithClinicsAndSlots.staff?.spokenLanguages?.map((language) => (
          <Text className="text-[#575759] text-[14px] font-regular leading-5 after:content-[','] last:after:hidden" key={language}>
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
  selectedClinicId,
}: {
  clinics: ClinicWithSlots[]
  onClinicSelect: (id: number) => void
  selectedClinicId: number
}) => {
  const closeRef = useRef<HTMLButtonElement>(null)

  const closeMenu = useCallback(() => {
    if (closeRef.current) {
      closeRef.current.click()
    }
  }, [closeRef])

  const defaultClinic = clinics.find(
    (clinic) => clinic.clinic.id === selectedClinicId,
  )

  const uniqueClinics = clinics.filter(
    (clinic, index, self) =>
      index === self.findIndex((c) => c.clinic.id === clinic.clinic.id),
  )

  return (
    <Popover.Root>
      <Popover.Close ref={closeRef} id="popover-close">
        <div />
      </Popover.Close>
      <Popover.Trigger className="cursor-pointer rounded-3 p-1 hover:bg-gray-2">
        <Flex key={defaultClinic?.clinic.id}>
          <Text className="text-[#575759] text-[14px]">
            {defaultClinic?.clinic.name}{' '}
            {defaultClinic?.clinic.contact?.addresses?.[0].street1}{' '}
            {defaultClinic?.clinic.contact?.addresses?.[0].city}
            {', '}
            {defaultClinic?.clinic.contact?.addresses?.[0].state}{' '}
            {defaultClinic?.clinic.contact?.addresses?.[0].postalCode}
          </Text>
          <Flex>
            <DownArrowIcon height={18} width={18} />
          </Flex>
        </Flex>
      </Popover.Trigger>
      <Popover.Content
        align="end"
        className="max-h-[300px] overflow-y-auto p-2"
      >
        {uniqueClinics.map((clinic) => (
          <Box
            key={clinic.clinic.id}
            className="cursor-pointer rounded-3 py-2 text-[#575759] hover:bg-[#151B4A] hover:text-[#FFFFFF]"
            onClick={() => {
              onClinicSelect(clinic.clinic.id)
              closeMenu()
            }}
          >
            <Flex>
              <Flex className="w-7">
                {clinic.clinic.id === selectedClinicId && (
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
