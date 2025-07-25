'use client'

import { useRef } from 'react'
import { useParams } from 'next/navigation'
import { Flex, Text } from '@radix-ui/themes'
import { ADD_EXT_REFERRALS_FORM } from '@psychplus/widgets'
import { usePublishLoaded, usePublishSize } from '@psychplus/widgets/hooks'
import { AddExtReferralForm } from './components'
import { ReferralType } from './types'

interface Props{
  googleAPIkey:string
} 
const AddExtReferralClient = ({googleAPIkey}:Props) => {
  const ref = useRef<HTMLDivElement>(null)

  usePublishLoaded(ADD_EXT_REFERRALS_FORM)
  usePublishSize(ADD_EXT_REFERRALS_FORM, ref)
  const { type: formType } = useParams<{ type: string }>()

  const isValidType = Object.values(ReferralType).includes(
    formType as ReferralType,
  )
  const scrollToTop = () => {
    ref.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
  return (
    <Flex direction="column" align="center" className=" w-full" ref={ref}>
      <Flex className="bg-white  w-full max-w-[688px] !overflow-visible rounded-6  max-xs:max-w-[400px]">
        {isValidType ? (
          <AddExtReferralForm scrollToTop={scrollToTop} googleAPIkey={googleAPIkey} formType={formType as ReferralType} />
        ) : (
          <Text color="red" size="4" weight="bold">
            Invalid referral type
          </Text>
        )}
      </Flex>
    </Flex>
  )
}

export { AddExtReferralClient }
