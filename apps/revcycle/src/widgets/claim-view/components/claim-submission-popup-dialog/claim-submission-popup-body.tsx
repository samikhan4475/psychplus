import { Box, Flex, Text } from '@radix-ui/themes'
import { useStore } from '../../store'
import { ClaimSuccessSvg, ClaimWarningSvg } from '../../svg'
import { ErrorMessage } from '../../types'
import { getClaimById } from '../../utils'

interface PopupProp {
  successClaims: string[]
  errorClaims: {
    [claimId: string]: ErrorMessage[]
  }
}

const ClaimSubmissionPopupBody = ({
  successClaims,
  errorClaims,
}: PopupProp) => {
  const claimList = useStore((state) => state.claimList)

  return (
    <Flex direction="column" gap="4" mb="4">
      {successClaims.length > 0 && (
        <Flex gap="2" direction="row">
          <Box>
            <ClaimSuccessSvg />
          </Box>
          <Box>
            Claims
            <Text className="pl-[3px] font-bold">
              {successClaims.map((claim, index) => {
                const claimData = getClaimById(claim, claimList)
                const comma = index + 1 < successClaims.length ? ',' : ''
                return `${claimData?.claimNumber} ${comma}`
              })}
            </Text>
            were successfully submitted to{' '}
            <Text className="font-bold">clearinghouse</Text>
          </Box>
        </Flex>
      )}

      {Object.keys(errorClaims).map((claimId) => {
        const claimData = getClaimById(claimId, claimList)
        return (
          <Flex gap="2" direction="row" className="pt-[5px]" key={claimId}>
            <Box>
              <ClaimWarningSvg />
            </Box>
            <Box>
              Claim{' '}
              <Text className="pr-[3px] font-bold">
                {claimData?.claimNumber}
              </Text>
              was unsuccessful because of
              <Text className="pl-[3px] font-bold">
                {errorClaims[claimId]?.map(
                  (errorMsg: ErrorMessage, index: number) => {
                    const comma =
                      index + 1 < errorClaims[claimId].length ? ',' : ''
                    return `${errorMsg.errorMessage} ${comma}`
                  },
                )}
              </Text>
            </Box>
          </Flex>
        )
      })}
    </Flex>
  )
}

export { ClaimSubmissionPopupBody }
