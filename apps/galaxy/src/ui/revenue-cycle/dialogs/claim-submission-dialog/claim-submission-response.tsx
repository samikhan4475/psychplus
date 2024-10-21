import React from 'react'
import { Flex, Text } from '@radix-ui/themes'
import { LoadingPlaceholder } from '@/components'
import { ErrorIcon, TickIcon } from '@/components/icons'
import { ClaimResponseType } from '../../types'

interface ClaimSubmissionResponseInterface {
  claimErrorResponses: ClaimResponseType[]
  claimCleanResponses: ClaimResponseType[]
  loading: boolean
}
const ClaimSubmissionResponseView = ({
  claimErrorResponses,
  claimCleanResponses,
  loading,
}: ClaimSubmissionResponseInterface) => {
  if (loading) return <LoadingPlaceholder className="bg-white min-h-[23vh]" />
  return (
    <Flex direction="column" gapY="2">
      {claimCleanResponses.length > 0 && (
        <Flex wrap="wrap">
          <TickIcon rectRx="24" width="22" height="22" />
          <Text weight="bold" mx="1">
            Claims
          </Text>
          <Text mx="1" weight="bold">
            {claimCleanResponses.map((response) => response.claimId + ', ')}
          </Text>
          were successfully submitted to
          <Text ml="1" weight="bold">
            clearing house
          </Text>
        </Flex>
      )}
      {claimErrorResponses?.map(({ claimId, message }) =>
        message.map((errorMessage, index) => (
          <Flex key={claimId} wrap="wrap">
            <ErrorIcon />
            <Text weight="bold" mx="1">
              Claim {claimId}
            </Text>
            was unsuccessful because of
            <Text weight="bold" key={`${claimId}-${index}`} ml="1">
              {errorMessage}
            </Text>
          </Flex>
        )),
      )}
    </Flex>
  )
}

export { ClaimSubmissionResponseView }
