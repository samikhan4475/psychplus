import { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { parseDate } from '@internationalized/date'
import { Box, Button, Dialog, Flex, Text } from '@radix-ui/themes'
import { X } from 'lucide-react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import z from 'zod'
import {
  CheckboxInput,
  FormContainer,
  FormError,
  FormSubmitButton,
} from '@/components'
import { Pen } from '@/components/icons'
import {
  cn,
  getAgeFromDate,
  getSlashedDateString,
  sanitizeFormData,
} from '@/utils'
import { getPatientConsentsAction } from '../../patient-info-tab/actions'
import { electronicallySignPolicy } from '../actions'
import { ActionItem } from '../cells/action-item'
import { useStore } from '../store'
import { RowActionProps } from '../types'
import { PolicyFilesRenderer } from './policy-files-renderer'

const schema = z.object({
  signedByPatient: z.boolean().refine((val) => val === true, {
    message: 'You must agree to the policy first.',
  }),
})

const PrivacyPolicyDialog = ({ row, disabled }: RowActionProps) => {
  const form = useForm({
    resolver: zodResolver(schema),
    reValidateMode: 'onChange',
    defaultValues: {
      signedByPatient: false,
    },
  })
  const { patientProfile, setConsents } = useStore((state) => ({
    patientProfile: state.patientProfile,
    consents: state.consents,
    setConsents: state.setConsents,
    filteredConsents: state.filteredConsents,
  }))
  const [open, setOpen] = useState(false)
  const signedByPatient = form.watch('signedByPatient')
  const signedByPatientError = form.formState.errors.signedByPatient

  const handleSubmit = async () => {
    const response = await electronicallySignPolicy(
      sanitizeFormData({
        ...row.original,
        issuanceDate: row.original.issuanceDateWithoutFormatting,
        latestIssuanceDate: row.original.latestIssuanceDateWithoutFormatting,
        signatureName: `${patientProfile?.legalName.firstName} ${patientProfile?.legalName.lastName}`,
      }),
    )
    if (response.state === 'error') {
      toast.error(response.error ?? 'Failed to sign the policy.')
    } else if (response.state === 'success') {
      handleRefreshConsents()
      setOpen(false)
      form.reset()
      toast.success('Policy Signed!')
    }
  }
  const handleRefreshConsents = async () => {
    const result = await getPatientConsentsAction(row.original.patientId)
    if (result.state === 'error') {
      return
    }
    setConsents(result.data)
  }

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger>
        <ActionItem Icon={Pen} disabled={disabled} />
      </Dialog.Trigger>
      <Dialog.Content className="max-w-[824px]">
        <FormContainer form={form} onSubmit={handleSubmit}>
          <Flex justify="between">
            <Text size="7" weight="medium">
              PsychPlus Privacy Policy
            </Text>
            <Dialog.Close>
              <X size={30} className="cursor-pointer" />
            </Dialog.Close>
          </Flex>
          <Box className={cn('shadow-light-gray-08 my-4')}>
            <Flex
              gap="4"
              className={cn('border-pp-states-disabled border p-1')}
            >
              <Flex gap="2">
                <Text size="2" weight="medium">
                  Patient Name
                </Text>
                <Text size="2" className="text-pp-gray-1">
                  {patientProfile?.legalName.firstName}{' '}
                  {patientProfile?.legalName.lastName}
                </Text>
              </Flex>
              <Flex gap="2">
                <Text size="2" weight="medium">
                  Gender
                </Text>
                <Text size="2" className="text-pp-gray-1">
                  {patientProfile?.gender}
                </Text>
              </Flex>
              <Flex gap="2">
                <Text size="2" weight="medium">
                  DOB
                </Text>
                {patientProfile?.birthdate && (
                  <Text size="2" className="text-pp-gray-1">
                    {getSlashedDateString(patientProfile.birthdate)}
                  </Text>
                )}
              </Flex>
              <Flex gap="2">
                <Text size="2" weight="medium">
                  Age
                </Text>
                {patientProfile?.birthdate && (
                  <Text size="2" className="text-pp-gray-1">
                    {getAgeFromDate(parseDate(patientProfile?.birthdate))} yrs
                  </Text>
                )}
              </Flex>
            </Flex>
            <Box className="bg-pp-bg-accent mt-2 p-1">
              <Text size="3" weight="medium">
                Policy Details
              </Text>
            </Box>
            <Box className="h-[366px] px-4 py-2">
              <Box
                className={`${
                  signedByPatientError ? 'h-[70%]' : 'h-5/6'
                } overflow-y-auto`}
              >
                <PolicyFilesRenderer policyType={row.original.type} />
              </Box>
              <Flex className="mt-4 gap-2 bg-[#F9F9FB] p-2">
                <CheckboxInput
                  field="signedByPatient"
                  checked={signedByPatient}
                />
                <Text size="2" weight="medium">
                  Electronically signed by Patient
                </Text>
              </Flex>
              <FormError message={signedByPatientError?.message} />
            </Box>
          </Box>
          <Flex justify="end" gap="2">
            <Dialog.Close>
              <Button
                variant="outline"
                color="gray"
                className="text-black"
                type="button"
              >
                Cancel
              </Button>
            </Dialog.Close>

            <FormSubmitButton form={form} highContrast>
              Sign
            </FormSubmitButton>
          </Flex>
        </FormContainer>
      </Dialog.Content>
    </Dialog.Root>
  )
}

export { PrivacyPolicyDialog }
