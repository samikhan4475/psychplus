import Image from 'next/image'
import { Flex } from '@radix-ui/themes'
import { AppLink } from '@psychplus/ui/app-link'
import { Button } from '@psychplus/ui/button'
import { PsychplusMembershipDialog } from '..'
import { HeaderMenuCard } from './header-menu-card'

const PatientsHeader = () => {
  return (
    <Flex className="h-32 bg-gray-12" align="center" px="9">
      <Flex className="w-1/2">
        <AppLink href="/">
          <Image
            src="/images/wight_logo.png"
            alt="pyschplus logo"
            width={127}
            height={50}
            style={{
              display: 'block',
              objectFit: 'cover',
            }}
          />
        </AppLink>
      </Flex>
      <Flex className="w-1/2">
        <HeaderMenuCard />
      </Flex>
      <Flex justify="end" className="w-1/2" gap="4">
        <PsychplusMembershipDialog />
        <Button> LOGOUT </Button>
      </Flex>
    </Flex>
  )
}

export { PatientsHeader }
