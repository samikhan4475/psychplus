'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Flex, Text } from '@radix-ui/themes'
import { Button } from '@psychplus/ui/button'
import { goldColor } from '@/components'

const Header = () => {
  const router = useRouter()

  return (
    <Flex
      className="h-72 w-full bg-no-repeat"
      style={backgroundImageStyle}
      direction="column"
    >
      <Flex className="h-1/2" px="7">
        <Flex className="h-24 w-full" align="center" gap="3">
          <Flex className="flex-1">
            <Image
              src="/images/psychplus-logo.png"
              alt="Psych+ logo"
              width={150}
              height={10}
            />
          </Flex>

          <Flex gap="5">
            <Button
              radius="full"
              variant="outline"
              className="w-20 py-5 text-gray-1"
              style={{ border: '1px solid white' }}
              onClick={() => router.push(`/login`)}
            >
              <Text size="1">Login</Text>
            </Button>

            <Button
              radius="full"
              className="w-28 py-5"
              style={{ background: goldColor, color: 'black' }}
              onClick={() => router.push(`/signup`)}
            >
              <Text size="1">Join Now</Text>
            </Button>
          </Flex>
        </Flex>
      </Flex>
      <Flex align="center" justify="center">
        <Text size="9" className="text-gray-1">
          Schedule An Appointment
        </Text>
      </Flex>
    </Flex>
  )
}

const backgroundImageStyle = {
  backgroundImage: 'url("/images/self-scheduling-header.png")',
  backgroundSize: '85% 160%',
  backgroundColor: '#194595',
  backgroundPosition: 'left 13% top -15%',
}

export { Header }
