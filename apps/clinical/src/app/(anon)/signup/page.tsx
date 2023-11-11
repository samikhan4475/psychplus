'use client'

import NextLink from 'next/link'
import { COPYRIGHT_TEXT } from '@psychplus/constants/strings'
import { Flex, Heading, Link, Text } from '@radix-ui/themes'
import { SignupForm } from './signup-form'

const SignupPage = () => (
  <Flex height="100%">
    <div className="hidden bg-accent-9 md:block md:w-4/12" />
    <Flex direction="column" justify="center" grow="1" py="4" px="6">
      <Flex align="center" justify="center" grow="1">
        <Flex direction="column" className="w-full xs:w-80">
          <Heading size="7" align="center" mb="6">
            Sign up
          </Heading>
          <SignupForm />
          <Text size="2">
            Aleady have an account?
            <Link size="2" ml="1" asChild>
              <NextLink href="/login" data-testid="signup-login-link">
                Sign in
              </NextLink>
            </Link>
          </Text>
        </Flex>
      </Flex>
      <Flex direction="column" gap="2" align="center" justify="between">
        <Flex gap="3">
          <Link size="2" asChild data-testid="signup-terms-link">
            <NextLink href="/">Terms & Conditions</NextLink>
          </Link>
          <Link size="2" asChild data-testid="signup-privacy-link">
            <NextLink href="/">Privacy Policy</NextLink>
          </Link>
        </Flex>
        <Text size="2">{COPYRIGHT_TEXT}</Text>
      </Flex>
    </Flex>
  </Flex>
)

export default SignupPage
