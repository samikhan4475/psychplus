'use client'

import NextLink from 'next/link'
import { Flex, Heading, Link, Text } from '@radix-ui/themes'
import { COPYRIGHT_TEXT } from '@psychplus/utils/constants'
import { UpdatePasswordForm } from './update-password-form'

const UpdatePasswordPage = () => (
  <Flex height="100%">
    <div className="hidden bg-accent-9 md:block md:w-4/12" />
    <Flex direction="column" justify="center" grow="1" py="4" px="6">
      <Flex align="center" justify="center" grow="1">
        <Flex direction="column" className="w-full xs:w-80">
          <Heading size="7" align="center" mb="6">
            Update Password
          </Heading>
          <UpdatePasswordForm />
          <Text size="2" mt="4">
            Aleady have an account?
            <Link size="2" ml="1" asChild>
              <NextLink href="/login" data-testid="update-password-login-link">
                Sign in
              </NextLink>
            </Link>
          </Text>
        </Flex>
      </Flex>
      <Flex direction="column" gap="2" align="center" justify="between">
        <Flex gap="3">
          <Link size="2" asChild data-testid="update-password-terms-link">
            <NextLink href="/">Terms & Conditions</NextLink>
          </Link>
          <Link size="2" asChild data-testid="update-password-privacy-link">
            <NextLink href="/">Privacy Policy</NextLink>
          </Link>
        </Flex>
        <Text size="2">{COPYRIGHT_TEXT}</Text>
      </Flex>
    </Flex>
  </Flex>
)

export default UpdatePasswordPage
