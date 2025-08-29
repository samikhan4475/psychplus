'use client'

import { useState } from 'react'
import { cn } from '@psychplus-v2/utils'
import { Button, Dialog, Flex, Text } from '@radix-ui/themes'
import { CloseDialogIcon } from '@/components-v2'

interface JoinNowButtonProps {
  checkCallEligibility: () => boolean
  setIsStartCall: (value: boolean) => void
  className?: string
}

const JoinNowButton = ({
  checkCallEligibility,
  setIsStartCall,
  className = '',
}: JoinNowButtonProps) => {
  const [open, setOpen] = useState(false)

  return checkCallEligibility() ? (
    <Button
      highContrast
      className={cn(className)}
      variant="solid"
      size="3"
      type="button"
      onClick={() => setIsStartCall(true)}
    >
      Join Now
    </Button>
  ) : (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Flex align="start" className="group cursor-pointer">
        <Dialog.Trigger>
          <Text className={cn('text-[#194595] underline', className)} size="2">
            <Button
              highContrast
              className={cn(className)}
              variant="solid"
              size="3"
              type="button"
            >
              Join Now
            </Button>
          </Text>
        </Dialog.Trigger>
      </Flex>
      <Dialog.Content className="relative">
        <CloseDialogIcon />
        <Dialog.Title className="font-sans -tracking-[0.25px]">
          Cannot join the virtual call
        </Dialog.Title>
        <Dialog.Description size="3">
          You have a Co-Pay or Co-Ins due and you must have an active card on
          file in order to proceed, please update card and try again
        </Dialog.Description>
        <Flex gap="3" mt="4" justify="end">
          <Dialog.Close>
            <Button variant="outline" color="gray" highContrast>
              Close
            </Button>
          </Dialog.Close>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  )
}

export default JoinNowButton
