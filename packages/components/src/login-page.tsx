'use client'

import { useState } from 'react'
import NextLink from 'next/link'
import { useSearchParams } from 'next/navigation'
import { Flex, Heading, Link, Text } from '@radix-ui/themes'
import * as api from '@psychplus/api/client'
import { Button } from '@psychplus/ui/button'
import { Checkbox } from '@psychplus/ui/checkbox'
import { TextField } from '@psychplus/ui/text-field'

type InputPropsType = {
  target: {
    name: string
    value: string
  }
}

const LoginPage = () => {
  const searchParams = useSearchParams()
  const [inputValue, setInputValue] = useState({ username: '', password: '' })

  const login = async () => {
    api.login(inputValue).then(() => {
      const next = searchParams.get('next') ?? '/'
      location.assign(next)
    })
  }

  const handleInputChange = (e: InputPropsType) => {
    const { name, value } = e.target
    setInputValue({ ...inputValue, [name]: value })
  }

  const fields = [
    {
      name: 'username',
      type: 'text',
      value: inputValue.username,
      placeholder: 'Email',
      onChange: handleInputChange,
      'data-testid': 'login-username-input',
    },
    {
      name: 'password',
      type: 'password',
      value: inputValue.password,
      placeholder: 'Password',
      onChange: handleInputChange,
      'data-testid': 'login-password-input',
    },
  ]

  return (
    <Flex className="h-full">
      <div className="bg-accent-9 md:w-4/12" />
      <Flex direction="column" justify="center" grow="1" py="4" px="6">
        <Flex align="center" justify="center" grow="1">
          <Flex direction="column" gap="4" className="w-full xs:w-80">
            <Heading size="7" align="center" mb="6">
              Sign in
            </Heading>

            {fields.map((item) => {
              return (
                <TextField.Input
                  key={`input-${item.name}`}
                  size="3"
                  {...item}
                />
              )
            })}

            <Flex align="center" justify="between">
              <Text as="label" size="2">
                <Flex gap="2">
                  <Checkbox defaultChecked /> Remember me
                </Flex>
              </Text>
              <Link size="2" asChild>
                <NextLink href="/forgot-password">Forgot Password?</NextLink>
              </Link>
            </Flex>
            <Button
              data-testid="login-button"
              variant="soft"
              size="3"
              onClick={() => {
                void login()
              }}
            >
              Login
            </Button>
            <Text size="2" weight="medium">
              Don’t have an account?
              <Link size="2" ml="1" asChild>
                <NextLink href="/">Sign up</NextLink>
              </Link>
            </Text>
          </Flex>
        </Flex>

        <Flex direction="column" gap="2" align="center" justify="between">
          <Flex gap="3">
            <Link size="2" asChild>
              <NextLink href="/">Terms & Conditions</NextLink>
            </Link>
            <Link size="2" asChild>
              <NextLink href="/">Privacy Policy</NextLink>
            </Link>
          </Flex>
          <Text size="2">Copyright 2023 PsychPlus. All Rights Reserved</Text>
        </Flex>
      </Flex>
    </Flex>
  )
}

export { LoginPage }
