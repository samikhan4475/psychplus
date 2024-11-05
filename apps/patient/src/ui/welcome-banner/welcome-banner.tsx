import { User } from '@psychplus-v2/auth'
import { AppointmentType } from '@psychplus-v2/constants'
import { Flex, Heading, Text } from '@radix-ui/themes'
import { getProfile } from '@/api'
import { ViewContainer } from '@/components-v2'
import { BannerAppointmentButton } from './banner-button'

const WelcomeBanner = async () => {
  const profileResponse = await getProfile()
  if (profileResponse.state === 'error') {
    throw new Error(profileResponse.error)
  }

  const profile = profileResponse.data
  const user: User = {
    userId: String(profile.id),
    firstName: profile.legalName.firstName,
    lastName: profile.legalName.lastName,
    email: profile.contactDetails.email,
  }

  return (
    <Flex direction="column" className="bg-accent-12">
      <ViewContainer className="px-9 py-14">
        <Heading
          weight="bold"
          className="text-white text-[32px] leading-8 sm:text-[42px]"
        >
          {`Welcome ${user.firstName}, we're here to help.`}
        </Heading>
        <Flex direction={{ initial: 'column', xs: 'row' }} width="100%">
          <Text weight="medium" className="text-white text-[20px]">
            Schedule an Appointment
          </Text>

          {/* <NextLink
            href="/appointments/search"
            className="flex items-center text-[20px] text-[#8BD5C9] underline-offset-4 hover:underline"
          >
            <Text>View all Appointments</Text>
            <CaretRightIcon width={20} height={20} className="-ml-[2px]" />
          </NextLink> */}
        </Flex>
        <Flex gap="4" direction={{ initial: 'column', xs: 'row' }} width="100%">
          <BannerAppointmentButton
            appointmentType={AppointmentType.InPerson}
            profile={profile}
          />
          <BannerAppointmentButton
            appointmentType={AppointmentType.Virtual}
            profile={profile}
          />
        </Flex>
      </ViewContainer>
    </Flex>
  )
}

export { WelcomeBanner }
