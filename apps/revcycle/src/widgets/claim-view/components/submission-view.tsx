import { useState } from 'react'
import { Box, Button, Flex, Tabs, Text } from '@radix-ui/themes'
import { Select } from '@psychplus/ui/select'
import { SubmissionTable } from './submission-table/submission-table'
import './style.css'
import { submitClaim } from '../api.client'
import { useStore } from '../store'
import { ClaimSubmissionDetailPopupDialog } from './claim-submission-detail-popup-dialog'
import { ClaimSubmissionPopupDialog } from './claim-submission-popup-dialog'

const SubmissionView = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [submissionType, setSubmissionType] = useState('electronic')

  const claimSubmissionData = useStore((state) => state.claimSubmissionData)
  const { setClaimSubmissionData, setClaimSubmissionModal } = useStore(
    (state) => ({
      setClaimSubmissionData: state.setClaimSubmissionData,
      setClaimSubmissionModal: state.setClaimSubmissionModal,
    }),
  )

  const onSubmitClaims = async () => {
    if (claimSubmissionData.selectedClaims.length === 0) {
      alert('Please select claims to be submitted!')
      return
    }
    setIsLoading(true)

    try {
      const payload = {
        batchId: 1,
        batchName: '',
        errorMessage: '',
        hcfatype: '',
        insuranceType: '',
        receiverId: '',
        submissionType: submissionType,
        subscriptionTypeViewOnly: '',
        claimType: 'Professional',
        claimIds: claimSubmissionData.selectedClaims,
        insurancePolicyPriority: 'Primary',
        isScrubOnly: true,
      }
      const response = await submitClaim(payload)
      const newObj = claimSubmissionData
      newObj.claimsWithErrorMessages = response.claimsWithErrorMessages
      newObj.cleanClaimIds = response.cleanClaimIds
      setClaimSubmissionData(newObj)
      setClaimSubmissionModal(true)
    } catch (error) {
      let message = ''
      if (typeof error === 'string') {
        message = error
      } else if (error instanceof Error) {
        message = error.message
      } else {
        message = JSON.stringify(error)
      }
      alert(`ERROR: ${message}`)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <ClaimSubmissionPopupDialog />
      <ClaimSubmissionDetailPopupDialog />
      <Flex
        py="1"
        justify="between"
        className="shadow-lg  border border-[#b9b3b322] bg-[#fefdfd] px-3"
      >
        <Text size="5" weight="bold">
          Submission
        </Text>
        <Flex justify="between" align="center" gap="2">
          <Text size="3" weight="bold">
            Clearinghouse
          </Text>
          <Select.Root size="2" defaultValue="Change Healthcare">
            <Select.Trigger />
            <Select.Content>
              <Select.Group>
                <Select.Item value="Change Healthcare">
                  Change Healthcare
                </Select.Item>
                <Select.Item value="Change Paper">Change Paper</Select.Item>
              </Select.Group>
            </Select.Content>
          </Select.Root>
          <Button
            className="h-25 ml-2 bg-[#151B4A] text-[#fff]"
            onClick={onSubmitClaims}
            disabled={isLoading}
          >
            {isLoading ? 'Submitting' : 'Submit'}
          </Button>
        </Flex>
      </Flex>
      <Box mb="7">
        <Tabs.Root className="submission" defaultValue="Electronic Submission">
          <Tabs.List>
            <Tabs.Trigger
              value="Electronic Submission"
              onClick={() => setSubmissionType('electronic')}
            >
              Electronic Submission
            </Tabs.Trigger>
            <Tabs.Trigger
              value="Paper Submission"
              onClick={() => setSubmissionType('paper')}
            >
              Paper Submission
            </Tabs.Trigger>
            <Tabs.Trigger
              value="Submission History"
              onClick={() => setSubmissionType('electronic')}
            >
              Submission History
            </Tabs.Trigger>
          </Tabs.List>
          <Box px="4" pt="3" pb="2">
            <Tabs.Content value="Electronic Submission">
              <SubmissionTable type="electronic" />
            </Tabs.Content>
            <Tabs.Content value="Paper Submission">
              <SubmissionTable type="paper" />
            </Tabs.Content>
            <Tabs.Content value="Submission History">
              <Text size="2">Submission History Content will come here</Text>
            </Tabs.Content>
          </Box>
        </Tabs.Root>
      </Box>
    </>
  )
}

export { SubmissionView }
