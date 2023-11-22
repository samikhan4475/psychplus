'use client'

import { Flex, Heading, Link, Text } from '@radix-ui/themes'
import { AppLink } from '@psychplus/ui/app-link'
import { COPYRIGHT_TEXT } from '@psychplus/utils/constants'
import { LoginForm } from './login-form'

interface LoginPageProps {
  showSignupLink?: boolean
}

const LoginPage = ({ showSignupLink = true }: LoginPageProps) => (
  <Flex height="100%">
    <div className="hidden bg-accent-9 md:block md:w-4/12" />
    <Flex direction="column" justify="center" grow="1" py="4" px="6">
      <Flex align="center" justify="center" grow="1">
        <Flex direction="column" className="w-full xs:w-80">
          <Heading size="7" align="center" mb="6">
            Sign in
          </Heading>
          <LoginForm />
          {showSignupLink ? (
            <Text size="2" mt="4">
              Don&apos;t have an account?
              <Link size="2" ml="1" asChild>
                <AppLink href="/signup" data-testid="login-signup-link">
                  Sign up
                </AppLink>
              </Link>
            </Text>
          ) : null}
        </Flex>
      </Flex>

      <Flex direction="column" gap="2" align="center" justify="between">
        <Flex gap="3">
          <Link size="2" asChild data-testid="login-terms-link">
            <AppLink href="/">Terms & Conditions</AppLink>
          </Link>
          <Link size="2" asChild data-testid="login-privacy-link">
            <AppLink href="/">Privacy Policy</AppLink>
          </Link>
        </Flex>
        <Text size="2">{COPYRIGHT_TEXT}</Text>
      </Flex>
    </Flex>
  </Flex>
)

export { LoginPage }
