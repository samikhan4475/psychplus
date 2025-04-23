'use client'

import { PropsWithChildren, useCallback, useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { Cross1Icon } from '@radix-ui/react-icons'
import { Dialog, Flex, IconButton } from '@radix-ui/themes'
import toast from 'react-hot-toast'
import { LoadingPlaceholder } from '@/components'
import { getPatientPrescriptionAction } from '../actions'
import { PatientMedication, Prescription } from '../types'
import { PatientMedicationForm } from './patient-medication-form'

interface PatientMedicationDialogProps {
  title?: string
  medication?: PatientMedication
}

const PatientMedicationDialog = ({
  title,
  children,
  medication,
}: PropsWithChildren<PatientMedicationDialogProps>) => {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const { id: patientId } = useParams<{ id: string }>()
  const onToggle = (open: boolean) => setOpen(open)
  const [prescriptionData, setPrescriptionData] = useState<
    Prescription | undefined
  >()
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
      patientId && fetchData(Number(patientId))
    }
  }, [open, fetchData, medication, patientId])

  return (
    <Dialog.Root open={open} onOpenChange={onToggle}>
      {children}
      <Dialog.Content className="relative min-h-[50dvh] max-w-[1070px] !overflow-visible">
        <Dialog.Close className="absolute right-4 top-5 cursor-pointer">
          <IconButton size="1" highContrast variant="ghost" color="gray">
            <Cross1Icon width={16} height={16} strokeWidth={1.5} />
          </IconButton>
        </Dialog.Close>
        <Dialog.Title>{title}</Dialog.Title>
        {loading ? (
          <Flex className="absolute inset-0 w-full items-center justify-center">
            <LoadingPlaceholder />
          </Flex>
        ) : (
          <PatientMedicationForm
            onClose={() => onToggle(false)}
            prescription={prescriptionData}
            patientId={Number(patientId)}
          />
        )}
      </Dialog.Content>
    </Dialog.Root>
  )
}

export { PatientMedicationDialog }
