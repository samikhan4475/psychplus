'use client'

import { useState } from 'react'
import { Cross2Icon } from '@radix-ui/react-icons'
import { Button, Dialog, Flex } from '@radix-ui/themes'
import { PlusIcon } from 'lucide-react'
import { FormError, LoadingPlaceholder } from '@/components'
import { cn } from '@/utils'
import { getPatientVitalsAction } from '../../actions'
import { UnitSystem } from '../../constants'
import { useStore } from '../../store'
import { PatientVital } from '../../types'
import { mapErrorMessage } from '../../utils'
import { AddButton } from '../add/add'
import { AddVitalsForm } from './add-vitals-form'
import { AddVitalsTable } from './add-vitals-table'
import { RadioButton } from './radio-button'

const AddVitalsButton = ({
  title,
  patientId,
}: {
  title: string
  patientId: string
}) => {
  const [unitSystem, setUnitSystem] = useState(UnitSystem.Metric)
  const [addNewRecord, setAddNewRecord] = useState(false)

  const { error, setError } = useStore((state) => ({
    error: state.error,
    setError: state.setError,
  }))

  const [data, setData] = useState<PatientVital[]>([])
  const [loading, setLoading] = useState<boolean>(false)

  const fetchPatientVitals = async () => {
    setLoading(true)
    const result = await getPatientVitalsAction({
      payload: {
        patientId: patientId,
      },
    })

    if (result.state === 'success') {
      setData(result.data)
      setLoading(false)
    }
  }

  return (
    <Dialog.Root
      onOpenChange={(open) => {
        setError('')
        setAddNewRecord(false)
        if (open) fetchPatientVitals()
      }}
    >
      <Dialog.Trigger>
        <Button variant="outline" size="1" color="gray" className="text-black">
          <PlusIcon height={16} width={16} />
          {title}
        </Button>
      </Dialog.Trigger>

      <Dialog.Content className="relative max-w-[850px] p-6">
        <Dialog.Close className="absolute right-6 top-6 cursor-pointer">
          <Cross2Icon />
        </Dialog.Close>
        <Dialog.Title size="5" className="font-[600]">
          Add Vitals
        </Dialog.Title>

        <Flex direction="column" gap="2">
          <Flex justify="between">
            <RadioButton
              unitSystem={unitSystem}
              setUnitSystem={setUnitSystem}
            />
            <AddButton onAdd={setAddNewRecord} />
          </Flex>

          {error && <FormError message={mapErrorMessage(error)} />}

          {loading ? (
            <LoadingPlaceholder />
          ) : (
            <Flex align="start">
              <Flex className={cn(addNewRecord ? 'w-[669px]' : 'w-full')}>
                <AddVitalsTable unitSystem={unitSystem} data={data} />
              </Flex>
              {addNewRecord && (
                <AddVitalsForm
                  patientId={patientId}
                  unitSystem={unitSystem}
                  setAddNewRecord={setAddNewRecord}
                  addNewVital={setData}
                  vitalsData={data}
                />
              )}
            </Flex>
          )}
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  )
}

export { AddVitalsButton }
