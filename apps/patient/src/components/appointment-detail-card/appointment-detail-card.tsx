import React, { useEffect, useState } from 'react'
import { Flex, Text, Button, Box, Avatar } from '@radix-ui/themes'
import { getStaffProfilePicture } from '@psychplus/staff/api.client'
import { formatStartDate, formatLocalToCustom } from '@psychplus/utils/time'
import { addMinutes } from 'date-fns'
import {
  useStore,
  type BookedSlot,
} from '@/widgets/schedule-appointment-list/store'
import {
  renderStaffName,
} from '@/widgets/schedule-appointment-list/utils'
import { ProviderType } from '@/widgets/schedule-appointment-list/types'
import { BulletDotIcon } from '@/components-v2/icons/bullet-dot'

interface BookedStaffAndClinicDetailsProps {
  showActions?: boolean
}

const BookedStaffAndClinicDetails = ({ showActions = false }: BookedStaffAndClinicDetailsProps) => {
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

  const handleAddToCalendar = () => {
    if (!bookedSlotState) return

    const specialistName = renderStaffName(bookedSlotState.specialist)
    const startDate = new Date(bookedSlotState.startDate)
    const endDate = addMinutes(startDate, bookedSlotState.duration || 30)

    const calendarEvent = {
      title: `Appointment with ${specialistName}`,
      startTime: formatLocalToCustom(startDate),
      endTime: formatLocalToCustom(endDate),
      description: 'Appointment Scheduled',
      location: bookedSlotState.type === 'In-Person'
        ? `${bookedSlotState.clinic?.name}, ${bookedSlotState.clinic?.contact?.addresses?.[0].street1}, ${bookedSlotState.clinic?.contact?.addresses?.[0].city}, ${bookedSlotState.clinic?.contact?.addresses?.[0].state}`
        : 'Psych+ Virtual',
    }

    const googleEventLink = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(calendarEvent.title)}&dates=${calendarEvent.startTime}/${calendarEvent.endTime}&details=${encodeURIComponent(calendarEvent.description)}&location=${encodeURIComponent(calendarEvent.location)}`

    window.open(googleEventLink, '_blank')
  }

  const handlePrint = () => {
    const printId = 'appointment-detail-print'
    const printContent = document.getElementById(printId)

    if (!printContent) {
      const tempDiv = document.createElement('div')
      tempDiv.id = printId
      tempDiv.innerHTML = `
        <div style="font-family: Arial, sans-serif; padding: 20px;">
          <h2>Appointment Details</h2>
          <p><strong>Provider:</strong> ${renderStaffName(bookedSlotState?.specialist)}</p>
          <p><strong>Date:</strong> ${formatStartDate(bookedSlotState?.startDate)}</p>
          <p><strong>Type:</strong> ${bookedSlotState?.type}</p>
          <p><strong>Specialist Type:</strong> ${bookedSlotState?.specialistTypeCode === 1 ? ProviderType.Psychiatrist : ProviderType.Therapist}</p>
          ${bookedSlotState?.type === 'In-Person' ? `<p><strong>Location:</strong> ${bookedSlotState?.clinic?.name}, ${bookedSlotState?.clinic?.contact?.addresses?.[0].street1}, ${bookedSlotState?.clinic?.contact?.addresses?.[0].city}, ${bookedSlotState?.clinic?.contact?.addresses?.[0].state} ${bookedSlotState?.clinic?.contact?.addresses?.[0].postalCode}</p>` : ''}
        </div>
      `
      document.body.appendChild(tempDiv)

      window.print()
      document.body.removeChild(tempDiv)
    } else {
      window.print()
    }
  }

  return (
    <Flex gap="4" align='center' className="flex-col sm:flex-row sm:items-start">
      <Box className='flex-shrink-0'>
        <Avatar
          src={profileImage ?? ''}
          color="gray"
          fallback={bookedSlot?.specialist.legalName.firstName?.[0] ?? 'A'}
          className="h-[80px] w-[80px]"
          radius="full"
        />
      </Box>

      <Box className='space-y-2'>
        <Text className="font-[600] text-[24px] text-pp-blue-7">
          {renderStaffName(bookedSlotState?.specialist)}
        </Text>

        <Flex className="font-medium text-[#1C2024] flex-col sm:flex-row" gap="2" align="start">
          <Text as="p" size="4">{formatStartDate(bookedSlotState?.startDate)}</Text>

          <Flex gap="2" align="center">
            <BulletDotIcon />
            <Text as="p" size="4">
              {bookedSlotState?.specialistTypeCode === 1 ? ProviderType.Psychiatrist : ProviderType.Therapist}
            </Text>
          </Flex>

          <Flex gap="2" align="center">
            <BulletDotIcon />
            <Text as="p" size="4">
              {bookedSlotState?.type}
            </Text>
          </Flex>
        </Flex>

        {bookedSlotState?.type === 'In-Person' && (
          <Flex gap="2">
            <Text as="p" size="4" className='text-[#1C2024] font-medium'>
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

        {showActions ? (
          <Flex gap="2" className="flex-col sm:flex-row">
            <Button
              radius='full'
              variant='outline'
              color='gray'
              className='px-[14px] py-2 w-[136px] text-[#1C2024] bg-white cursor-pointer'
              onClick={handleAddToCalendar}
            >
              Add to Calendar
            </Button>

            <Button
              radius='full'
              variant='outline'
              color='gray'
              className='px-[14px] py-2 w-[136px] text-[#1C2024] bg-white cursor-pointer text-center'
              onClick={handlePrint}
            >
              Print
            </Button>
          </Flex>
        ) : null}
      </Box>
    </Flex>
  )
}

export default BookedStaffAndClinicDetails
