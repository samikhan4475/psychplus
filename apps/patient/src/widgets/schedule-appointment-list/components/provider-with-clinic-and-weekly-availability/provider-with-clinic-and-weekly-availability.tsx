'use client'

import { useEffect, useState } from 'react'
import { CheckIcon, GlobeIcon } from '@radix-ui/react-icons'
import { Box, Flex, Text } from '@radix-ui/themes'
import { getCodeDisplay } from '@psychplus/codeset'
import { getStaffProfilePicture } from '@psychplus/staff/api.client'
import { DropdownMenu } from '@psychplus/ui/dropdown-menu'
import { DownArrowIcon, psychPlusBlueColor, StarRating } from '@/components'
import { DistanceIcon } from '@/components/icons/distance-icon'
import { LocationMarkerIcon } from '@/components/icons/location-marker-icon'
import { WeeklyAvailabilitySlots } from '../../components'
import { useStore } from '../../store'
import type { ClinicWithSlots, StaffWithClinicsAndSlots } from '../../types'
import { renderProfileImage, renderStaffName } from '../../utils'

const ProviderWithClinicAndWeeklyAvailability = ({
  staffWithClinicsAndSlots,
}: {
  staffWithClinicsAndSlots: StaffWithClinicsAndSlots
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
    <Flex className="w-full">
      <Flex gap="2" style={{ flex: 0.87 }}>
        {renderProfileImage(
          profileImage,
          staffWithClinicsAndSlots.staff.legalName.firstName[0],
        )}
        <Flex direction="column" className="text-[#151B4A]" gap="3">
          <Text className="font-bold" size="5">
            {renderStaffName(staffWithClinicsAndSlots.staff)}
          </Text>

          <Flex align="center">
            <StarRating filledStars={3} />
            <Text size="1" className="text-[#194595]" ml="1">
              {getCodeDisplay(
                specialistTypeCodeSet,
                staffWithClinicsAndSlots.staffTypeCode.toString(),
              )}
            </Text>
          </Flex>

          {renderLanguageAndLocation(
            filters.appointmentType,
            staffWithClinicsAndSlots,
            selectedClinicId,
            setSelectedClinicId,
          )}
        </Flex>
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
  <Flex direction="column" mt="4" gap="3" className="w-52">
    {appointmentType === 'In-Person' && (
      <Flex gap="2">
        <Flex>
          <LocationMarkerIcon />
        </Flex>
        <ClinicsDropDown
          clinics={staffWithClinicsAndSlots.clinicWithSlots}
          onClinicSelect={onChangeLocation}
          selectedClinicId={selectedClinicId}
        />
      </Flex>
    )}
    <Flex align="start" className="w-52 flex-wrap justify-between" gap="2">
      {appointmentType === 'In-Person' && (
        <Flex gap="2" align="end">
          <DistanceIcon />
          <Text className="text-[#575759]" size="2">
            {
              staffWithClinicsAndSlots.clinicWithSlots.find(
                (clinic) => clinic.clinic.id === selectedClinicId,
              )?.clinic.distanceInMiles
            }
            mi
          </Text>
        </Flex>
      )}

      {staffWithClinicsAndSlots.staff?.spokenLanguages?.map((language) => (
        <Flex gap="2" align="center" className="w-24" key={language}>
          <Flex>
            <GlobeIcon height={20} width={20} color={psychPlusBlueColor} />
          </Flex>

          <Text className="text-[#575759]" size="2">
            {language}
          </Text>
        </Flex>
      ))}
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
  const defaultClinic = clinics.find(
    (clinic) => clinic.clinic.id === selectedClinicId,
  )
  const uniqueClinics = clinics.filter(
    (clinic, index, self) =>
      index === self.findIndex((c) => c.clinic.id === clinic.clinic.id),
  )
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <Flex key={defaultClinic?.clinic.id}>
          <Text className="text-[#575759]" size="2">
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
      </DropdownMenu.Trigger>

      <DropdownMenu.Content
        align="end"
        className="max-h-[300px] overflow-y-auto"
      >
        {uniqueClinics.map((clinic, index) => (
          <Box key={clinic.clinic.id}>
            <DropdownMenu.Item
              className="py-6 text-[#575759] hover:bg-[#151B4A] hover:text-[#FFFFFF]"
              key={clinic.clinic.id}
              onClick={() => onClinicSelect(clinic.clinic.id)}
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
            </DropdownMenu.Item>
            {index < uniqueClinics.length - 1 && (
              <DropdownMenu.Separator className="mx-0 bg-[#F3F6FE]" />
            )}
          </Box>
        ))}
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  )
}

export { ProviderWithClinicAndWeeklyAvailability }
