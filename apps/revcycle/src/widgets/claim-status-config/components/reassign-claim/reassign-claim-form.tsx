import { Flex } from '@radix-ui/themes'
import { type SubmitHandler } from 'react-hook-form'
import { z } from 'zod'
import {
  Form,
  FormSelect,
  FormSubmitButton,
  useForm,
  validate,
} from '@psychplus/form'
import { Button } from '@psychplus/ui/button'
import { Dialog } from '@psychplus/ui/dialog'
import { useClaimStatuses, useStore } from '../../store'
import { ClaimStatus } from '../../types'
import { toggleActivateClaimStatus } from '../../utils'

const schema = z.object({
  reassignClaimStatus: validate.requiredString,
})

type SchemaType = z.infer<typeof schema>

const ReassignClaimForm = () => {
  const {
    addClaimStatusDiff,
    claimStatusesForDeactivation,
    clearClaimStatusesForDeactivation,
  } = useStore((state) => ({
    addClaimStatusDiff: state.addClaimStatusDiff,
    claimStatusesForDeactivation: state.claimStatusesForDeactivation,
    clearClaimStatusesForDeactivation: state.clearClaimStatusesForDeactivation,
  }))

  const claimStatuses = useClaimStatuses()

  const form = useForm({
    schema,
    criteriaMode: 'all',
    defaultValues: {
      reassignClaimStatus: undefined,
    },
  })

  const onSubmit: SubmitHandler<SchemaType> = async () => {
    if (claimStatusesForDeactivation) {
      for (const claimStatus of claimStatusesForDeactivation) {
        await toggleActivateClaimStatus({ ...claimStatus, isActive: false })
      }
    }

    addClaimStatusDiff(
      ...claimStatusesForDeactivation!.map((claimStatus) => ({
        id: claimStatus.id,
        isActive: false,
      })),
    )

    clearClaimStatusesForDeactivation()
  }

  return (
    <Form form={form} onSubmit={onSubmit}>
      <Flex direction="column" gap="4" mb="4">
        <FormSelect
          label="Select Claim Status"
          data-testid="add-claim-status-due-to-select"
          options={getNewClaimStatusOptions(
            claimStatuses,
            claimStatusesForDeactivation,
          )}
          {...form.register('reassignClaimStatus')}
        />
      </Flex>
      <Flex gap="3" justify="end">
        <Dialog.Close>
          <Button variant="soft" color="gray">
            Cancel
          </Button>
        </Dialog.Close>
        <FormSubmitButton size="2" data-testid="add-claim-status-submit-button">
          Re-Assign
        </FormSubmitButton>
      </Flex>
    </Form>
  )
}

const getNewClaimStatusOptions = (
  claimStatuses: ClaimStatus[],
  deactivated: ClaimStatus[] = [],
) =>
  claimStatuses
    .filter((cs) => !deactivated.find((csd) => csd.id === cs.id))
    .map((cs) => ({ value: cs.id, label: cs.name }))

export { ReassignClaimForm }
