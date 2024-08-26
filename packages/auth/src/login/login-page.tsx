'use client'

import NextLink from 'next/link'
import { Flex, Heading, Link, Text } from '@radix-ui/themes'
import { COPYRIGHT_TEXT } from '@psychplus/utils/constants'
import { LoginForm } from './login-form'

interface LoginPageProps {
  showSignupLink?: boolean
  redirectTo?: string
  basePath: string
}

const LoginPage = ({
  showSignupLink = true,
  redirectTo,
  basePath,
}: LoginPageProps) => (
  <Flex height="100%">
    <div className="hidden bg-accent-9 md:block md:w-4/12" />
    <Flex direction="column" justify="center" flexGrow="1" py="4" px="6">
      <Flex align="center" justify="center" flexGrow="1">
        <Flex direction="column" className="w-full xs:w-80">
          <Heading size="7" align="center" mb="6">
            Sign in
          </Heading>
          <LoginForm redirect={redirectTo ?? undefined} basePath={basePath} />
          {showSignupLink ? (
            <Text size="2" mt="4">
              Don&apos;t have an account?
              <Link size="2" ml="1" asChild>
                <NextLink href="/signup" data-testid="login-signup-link">
                  Sign up
                </NextLink>
              </Link>
            </Text>
          ) : null}
        </Flex>
      </Flex>

      <Flex direction="column" gap="2" align="center" justify="between">
        <Flex gap="3">
          <Link size="2" asChild data-testid="login-terms-link">
            <NextLink href="/">Terms & Conditions</NextLink>
          </Link>
          <Link size="2" asChild data-testid="login-privacy-link">
            <NextLink href="/">Privacy Policy</NextLink>
          </Link>
        </Flex>
        <Text size="2">{COPYRIGHT_TEXT}</Text>
      </Flex>
    </Flex>
  </Flex>
)

export { LoginPage }
