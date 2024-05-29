import NextLink from 'next/link'
import { getAuthCookies } from '@psychplus-v2/auth'
import { AppointmentType } from '@psychplus-v2/constants'
import { CaretRightIcon } from '@radix-ui/react-icons'
import { Flex, Heading, Text } from '@radix-ui/themes'
import { ViewContainer } from '@/components-v2'
import { BannerAppointmentButton } from './banner-button'

const WelcomeBanner = () => {
  const user = getAuthCookies()!.user

  return (
    <Flex direction="column" className="bg-accent-12">
      <ViewContainer className="px-9 py-14">
        <Heading
          weight="bold"
          className="text-white text-[32px] leading-8 sm:text-[42px]"
        >
          {`Welcome ${user.firstName}, we're here to help.`}
        </Heading>
        <Flex gap="4" direction={{ initial: 'column', xs: 'row' }} width="100%">
          <Text weight="medium" className="text-white text-[20px]">
            Schedule an Appointment
          </Text>

          <NextLink
            href="/appointments/search"
            className="flex items-center text-[20px] text-[#8BD5C9] underline-offset-4 hover:underline"
          >
            <Text>View all Appointments</Text>
            <CaretRightIcon width={20} height={20} className="-ml-[2px]" />
          </NextLink>
        </Flex>
        <Flex gap="4" direction={{ initial: 'column', xs: 'row' }} width="100%">
          <BannerAppointmentButton appointmentType={AppointmentType.InPerson} />
          <BannerAppointmentButton appointmentType={AppointmentType.Virtual} />
        </Flex>
      </ViewContainer>
    </Flex>
  )
}

export { WelcomeBanner }
