'use client'

import { Flex } from '@radix-ui/themes'
import { Claim } from '@/types'
import { LinkClaimFormFilter } from './link-claim-form-filters'
import { LinkClaimHeader } from './link-claim-header'
import { LinkClaimTable } from './link-claim-table'

interface LinkClaimFormProps {
  data: Claim
  handleCloseModal: () => void
}
const LinkClaimForm = ({ data, handleCloseModal }: LinkClaimFormProps) => {
  return (
    <>
      <Flex direction="column" className="relative gap-0.5" width="100%">
        <LinkClaimHeader data={data} />
        <LinkClaimFormFilter data={data} />
      </Flex>
      <Flex
        gapY="2"
        direction="column"
        className="bg-white flex-1 !overflow-hidden"
      >
        <LinkClaimTable claimData={data} handleCloseModal={handleCloseModal} />
      </Flex>
    </>
  )
}

export { LinkClaimForm }
