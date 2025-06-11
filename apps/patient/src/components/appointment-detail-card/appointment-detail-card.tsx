import React, { useEffect, useState } from 'react'
import { Flex, Text } from '@radix-ui/themes'
import { getCodeDisplay } from '@psychplus/codeset'
import { getStaffProfilePicture } from '@psychplus/staff/api.client'
import { formatStartDate } from '@psychplus/utils/time'
import {
  useStore,
  type BookedSlot,
} from '@/widgets/schedule-appointment-list/store'
import {
  renderProfileImage,
  renderStaffName,
} from '@/widgets/schedule-appointment-list/utils'

interface BookedStaffAndClinicDetailsProps {
  className?: string
}

const BookedStaffAndClinicDetails = ({
  className,
}: BookedStaffAndClinicDetailsProps) => {
  const { bookedSlot } = useStore()
  const [profileImage, setProfileImage] = useState<string | undefined>()

  const [bookedSlotState, setBookedSlotState] = useState<
    BookedSlot | undefined
  >()

  useEffect(() => {
    setBookedSlotState(bookedSlot)
  }, [bookedSlot])

  useEffect(() => {
    getStaffProfilePicture(bookedSlot?.specialist?.id).then(setProfileImage)
  }, [bookedSlot])

  return (
    <Flex className={className} gap="2">
      {renderProfileImage(
        profileImage,
        bookedSlotState?.specialist.legalName.firstName[0],
      )}

      <Flex direction="column" className="text-[#151B4A" gap="1">
        <Text className="font-bold text-3 md:text-5">
          {renderStaffName(bookedSlotState?.specialist)}
        </Text>

        <Text className="text-2 md:text-4" size="4">{formatStartDate(bookedSlotState?.startDate)}</Text>

        <Flex className="text-[#194595]" gap="4">
          <Text  className="text-2 md:text-3">
            {bookedSlotState?.specialistTypeCode === 1 ? 'Psychiatrist' : 'Therapist'}
          </Text>
          <Text className="text-2 md:text-3">{bookedSlotState?.type}</Text>
        </Flex>
        {bookedSlotState?.type === 'In-Person' && (
          <Flex gap="2">
            <Text className="text-[#575759] text-1 md:text-2" size="2">
              {bookedSlotState?.clinic?.name.trim()}
              {', '}
              {bookedSlotState?.clinic?.contact?.addresses?.[0].street1}{' '}
              {bookedSlotState?.clinic?.contact?.addresses?.[0].city}
              {', '}
              {bookedSlotState?.clinic?.contact?.addresses?.[0].state}{' '}
              {bookedSlotState?.clinic?.contact?.addresses?.[0].postalCode}
            </Text>
          </Flex>
        )}
      </Flex>
    </Flex>
  )
}

export default BookedStaffAndClinicDetails
