'use client'

import { useEffect, useState } from 'react'
import { cn } from '@psychplus-v2/utils'
import { Button, Dialog, Flex } from '@radix-ui/themes'
import { CloseDialogIcon } from '@/components-v2'

interface JoinNowButtonProps {
  checkCallEligibility: () => boolean
  setIsStartCall: (value: boolean) => void
  className?: string
  targetDate: string
  isUnAuthenticated?: boolean
}

const JoinNowButton = ({
  checkCallEligibility,
  setIsStartCall,
  className = '',
  targetDate,
  isUnAuthenticated = false,
}: JoinNowButtonProps) => {
  const validTime = isUnAuthenticated ? 30 : 15
  const [open, setOpen] = useState(false)
  const [isWithinValidTime, setIsWithinValidTime] = useState(false)

  const isEligible = checkCallEligibility()

  useEffect(() => {
    const target = new Date(targetDate).getTime()

    const checkTime = () => {
      const now = new Date().getTime()
      const difference = target - now
      const minutesLeft = difference / (1000 * 60)
      setIsWithinValidTime(minutesLeft <= validTime && minutesLeft > 0)
    }

    checkTime()
    const timer = setInterval(checkTime, 1000 * validTime)

    return () => clearInterval(timer)
  }, [targetDate])

  if (isEligible) {
    return (
      <Button
        highContrast
        className={cn(className)}
        variant="solid"
        size="3"
        type="button"
        disabled={!isWithinValidTime}
        onClick={() => setIsStartCall(true)}
      >
        Join Now
      </Button>
    )
  }

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Flex align="start" className="group cursor-pointer">
        <Dialog.Trigger>
          <Button
            highContrast
            className={cn(className)}
            variant="solid"
            size="3"
            type="button"
          >
            Join Now
          </Button>
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
