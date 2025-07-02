'use client'

import React from 'react'
import { Flex, Link, Text } from '@radix-ui/themes'
import { FormSubmitButton } from '@/components-v2'

const SubmitButtonBlock = () => {
  return (
    <Flex justify="between">
      <Text size="1" weight="medium">
        This form is HIPAA-compliant <br />
        By using this referral tool, you are consenting to <br />
        PsychPlus’s&nbsp;
        <Link
          href="https://psychplus.com/privacy-policy/"
          size="2"
          weight="medium"
          className="text-pp-blue-3 decoration-pp-blue-3 underline"
        >
          Privacy Policy
        </Link>
        &nbsp;and&nbsp;
        <Link
          href="https://psychplus.com/terms-of-service/"
          size="2"
          weight="medium"
          className="text-pp-blue-3 decoration-pp-blue-3 underline"
        >
          Terms & Conditions.
        </Link>
      </Text>
      <FormSubmitButton
        radius="full"
        size="2"
        className="bg-pp-blue-8 disabled:text-white h-[38px] px-4 font-bold disabled:cursor-not-allowed disabled:opacity-60"
      >
        Submit
      </FormSubmitButton>
    </Flex>
  )
}

export { SubmitButtonBlock }
