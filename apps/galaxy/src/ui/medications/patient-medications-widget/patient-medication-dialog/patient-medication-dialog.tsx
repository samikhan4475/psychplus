import { PropsWithChildren, useCallback, useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { Cross1Icon } from '@radix-ui/react-icons'
import { Dialog, Flex, IconButton, Text } from '@radix-ui/themes'
import toast from 'react-hot-toast'
import { LoadingPlaceholder } from '@/components'
import { cn } from '@/utils'
import { getPatientPrescriptionAction } from '../actions'
import { useStore } from '../store'
import { EditOptions, PatientMedication, Prescription } from '../types'
import { dialogTitles } from './data'
import { useSteps } from './hooks'
import { PatientMedicationForm } from './patient-medication-form'
import { Step } from './types'

interface PatientMedicationDialogProps {
  title?: string
  medication?: PatientMedication
  open: boolean
  onOpenChange: (open: boolean) => void
  editOptions?: EditOptions
  initialStep?: Step
}

const PatientMedicationDialog = ({
  title,
  children,
  medication,
  open,
  onOpenChange,
  editOptions,
  initialStep = Step.Form,
}: PropsWithChildren<PatientMedicationDialogProps>) => {
  const [loading, setLoading] = useState(false)
  const { id: patientId } = useParams<{ id: string }>()
  const [formKey, setFormKey] = useState(0)

  const [prescriptionData, setPrescriptionData] = useState<
    Prescription | undefined
  >()
  const { step, stepCount, ...stepsProp } = useSteps(initialStep)
  const { refetch, hasControlledMedication, setHasControlledMedication } =
    useStore((state) => ({
      refetch: state.refetch,
      hasControlledMedication: state.hasControlledMedication,
      setHasControlledMedication: state.setHasControlledMedication,
    }))
  const totalSteps = 4
  const fetchData = useCallback(
    async (id: number) => {
      setLoading(true)
      getPatientPrescriptionAction(id, String(medication?.id))
        .then((res) => {
          if (res.state === 'error') {
            return toast.error(res.error)
          }
          setPrescriptionData(res?.data)
          const hasCtrl = !!res?.data?.prescriptionDrugs?.some(
            (d) => d.isControlledSubstance,
          )
          setHasControlledMedication(hasCtrl)
        })
        .finally(() => {
          setLoading(false)
        })
    },
    [medication?.id],
  )

  useEffect(() => {
    if (!medication) {
      setPrescriptionData(undefined)
    }
    if (medication && open) {
      fetchData(Number(patientId))
    }
  }, [open, fetchData, medication, patientId])
  let dialogTitle: string | undefined
  if (step === Step.Form) {
    dialogTitle = title
  } else if (hasControlledMedication) {
    dialogTitle = dialogTitles[step]
  } else if (step === Step.Review) {
    dialogTitle = 'Review & Transmit'
  } else {
    dialogTitle = dialogTitles[step]
  }
  return (
    <Dialog.Root
      open={open}
      onOpenChange={(o) => {
        if (!o) {
          stepsProp.onJump(Step.Form)
          refetch()
          setFormKey((k) => k + 1)
        }
        onOpenChange(o)
      }}
    >
      {children}
      <Dialog.Content
        className={cn('relative max-w-[536px] !overflow-visible', {
          'max-w-[1070px]': step === Step.Form,
        })}
        onInteractOutside={(e) => e.preventDefault()}
      >
        <Dialog.Close className="absolute right-4 top-5 cursor-pointer">
          <IconButton size="1" highContrast variant="ghost" color="gray">
            <Cross1Icon width={16} height={16} strokeWidth={1.5} />
          </IconButton>
        </Dialog.Close>
        <Dialog.Title>
          <Flex className="w-full" gap="1">
            {step !== Step.Form && hasControlledMedication && (
              <Text size="3" className="bg-pp-bg-accent rounded-full p-2">
                {stepCount}/{totalSteps}
              </Text>
            )}
            <Text className="mt-1 text-center">{dialogTitle}</Text>
          </Flex>
        </Dialog.Title>
        {loading ? (
          <Flex className="absolute inset-0 w-full items-center justify-center">
            <LoadingPlaceholder />
          </Flex>
        ) : (
          <PatientMedicationForm
            key={formKey}
            onClose={() => onOpenChange(false)}
            prescription={prescriptionData}
            patientId={Number(patientId)}
            step={step}
            intialStep={initialStep}
            editOptions={editOptions}
            {...stepsProp}
          />
        )}
      </Dialog.Content>
    </Dialog.Root>
  )
}

export { PatientMedicationDialog }
