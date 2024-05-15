'use client'

import { useEffect, useState } from 'react'
import { Button, Dialog, Flex, Text } from '@radix-ui/themes'
import { CheckIcon } from 'lucide-react'
import { CloseDialogIcon } from '@/components-v2'
import { getBenefits } from '../actions'
import { useStore } from '../store'
import { MembershipBenefit } from '../types'

const MembershipBenefitsDialog = () => {
  const { setIsMembershipDialogOpen } = useStore()

  const [membershipBenefits, setMembershipBenefits] =
    useState<MembershipBenefit>()

  useEffect(() => {
    getBenefits().then((res) => {
      if (res.state === 'error') {
        throw new Error(res.error)
      }
      setMembershipBenefits(res.data)
    })
  }, [])

  let originalPrice
  if (membershipBenefits?.priceLevels[0]) {
    originalPrice =
      membershipBenefits.priceLevels[0].cost +
      membershipBenefits.priceLevels[0].savings
  }

  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <Text size="1" className="cursor-pointer text-accent-11 underline">
          View Membership Benefits
        </Text>
      </Dialog.Trigger>
      <Dialog.Content className="relative">
        <CloseDialogIcon />
        <Dialog.Title className="font-sans -tracking-[0.25px]">
          Membership Benefits
        </Dialog.Title>
        {originalPrice && (
          <Flex direction="column" mb="2">
            <Text size="2" className="font-[600]">
              MONTHLY PLAN
            </Text>
            <Flex gap="1">
              <Text className="line-through">${originalPrice}</Text>
              <Text>
                ${membershipBenefits?.priceLevels[0].cost}
                <Text size="1">{'/month'}</Text>
              </Text>
            </Flex>
          </Flex>
        )}

        {membershipBenefits?.benefits.map((benefit) => (
          <Flex key={benefit} gap="2" align="center">
            <CheckIcon color="green" width={16} height={16} />
            <Text> {benefit}</Text>
          </Flex>
        ))}
        <Flex gap="3" mt="4" justify="end">
          <Dialog.Close>
            <Button
              onClick={() => setIsMembershipDialogOpen(true)}
              highContrast
            >
              Upgrade
            </Button>
          </Dialog.Close>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  )
}

export { MembershipBenefitsDialog }
