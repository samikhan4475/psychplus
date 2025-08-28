'use client'

import { useRef } from 'react'
import { useParams, useSearchParams } from 'next/navigation'
import { CODESETS } from '@psychplus-v2/constants'
import { Flex, Text } from '@radix-ui/themes'
import { ADD_EXT_REFERRALS_FORM } from '@psychplus/widgets'
import { usePublishLoaded, usePublishSize } from '@psychplus/widgets/hooks'
import { useCodesetCodes } from '@/providers'
import { AddExtReferralForm } from './components'
import { ReferralType } from './types'

interface Props{
  googleAPIkey:string
}
const AddExtReferralClient = ({ googleAPIkey }: Props) => {
  const ref = useRef<HTMLDivElement>(null)

  usePublishLoaded(ADD_EXT_REFERRALS_FORM)
  usePublishSize(ADD_EXT_REFERRALS_FORM, ref)
  const { type: formType } = useParams<{ type: string }>()
  const searchParams = useSearchParams()
  const visitTypeCodes = useCodesetCodes(CODESETS.VisitType)
  const visitTypeCode = searchParams.get('visitTypeCode') ?? undefined

  const isValidType = Object.values(ReferralType).includes(
    formType as ReferralType,
  )

  const isVisitTypeCodeValid =
    !visitTypeCode ||
    visitTypeCodes?.some((c) => c.value === visitTypeCode)

  const scrollToTop = () => {
    ref.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
  const showError = !isValidType || !isVisitTypeCodeValid
  return (
    <Flex direction="column" align="center" className=" w-full" ref={ref}>
      <Flex className="bg-white  w-full max-w-[688px] !overflow-visible rounded-6  max-xs:max-w-[400px]">
        {showError ? (
          <Text color="red" size="4" weight="bold">
             {!isValidType ? 'Invalid referral type' : `Invalid visitTypeCode: "${visitTypeCode}"`}
          </Text>
        ) : (
           <AddExtReferralForm
            scrollToTop={scrollToTop}
            googleAPIkey={googleAPIkey}
            formType={formType as ReferralType}
            visitTypeCode={visitTypeCode}
          />
        )}
      </Flex>
    </Flex>
  )
}

export { AddExtReferralClient }
