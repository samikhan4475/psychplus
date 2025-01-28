'use client'

import { useState } from 'react'
import { Button, Dialog, Flex, Text, TextField } from '@radix-ui/themes'
import { X } from 'lucide-react'
import { useFormContext } from 'react-hook-form'
import { useStore as globalStore } from '@/store'
import { ThresholdTable } from './threshold-table-block'

interface MotorThresholdType {
  dateTime: string
  user: string
  motorThersholdPercent: string
}

const MotorThresholdDialog = () => {
  const user = globalStore((state) => state.user)
  const { watch, setValue } = useFormContext()
  const motorThersholdData = watch('motorThershold')

  const [motorThreshold, setMotorThreshold] = useState(0)
  const [showEvidence, setShowEvidence] = useState(false)

  const setMotorThersholdData = (data: MotorThresholdType[]) => {
    setValue('motorThershold', data)
    setValue('motorThersholdValue', data[0].motorThersholdPercent)
  }

  const onClickSave = () => {
    const dateTime = new Date().toISOString()
    if (motorThersholdData.length > 0) {
      const totalMilliseconds =
        +new Date(dateTime) - +new Date(motorThersholdData[0].dateTime)
      const noOfWeeks = totalMilliseconds / (1000 * 60 * 60 * 24 * 7)
      setShowEvidence(noOfWeeks >= 2)
    }
    const newData = [
      {
        dateTime: dateTime,
        user: `${user?.legalName.firstName ?? ''} ${
          user?.legalName.lastName ?? ''
        }`,
        motorThersholdPercent: motorThreshold.toString(),
      },
      ...motorThersholdData,
    ]
    setMotorThersholdData([...newData])
    setMotorThreshold(0)
  }

  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <Button className="border-pp-gray-2 bg-white h-6 w-11 rounded-1 border border-solid">
          <Text className="text-pp-black-3">Edit</Text>
        </Button>
      </Dialog.Trigger>
      <Dialog.Content className="relative min-w-[584px] rounded-4 p-0 [box-shadow:none]">
        <Dialog.Close className="absolute right-4 top-4 cursor-pointer">
          <X size={20} strokeWidth={1.5} />
        </Dialog.Close>

        <Flex direction="column">
          <Dialog.Title size="5" className="m-0 p-4 font-[600]">
            Motor Threshold Determination (MT)
          </Dialog.Title>

          <Flex
            direction="column"
            className="border-pp-grey border-b-[1px] border-t-[1px]"
            p="5"
            gap="1"
          >
            <Text className="text-1">MT%</Text>
            <TextField.Root
              type="number"
              inputMode="numeric"
              min={0}
              max={100}
              onChange={(e) => {
                let value = +e.target.value;
                if (value < 0) value = 0;
                if (value > 100) value = 100;
                setMotorThreshold(value);
              }}
              value={motorThreshold || ''}
              className="h-[28px] w-[100%]"
              placeholder="0-100%"
            />

            {showEvidence && (
              <Text className="text-pp-red-1 text-1" weight="regular" mb="3">
                Evidence recommends that motor threshold may need to be
                reassessed and updated.
              </Text>
            )}

            <ThresholdTable />
          </Flex>
        </Flex>

        <Flex direction="row" p="4" justify="end" gap="3">
          <Dialog.Close>
            <Button className="border-pp-grey bg-white h-[32px] w-[92px] rounded-3 border border-solid">
              <Text className="text-pp-black-3">Cancel</Text>
            </Button>
          </Dialog.Close>
          <Dialog.Close>
            <Button
              onClick={onClickSave}
              className="border-pp-link-text bg-pp-link-text h-[32px] w-[92px] rounded-3 border border-solid"
            >
              <Text className="text-white">Save</Text>
            </Button>
          </Dialog.Close>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  )
}

export { MotorThresholdDialog }
