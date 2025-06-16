import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { AppointmentType } from '@psychplus-v2/constants'
import { Clinic, Consent } from '@psychplus-v2/types'
import {
  getNewProviderTypeLabel,
  getTimeLabel,
  getUserFullName,
} from '@psychplus-v2/utils'
import { StarFilledIcon, StarIcon } from '@radix-ui/react-icons'
import { Box, Button, Dialog, Flex, Text } from '@radix-ui/themes'
import { ProviderAvatar } from '@/components-v2'
import { useProfileStore } from '@/features/account/profile/store'
import { useStore } from '@/features/appointments/search/store'
import type {
  AppointmentAvailability,
  AppointmentClinic,
  AppointmentSlot,
  AppointmentSpecialist,
} from '@/features/appointments/search/types'
import { useSortedFilteredData } from '../../store/hooks'
import { ClinicSelector } from './clinic-selector'
import { ProviderBioDialog } from './provider-bio-dialog'
import { ProviderSlots } from './provider-slots'

interface DialogAction {
  isOpen: boolean
  clinic: Clinic
}

interface AvailabilityListProps {
  userConsents: Consent[]
  setShowDifferentStateDialog: (action: DialogAction) => void
}

interface PrimaryProviderAvailabilityCardProps {
  userConsents: Consent[]
  setShowDifferentStateDialog: (action: DialogAction) => void
  primaryProviderAvailabilityData: AppointmentAvailability
}

const PrimaryProviderAvailabilityCard = ({
  userConsents,
  setShowDifferentStateDialog,
  primaryProviderAvailabilityData,
}: PrimaryProviderAvailabilityCardProps) => {
  if (!primaryProviderAvailabilityData) {
    return (
      <Flex pt="8" justify="center" className="bg-white">
        <Text className="text-[18px] text-gray-11">No results</Text>
      </Flex>
    )
  }

  return (
    <ProviderAvailabilityCard
      userConsents={userConsents}
      data={primaryProviderAvailabilityData}
      setShowDifferentStateDialog={setShowDifferentStateDialog}
    />
  )
}

const AvailabilityList = ({
  userConsents,
  setShowDifferentStateDialog,
}: AvailabilityListProps) => {
  const data = useSortedFilteredData()

  const careTeamMember = useStore((state) => state.careTeamMember())

  if (data.length === 0) {
    return (
      <Flex pt="8" justify="center" className="bg-white flex-1">
        <Text className="text-[18px] text-gray-11">No results</Text>
      </Flex>
    )
  }

  return data.map((availability) => {
    if (availability.specialist.id !== careTeamMember?.staffDetails.id)
      return (
        <ProviderAvailabilityCard
          userConsents={userConsents}
          key={availability.specialist.id}
          data={availability}
          setShowDifferentStateDialog={setShowDifferentStateDialog}
        />
      )
  })
}

const ProviderAvailabilityCard = ({
  data,
  userConsents,
  setShowDifferentStateDialog,
}: {
  userConsents: Consent[]
  data: AppointmentAvailability
  setShowDifferentStateDialog: (action: DialogAction) => void
}) => {
  const [selectedClinic, setSelectedClinic] = useState(0)
  const [slotsLoading, setSlotsLoading] = useState(false)
  const { appointmentType } = useStore((state) => ({
    appointmentType: state.appointmentType,
  }))

  useEffect(() => {
    setSelectedClinic(0)
  }, [appointmentType])

  return (
    <Flex px="5" py="5" className="bg-white border-b border-b-gray-5">
      <Flex direction="column" gap="5" className="mr-[48px] w-[240px]">
        <Flex gap="4">
          <ProviderBioDialog appointmentDetail={data}>
            <Dialog.Trigger>
              <Button
                variant="ghost"
                className="rounded-full p-0 hover:bg-transparent"
              >
                <ProviderAvatar
                  provider={data?.specialist}
                  size="5"
                  className="cursor-pointer"
                />
              </Button>
            </Dialog.Trigger>
            <Flex direction="column" justify="center">
              <Dialog.Trigger>
                <Text
                  weight="bold"
                  size="5"
                  className="cursor-pointer text-accent-12"
                >
                  {`${getUserFullName(data.specialist.legalName)} ${
                    data.specialist.legalName.honors ?? ''
                  }`}
                </Text>
              </Dialog.Trigger>

              <Flex gap="1">
                <Text
                  weight="medium"
                  className="text-pp-gray-1 text-[12px] uppercase"
                >
                  {getNewProviderTypeLabel(data.providerType ?? '')}
                </Text>
                <Flex align="center">
                  {Array.from({ length: 5 }, (_, index) => index + 1).map(
                    (value) => (
                      <Box key={value}>
                        {value <= (data.specialist.rating ?? 0) ? (
                          <StarFilledIcon
                            height={16}
                            width={16}
                            color="#FFC700"
                          />
                        ) : (
                          <StarIcon height={16} width={16} color="#FFC700" />
                        )}
                      </Box>
                    ),
                  )}
                </Flex>
              </Flex>
            </Flex>
          </ProviderBioDialog>
        </Flex>
        <Flex direction="column">
          {appointmentType === AppointmentType.InPerson ? (
            <ClinicSelector
              clinics={data.clinics}
              selectedClinic={selectedClinic}
              onChange={setSelectedClinic}
              slotsLoading={slotsLoading}
            />
          ) : null}
          <Flex gap="2" justify="between" direction={'column'}>
            {renderSpokenLanguages(data)}
            {renderDistance(data.clinics[selectedClinic])}
          </Flex>
        </Flex>
      </Flex>
      <ProviderSlots
        data={data}
        userConsents={userConsents}
        setShowDifferentStateDialog={setShowDifferentStateDialog}
        selectedClinic={selectedClinic}
        onClinicChange={setSelectedClinic}
        setSlotsLoading={setSlotsLoading}
        slotsLoading={slotsLoading}
      />
    </Flex>
  )
}

