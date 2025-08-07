import { useEffect, useMemo, useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Flex } from '@radix-ui/themes'
import { useForm } from 'react-hook-form'
import { FormContainer } from '@/components'
import { ConfirmMedication } from '@/ui/medications/patient-medications-widget/patient-medication-dialog/confirm-medication'
import { CredentialsVerificationForm } from '@/ui/medications/patient-medications-widget/patient-medication-dialog/credentials-verification'
import { Prescription } from '@/ui/medications/patient-medications-widget/types'
import { useStore } from '../store'
import { MedicationRefill, Step, StepComponentProps } from '../types'
import { handleChangeRequestApproval, handleRxApproval } from '../utils'
import { PatientPrescriptionAccordian } from './patient-medication-accordion'
import { schema, UpdateMedicationSchema } from './schema'

interface UpdateMedicationFormProps extends StepComponentProps {
  data: MedicationRefill
  onCloseModal: (open: boolean) => void
}

const UpdateMedicationForm = ({
  data,
  onCloseModal,
  ...stepProps
}: UpdateMedicationFormProps) => {
  const Component = useMemo(() => Components[stepProps.step], [stepProps.step])
  const { activeTab } = useStore()
  const isRefillTab = activeTab.includes('Refill')

  const form = useForm<UpdateMedicationSchema>({
    resolver: zodResolver(schema),
    mode: 'onChange',
    defaultValues: data,
  })

  const drugList = form.watch('drugList') ?? []
  const dataList = form.getValues()
  const [isLoading, setIsLoading] = useState(false)
  const [isControlledSubstance, setIsControlledSubstance] = useState(false)

  useEffect(() => {
    if (!drugList || drugList.length === 0) return
    if (drugList.length > 0) {
      const drug = drugList?.[0]
      setIsControlledSubstance(drug.isControlledSubstance ?? false)
    }
  }, [drugList])

  const onSubmit = async (data: UpdateMedicationSchema) => {
    if (!data.drugList || data.drugList.length === 0) return
    setIsLoading(true)
    if (isControlledSubstance) {
      return stepProps.onJump(Step.CredentialVerification)
    }

    if (isRefillTab) {
      const approvalResponse = await handleRxApproval(data)
      if (approvalResponse) {
        onCloseModal?.(false)
      }
    } else {
      const changeResponse = await handleChangeRequestApproval(data)
      if (changeResponse) {
        onCloseModal?.(false)
      }
    }
    setIsLoading(false)
  }
  const handleClose = () => {
    setIsLoading(false)
    onCloseModal?.(false)
  }
  return (
    <FormContainer form={form} onSubmit={onSubmit}>
      <Flex gap="2" justify="between" direction="column" className="relative">
        <Component
          {...stepProps}
          prescriptions={[dataList as unknown as Prescription]}
          onClose={handleClose}
          isRefillTab={isRefillTab}
          isRefillAndChangeRequest={true}
          onJump={(nextStep) => {
            stepProps.onJump(nextStep)
          }}
        />
        {stepProps?.step === Step.Form && (
          <Flex gap="2" justify="end">
            {isControlledSubstance ? (
              <Button
                type="button"
                size="2"
                highContrast
                variant="outline"
                color="gray"
                className="text-black"
                onClick={async () => {
                  const isValid = await form.trigger()
                  if (isValid) {
                    stepProps.onJump(Step.CredentialVerification)
                  }
                }}
              >
                Next
              </Button>
            ) : (
              <Button
                type="submit"
                size="2"
                highContrast
                variant="outline"
                color="gray"
                className="text-black"
                disabled={isLoading}
                loading={isLoading}
              >
                Save & Approve
              </Button>
            )}
          </Flex>
        )}
      </Flex>
    </FormContainer>
  )
}

const Components: Record<Step, React.ComponentType<StepComponentProps>> = {
  [Step.Form]:
    PatientPrescriptionAccordian as React.ComponentType<StepComponentProps>,
  [Step.CredentialVerification]:
    CredentialsVerificationForm as React.ComponentType<StepComponentProps>,
  [Step.OrderConfirm]:
    ConfirmMedication as React.ComponentType<StepComponentProps>,
}

export { UpdateMedicationForm }
