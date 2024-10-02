'use client'

import { Button, Flex } from '@radix-ui/themes'
import { useStore } from '../store'

const ClaimTabView = () => {
  const setActiveTab = useStore((state) => state.setActiveTab)
  const onOpenClaim = () => {
    const randomNumber = Math.floor(Math.random() * 1000)
    setActiveTab('Claim# ' + randomNumber)
  }

  const onOpenCheck = () => {
    const randomNumber = Math.floor(Math.random() * 1000)
    setActiveTab('Check# ' + randomNumber)
  }
  return (
    <Flex className="py-2" gap="2">
      <Button highContrast onClick={onOpenClaim}>
        Claim
      </Button>
      <Button highContrast onClick={onOpenCheck}>
        Check
      </Button>
    </Flex>
  )
}

export { ClaimTabView }
