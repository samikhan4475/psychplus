'use client'

import { CalendarIcon, Cross2Icon, VideoIcon } from '@radix-ui/react-icons'
import { Avatar, Flex, Text } from '@radix-ui/themes'
import { Button } from '@psychplus/ui/button'
import { Dialog } from '@psychplus/ui/dialog'
import { BookAppointmentForm } from './book-appointment-form'

//will fetch this information from API
const providerProfile = {
  name: 'Daniel Kent',
  credentials: 'MD',
  type: 'Psychiatrist',
  address: '1111 Marcus Avenue, New Hyde Park, Texas, 11042',
}

const slotInformation = {
  date: '12/11/2023',
  time: '01:00 AM',
}

const BookAppointmentDialog = () => {
  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <Button>BOOK APPOINTMENT</Button>
      </Dialog.Trigger>
      <Dialog.Content className="relative max-w-[850px] p-6">
        <Dialog.Close className="absolute right-4 top-4 cursor-pointer">
          <Cross2Icon />
        </Dialog.Close>
        <Flex align="center" direction="column">
          <Dialog.Title mb="5">Appointment Information</Dialog.Title>
        </Flex>
        <Flex mb="4">
          <Flex mr="8">
            <Avatar
              size="8"
              src="https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?&w=256&h=256&q=70&crop=focalpoint&fp-x=0.5&fp-y=0.3&fp-z=1&fit=crop"
              fallback="A"
            />
            <Flex direction="column" ml="4" mt="3">
              <Text size="4" className="font-bold">
                {providerProfile.name.toLocaleUpperCase()},{' '}
                {providerProfile.credentials}
              </Text>
              <Text size="3" mt="1">
                {providerProfile.type}
              </Text>
            </Flex>
          </Flex>

          <Flex direction="column" ml="9">
            <Flex className="mb-2" align="center">
              {/* Need stethoscope icon not found from redis icons*/}
              <CalendarIcon color="#007bff" />

              <Text size="3" ml="2">
                {providerProfile.name.toLocaleUpperCase()},{' '}
                {providerProfile.credentials}
              </Text>
            </Flex>

            <Flex className="mb-2" align="center">
              <CalendarIcon color="#007bff" />
              <Text size="3" ml="2">
                {slotInformation.date} {slotInformation.time}
              </Text>
            </Flex>

            <Flex className="mb-2" align="center">
              <VideoIcon color="#007bff" />
              <Text size="3" ml="2">
                Blue Shield
              </Text>
            </Flex>

            <Flex className="mb-2" align="center">
              {/* Need map icon not found from redis icons*/}
              <VideoIcon color="#007bff" />

              <Text size="3" ml="2" className="font-bold">
                Either
              </Text>
            </Flex>

            <Text size="3" className="mb-2 whitespace-nowrap">
              {providerProfile.address}
            </Text>
          </Flex>
        </Flex>

        <BookAppointmentForm />
      </Dialog.Content>
    </Dialog.Root>
  )
}

export { BookAppointmentDialog }
