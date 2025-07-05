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
}

const PatientMedicationDialog = ({
  title,
  children,
  medication,
  open,
  onOpenChange,
  editOptions
}: PropsWithChildren<PatientMedicationDialogProps>) => {
  const [loading, setLoading] = useState(false)
  const { id: patientId } = useParams<{ id: string }>()

  const [prescriptionData, setPrescriptionData] = useState<
    Prescription | undefined
  >()
  const { step, stepCount, totalSteps, ...stepsProp } = useSteps()
  const { refetch } = useStore((state) => ({
    refetch: state.refetch,
  }))
  const fetchData = useCallback(
    async (id: number) => {
      setLoading(true)
      getPatientPrescriptionAction(id, String(medication?.id))
        .then((res) => {
          if (res.state === 'error') {
            return toast.error(res.error)
          }
          setPrescriptionData(res?.data)
        })
        .finally(() => {
          setLoading(false)
        })
    },
    [medication?.id],
  )

  useEffect(() => {
    if (medication && open) {
      fetchData(Number(patientId))
    }
  }, [open, fetchData, medication, patientId])

  return (
    <Dialog.Root
      open={open}
      onOpenChange={(o) => {
        if (!o) {
          stepsProp.onJump(Step.Form)
          refetch()
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
          <Flex className="gap-6">
            <Text size="3" className="bg-pp-bg-accent rounded-full p-1">
              {stepCount}/{totalSteps}
            </Text>
            {step === Step.Form ? title : dialogTitles[step]}
          </Flex>
        </Dialog.Title>
        {loading ? (
          <Flex className="absolute inset-0 w-full items-center justify-center">
            <LoadingPlaceholder />
          </Flex>
        ) : (
          <PatientMedicationForm
            onClose={() => onOpenChange(false)}
            prescription={prescriptionData}
            patientId={Number(patientId)}
            step={step}
            editOptions={editOptions}
            {...stepsProp}
          />
        )}
      </Dialog.Content>
    </Dialog.Root>
  )
}

export { PatientMedicationDialog }
