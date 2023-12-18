import { Box, Flex } from '@radix-ui/themes'
import { CarePlanCard, CareTeamCard, FooterMenuCard } from '@/components'
import { PatientProfileCard } from '@/components/patient-profile-card'

const HomePage = () => {
  return (
    <Flex px={{ md: '8', lg: '9' }} p="4" py="5" direction="column" gap="8">
      <CarePlanCard />
      <Box>
        <Flex
          className="max-md:w-full md:w-1/4 lg:w-1/4 xl:w-1/4"
          gap="6"
          direction="column"
        >
          <PatientProfileCard />
          <CareTeamCard />
        </Flex>
      </Box>
      <FooterMenuCard />
    </Flex>
  )
}

export default HomePage
