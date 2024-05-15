'use client'

import { Flex, Heading, Link, Text } from '@radix-ui/themes'
import { AppLink } from '@psychplus/ui/app-link'
import { SignupForm } from './signup-form'

const SignupPage = () => (
  <Flex>
    <div className="hidden bg-accent-9 md:block md:w-4/12" />
    <Flex direction="column" justify="center" grow="1" py="4" px="6" mt="9">
      <Flex align="center" justify="center" grow="1">
        <Flex direction="column" className="w-full xs:w-80">
          <Heading size="7" align="center" mb="6">
            Sign Up
          </Heading>
          <SignupForm />
          <Text size="2" mb="5">
            Already have an account?
            <Link size="2" ml="1" asChild>
              <AppLink href="/login" data-testid="signup-login-link">
                Sign in
              </AppLink>
            </Link>
          </Text>
        </Flex>
      </Flex>
    </Flex>
  </Flex>
)

export default SignupPage
