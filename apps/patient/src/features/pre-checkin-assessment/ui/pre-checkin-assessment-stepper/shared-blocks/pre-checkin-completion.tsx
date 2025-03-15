'use client'

import NextLink from 'next/link'
import { Button, Container, Flex, Text } from '@radix-ui/themes'
import { BookingConfirmedIcon } from '@/components-v2'

const PreCheckInCompletion = () => {
  return (
    <Flex className="w-full justify-center">
      <Container className="px-6 text-center sm:w-[40%]">
        <Flex justify="center" mb="4">
          <BookingConfirmedIcon />
        </Flex>

        <Text className="text-[20px] font-[600] sm:text-[32px]">
          Form Successfully Saved
        </Text>

        <Flex direction="column" align="center" mt="2">
          <Text className="max-w-[430px] text-[18px] font-[400] text-[#60646C]">
            Your Pre-Checkin Assessment form has been saved and submitted
            successfully
          </Text>
        </Flex>

        <NextLink href="/">
          <Button
            className="mt-6 bg-[#151B4A]"
            radius="full"
            size="3"
            highContrast
          >
            <Text className="px-10">Done</Text>
          </Button>
        </NextLink>
      </Container>
    </Flex>
  )
}

export { PreCheckInCompletion }