const AppointmentTimeSlots = ({
  slots,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  userConsents,
  showMore,
  setShowDifferentStateDialog,
  ...rest
}: {
  userConsents: Consent[]
  slots?: AppointmentSlot[]
  specialist: AppointmentSpecialist
  showMore: boolean
  clinic: AppointmentClinic
  providerType?: string | null
  setShowDifferentStateDialog: (action: DialogAction) => void
}) => {
  const { appointmentType, providerType, setCurrentBookingAppointmentData } =
    useStore((state) => ({
      appointmentType: state.appointmentType,
      providerType: state.providerType,
      setCurrentBookingAppointmentData: state.setCurrentBookingAppointmentData,
    }))

  const router = useRouter()

  const { profile } = useProfileStore((state) => ({
    profile: state.profile,
  }))

  const searchParams = useSearchParams()

  if (!slots || slots.length === 0) {
    return null
  }

  const endIndex = showMore ? slots.length : 3

  const handleSlotClick = (slot: AppointmentSlot) => {
    const profileState = profile.contactDetails.addresses?.[0]?.state
    const clinicState = rest.clinic.contact.addresses?.[0]?.state
    const bookingData = {
      appointmentId: searchParams.get('appointmentId')?.toString(),
      appointmentType,
      providerType: providerType,
      newProviderType: rest.providerType || '',
      slot,
      specialist: rest.specialist,
      clinic: {
        id:
          appointmentType === AppointmentType.InPerson
            ? rest.clinic.id
            : slot.clinicId || '',
        name: rest.clinic.name,
        isTest: rest.clinic.isTest || false,
        contact: rest.clinic.contact,
        distanceInMiles: rest.clinic.distanceInMiles,
      },
    }
    setCurrentBookingAppointmentData(bookingData)

    if (appointmentType === AppointmentType.InPerson) {
      if (profileState !== clinicState) {
        setShowDifferentStateDialog({
          isOpen: true,
          clinic: bookingData.clinic,
        })
        return
      }
    }

    router.push(`book`)
  }

  return (
    <>
      {slots.slice(0, endIndex).map((slot: AppointmentSlot) => (
        <Button
          key={`${slot.startDate}:${slot.duration}`}
          variant="outline"
          highContrast
          style={{ boxShadow: 'none' }}
          className="hover:text-white whitespace-nowrap text-[16px] text-[#24366B] outline outline-1 outline-[#b9bbc6] hover:bg-accent-12 hover:outline-accent-12"
          onClick={() => handleSlotClick(slot)}
        >
          {getTimeLabel(slot.startDate)}
        </Button>
      ))}
    </>
  )
}

const renderSpokenLanguages = (data: AppointmentAvailability) => {
  const spokenLanguages = data.specialist.spokenLanguages

  if (!spokenLanguages || spokenLanguages.length === 0) {
    return null
  }

  return (
    <Flex gap="2">
      <Text className="text-[12px] font-[500]">Language:</Text>
      <Text className="text-pp-gray-1 text-[12px] font-[500]">
        {spokenLanguages.join(', ')}
      </Text>
    </Flex>
  )
}

const renderDistance = (clinic: AppointmentClinic) => {
  if (clinic?.distanceInMiles === undefined) {
    return null
  }

  return (
    <Flex align="center" gap="2">
      <Text className="text-[12px] font-[500]">Distance:</Text>
      <Text className="text-pp-gray-1 text-[12.5px] font-[500]">
        {Math.round(clinic.distanceInMiles * 10) / 10} mi
      </Text>
    </Flex>
  )
}

export {
  AvailabilityList,
  PrimaryProviderAvailabilityCard,
  AppointmentTimeSlots,
  renderDistance,
  renderSpokenLanguages,
}
