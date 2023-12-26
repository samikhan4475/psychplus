import { Flex } from '@radix-ui/themes'
import {
  ActiveMedicationCard,
  CarePlanCard,
  CareTeamCard,
  FooterMenuCard,
  ScheduledAppointmentCard,
} from '@/components'
import { PatientProfileCard } from '@/components/patient-profile-card'

const HomePage = () => {
  return (
    <Flex px={{ md: '8', lg: '9' }} p="4" py="5" direction="column" gap="8">
      <CarePlanCard />
      <Flex
        gap="6"
        className="max-xs:flex-col xs:flex-col sm:flex-col md:flex-row lg:flex-row"
      >
        <Flex
          className="max-md:w-full md:w-1/3 lg:w-1/3 xl:w-1/3"
          gap="6"
          direction="column"
        >
          <PatientProfileCard />
          <CareTeamCard />
        </Flex>
        <Flex className="w-full">
          <ScheduledAppointmentCard />
        </Flex>
      </Flex>
      <ActiveMedicationCard />
      <FooterMenuCard />
    </Flex>
  )
}

export default HomePage
