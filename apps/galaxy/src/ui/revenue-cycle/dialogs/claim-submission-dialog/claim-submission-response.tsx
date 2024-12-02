import React from 'react'
import { Box, Flex, Text } from '@radix-ui/themes'
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
    <Flex direction="column" gapY="2" className="text-sm">
      {claimCleanResponses.length > 0 && (
        <Flex direction="row" gap="2">
          <Box>
            <TickIcon rectRx="24" width="22" height="22" />
          </Box>
          <Box>
            <Text mx="1" size="2">
              <span className="font-bold">
                Claims{' '}
                {claimCleanResponses.map((response) => response.claimId + ', ')}{' '}
              </span>
              were successfully submitted to{' '}
              <span className="font-bold">clearing house</span>
            </Text>
          </Box>
        </Flex>
      )}
      {claimErrorResponses?.map(({ claimId, message }) =>
        message.map((errorMessage) => (
          <Flex key={claimId} direction="row" gap="2">
            <Box>
              <ErrorIcon />
            </Box>
            <Box>
              <Text mx="1" size="2">
                <span className="font-bold">Claim {claimId}</span> was
                unsuccessful because of{' '}
                <span className="font-bold">{errorMessage}</span>
              </Text>
            </Box>
          </Flex>
        )),
      )}
    </Flex>
  )
}

export { ClaimSubmissionResponseView }
