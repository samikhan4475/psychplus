'use client'

import { useEffect, useState } from 'react'
import NextLink from 'next/link'
import { useSearchParams } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormContainer } from '@psychplus-v2/components'
import { Flex, Heading, Text, TextFieldInput } from '@radix-ui/themes'
import {
  CalendarHeartIcon,
  HandHeartIcon,
  ScrollTextIcon,
  type LucideIcon,
} from 'lucide-react'
import { useForm, type SubmitHandler } from 'react-hook-form'
import { z } from 'zod'
import { loginAction } from '@/actions'
import {
  AnonHeader,
  FormError,
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
  FormSubmitButton,
  PasswordInput,
} from '@/components-v2'

const LOGIN_FORM_EMAIL_INPUT = 'login-form-email-input'
const LOGIN_FORM_PASSWORD_INPUT = 'login-form-password-input'

const schema = z.object({
  username: z.string().trim().min(1, 'Email is required').email(),
  password: z.string().trim().min(1, 'Password is required'),
})

type SchemaType = z.infer<typeof schema>

const LoginPage = () => {
  const searchParams = useSearchParams()
  const [error, setError] = useState<string>()
  const [isResetPassword, setIsResetPassword] = useState(false)

  const form = useForm<SchemaType>({
    resolver: zodResolver(schema),
    reValidateMode: 'onChange',
    defaultValues: {
      username: '',
      password: '',
    },
  })

  useEffect(() => {
    const mid = searchParams.get('mid')
    if (mid) {
      localStorage.setItem('mid', mid)
    }
  }, [searchParams.get('mid')])

  const onSubmit: SubmitHandler<SchemaType> = async (data) => {
    setError(undefined)
    sessionStorage.clear()
    const otherParams = new URLSearchParams(searchParams)
    otherParams.delete('next')
    const nextUrl = searchParams.get('next')
    let next = null
    if (nextUrl) {
      const hasParams = otherParams.toString() !== ''
      const paramString = hasParams ? `?${otherParams.toString()}` : ''
      next = `${nextUrl}${paramString}`
    }

    return loginAction({
      username: data.username.trim(),
      password: data.password.trim(),
      next,
    }).then((result) => {
      if (result?.state === 'error') {
        setError(result.error)
        if (result.error.includes('expired')) {
          setIsResetPassword(true)
        } else {
          setIsResetPassword(false)
        }
      }
    })
  }

  return (
    <Flex direction="column" width="100%">
      <AnonHeader />
      <Flex height="100%">
        <Flex
          direction="column"
          align="center"
          justify="center"
          gap="4"
          px="5"
          className="flex-1 py-20"
        >
          <Flex direction="column" className="w-full max-w-[450px]">
            <Flex direction="column" gap="2" mb="4">
              <Heading weight="medium" className="text-[36px] text-accent-12">
                Welcome back!
              </Heading>
              <Text className="text-gray-12">Log in to continue</Text>
            </Flex>
            <FormError message={error} />
            <FormContainer form={form} onSubmit={onSubmit}>
              <Flex direction="column" gap="6">
                <Flex direction="column" gap="4">
                  <FormFieldContainer>
                    <FormFieldLabel id={LOGIN_FORM_EMAIL_INPUT}>
                      Email
                    </FormFieldLabel>
                    <TextFieldInput
                      size="3"
                      placeholder="Enter email"
                      id={LOGIN_FORM_EMAIL_INPUT}
                      {...form.register('username')}
                    />
                    <FormFieldError name="username" />
                  </FormFieldContainer>
                  <FormFieldContainer>
                    <FormFieldLabel id={LOGIN_FORM_PASSWORD_INPUT}>
                      Password
                    </FormFieldLabel>
                    <PasswordInput
                      size="3"
                      placeholder="Enter password"
                      id={LOGIN_FORM_PASSWORD_INPUT}
                      {...form.register('password')}
                      value={form.watch('password')}
                    />
                    <Flex align="start">
                      <FormFieldError name="password" />
                      <NextLink
                        href={isResetPassword ? "/forgot-password?reset=true" : "/forgot-password"}
                        prefetch={false}
                        className="ml-auto"
                      >
                        <Text className="text-[14px] text-accent-12 underline-offset-2 hover:underline">
                          {isResetPassword ? 'Reset password?' : 'Forgot password?'}
                        </Text>
                      </NextLink>
                    </Flex>
                  </FormFieldContainer>
                </Flex>
                <FormSubmitButton size="4" highContrast>
                  Log in
                </FormSubmitButton>
              </Flex>
            </FormContainer>
            <Text align="center" className="mt-8 text-[15px]">
              First time here?
              <NextLink
                href="/signup"
                className="ml-1 text-accent-11 underline-offset-2 transition-colors hover:text-accent-12 hover:underline"
              >
                Create account
              </NextLink>
            </Text>
          </Flex>
        </Flex>
        <Flex
          align="center"
          justify="center"
          px="5"
          className="hidden flex-1 bg-gray-2 md:flex"
        >
          <Flex
            direction="column"
            align="center"
            className="w-full max-w-[400px]"
          >
            <Heading
              as="h2"
              weight="regular"
              mb="6"
              className="text-[36px] leading-8 text-accent-12"
            >
              A modern approach to mental health care
            </Heading>
            <Flex width="100%" direction="column" gap="5">
              <FeaturedBenefit
                title="Mental health care for all ages"
                description="Get care for any mental health concern"
                Icon={HandHeartIcon}
              />
              <FeaturedBenefit
                title="Same and next day appointments"
                description="Self schedule appointments with our licensed providers both in-office and virtually"
                Icon={CalendarHeartIcon}
              />
              <FeaturedBenefit
                title="Your health records"
                description="Quickly view your medications, treatment plans, and much more"
                Icon={ScrollTextIcon}
              />
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  )
}

const FeaturedBenefit = ({
  title,
  description,
  Icon,
}: {
  title: string
  description: string
  Icon: LucideIcon
}) => (
  <Flex gap="4">
    <Flex
      align="center"
      justify="center"
      className="rounded-full h-[60px] w-[60px]"
    >
      <Icon
        width={35}
        height={35}
        fill="var(--accent-4)"
        strokeWidth={1}
        className="min-w-[35px]"
      />
    </Flex>
    <Flex direction="column" gap="1" className="flex-1">
      <Text className="text-[15px] font-[600]">{title}</Text>
      <Text className="text-[15px] text-gray-12">{description}</Text>
    </Flex>
  </Flex>
)

export default LoginPage
