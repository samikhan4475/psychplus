'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { CheckCircledIcon, Cross2Icon } from '@radix-ui/react-icons'
import { Flex, Inset, Text } from '@radix-ui/themes'
import { MarketingBenefit } from '@psychplus/metadata'
import { getPlusMembershipBenefits } from '@psychplus/metadata/api.client'
import { Button } from '@psychplus/ui/button'
import { Dialog } from '@psychplus/ui/dialog'

const PsychplusMembershipDialog = () => {
  const [benefits, setBenefits] = useState<MarketingBenefit>()

  useEffect(() => {
    getPlusMembershipBenefits().then(setBenefits)
  }, [])

  const cost = getPlanCost(benefits)
  const savings = getPlanSavings(benefits)
  const costPer = getPlanCostPer(benefits)
  const originalCost = getOriginalCost(cost, savings)

  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <Button>UPGRADE</Button>
      </Dialog.Trigger>
      <Dialog.Content className="relative max-w-[850px] font-bold">
        <Dialog.Close className="absolute right-4 top-4 cursor-pointer">
          <Cross2Icon />
        </Dialog.Close>
        <Flex>
          <Inset className="relative mr-7 hidden w-[300px] sm:block">
            <Image
              src="/upgrade-modal-cover.png"
              alt="Upgrade Image"
              objectFit="cover"
              fill
            />
          </Inset>
          <Flex direction="column">
            <Dialog.Title mb="5">UPGRADE TO PLUS MEMBERSHIP</Dialog.Title>
            <Flex gap="1" mb="4" align="center">
              <Text size="5" className="line-through">
                {getCostLabel(originalCost)}
              </Text>
              <Text size="5">{getCostLabel(cost)}</Text>
              <Text size="2">{getCostPerLabel(costPer)}</Text>
            </Flex>
            <Flex direction="column" gap="3" mb="6">
              {benefits?.benefits.map((benefit) => (
                <Flex key={benefit} align="center" gap="2">
                  <CheckCircledIcon width="24" height="24" color="green" />
                  <Text size="3">{benefit}</Text>
                </Flex>
              ))}
            </Flex>
            <Button size="3" className="font-bold sm:w-2/3">
              UPGRADE NOW
            </Button>
          </Flex>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  )
}

const getPlanCost = (benefits?: MarketingBenefit) =>
  benefits?.priceLevels[0]?.cost

const getCostLabel = (cost?: number) => (cost !== undefined ? `$${cost}` : '')

const getPlanSavings = (benefits?: MarketingBenefit) =>
  benefits?.priceLevels[0]?.savings

const getPlanCostPer = (benefits?: MarketingBenefit) =>
  benefits?.priceLevels[0]?.costPer?.toLocaleUpperCase()

const getCostPerLabel = (costPer?: string) =>
  costPer !== undefined ? `/${costPer}` : ''

const getOriginalCost = (cost?: number, savings?: number) => {
  if (cost === undefined) {
    return undefined
  }
  if (savings === undefined) {
    return cost
  }
  return cost + savings
}

export { PsychplusMembershipDialog }
