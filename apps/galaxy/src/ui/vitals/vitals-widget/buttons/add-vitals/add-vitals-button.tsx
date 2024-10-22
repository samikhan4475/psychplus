'use client'

import { useState } from 'react'
import { Cross2Icon } from '@radix-ui/react-icons'
import { Button, Dialog, Flex } from '@radix-ui/themes'
import { PlusIcon } from 'lucide-react'
import { UnitSystem } from '../../constants'
import { AddButton } from '../add/add'
import { AddVitalsForm } from './add-vitals-form'
import { AddVitalsTable } from './add-vitals-table'
import { RadioButton } from './radio-button'

const AddVitalsButton = ({
  title,
  patientId,
  appointmentId,
  showSign = false,
}: {
  title: string
  patientId: string
  appointmentId: string
  showSign?: boolean
}) => {
  const [unitSystem, setUnitSystem] = useState(UnitSystem.Metric)
  const [addNewRecord, setAddNewRecord] = useState(true)

  return (
    <Dialog.Root onOpenChange={() => setAddNewRecord(true)}>
      <Dialog.Trigger>
        <Button variant="outline" size="1" color="gray" className="text-black">
          <PlusIcon height={16} width={16} />
          {title}
        </Button>
      </Dialog.Trigger>

      <Dialog.Content className="relative max-w-[900px] p-6">
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

          <Flex align="start">
            <Flex className="w-[726px]">
              <AddVitalsTable
                patientId={patientId}
                appointmentId={appointmentId}
                unitSystem={unitSystem}
              />
            </Flex>
            {addNewRecord && (
              <AddVitalsForm
                patientId={patientId}
                appointmentId={appointmentId}
                unitSystem={unitSystem}
                setAddNewRecord={setAddNewRecord}
              />
            )}
          </Flex>
          {showSign && (
            <Flex justify="end" className="mt-4">
              <Button highContrast size="2" onClick={(e) => e.preventDefault()}>
                Sign
              </Button>
            </Flex>
          )}
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  )
}

export { AddVitalsButton }
