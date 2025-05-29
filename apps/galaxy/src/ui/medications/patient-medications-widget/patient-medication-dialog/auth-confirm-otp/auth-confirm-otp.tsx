'use client'

import React from 'react'
import { Button, Flex } from '@radix-ui/themes'
import { cn } from '@/utils'
import { IconBlock } from '../shared'

interface AuthConfirmOtpProps {
  onPrev: () => void
}
const AuthConfirmOtp = ({ onPrev }: AuthConfirmOtpProps) => {
  return (
    <Flex direction="column" justify="between" className={cn('min-h-[262px]')}>
      <IconBlock
        title="Waiting for your response.... This will expire in 2 minutes"
        className="mt-2 border-0 !py-3 px-14 text-center"
        textClassName="text-2"
      />
      <Flex justify="end">
        <Button
          size="2"
          variant="outline"
          color="gray"
          type="button"
          className="text-black"
          onClick={onPrev}
        >
          Back
        </Button>
      </Flex>
    </Flex>
  )
}

export { AuthConfirmOtp }
