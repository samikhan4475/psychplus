import { Flex } from '@radix-ui/themes'
import { RejectionReason } from './rejection-reason'
import { SubmissionBatch } from './submission-batch'
import { SubmissionValidationMessage } from './submission-val-msg'
import { SubmittedDate } from './submitted-date'

const SubmissionInformationView = () => {
  return (
    <>
      <Flex gap="3">
        <SubmittedDate />
        <SubmissionBatch />
        <SubmissionValidationMessage />
      </Flex>
      <RejectionReason />
    </>
  )
}

export { SubmissionInformationView }
