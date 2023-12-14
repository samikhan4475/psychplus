import { Flex } from '@radix-ui/themes'
import { CarePlanCard, FooterMenuCard } from '@/components'

const HomePage = () => {
  return (
    <Flex px={{ md: '8', lg: '9' }} p="4" py="5" direction={'column'} gap="8">
      <CarePlanCard />
      <FooterMenuCard />
    </Flex>
  )
}

export default HomePage
