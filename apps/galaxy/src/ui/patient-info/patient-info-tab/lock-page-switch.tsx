'use client'

import { useEffect } from 'react'
import { Flex, Switch, Text } from '@radix-ui/themes'
import { useStore as zustandUseStore } from 'zustand'
import { FormFieldContainer, FormFieldLabel } from '@/components'
import { PatientProfile } from '@/types'
import { useStore } from '../store'

interface LockPageSwitchProps {
  patient: PatientProfile
}
const LockPageSwitch = ({ patient }: LockPageSwitchProps) => {
  const store = useStore()
  const { isUserLocked, toggleUserLock, setUserLock } = zustandUseStore(
    store,
    (state) => ({
      isUserLocked: state.isUserLocked,
      toggleUserLock: state.toggleUserLock,
      setUserLock: state.setUserLock,
    }),
  )
  useEffect(() => {
    if (patient?.patientTypeEstablishedOrNew !== 'Establish') {
      setUserLock(false)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [patient?.patientTypeEstablishedOrNew, toggleUserLock])

  return (
    <FormFieldContainer className="!sticky top-0 z-[11] -mb-10 ml-28 h-10 w-fit flex-row items-center gap-2">
      <FormFieldLabel className="text-pp-black-3 !text-2">
        Lock page for user
      </FormFieldLabel>
      <Text size="1" as="label">
        <Flex align="center" gap="1">
          <Switch
            size="1"
            color="green"
            checked={isUserLocked}
            onCheckedChange={toggleUserLock}
          />
          {isUserLocked ? 'Yes' : 'No'}
        </Flex>
      </Text>
    </FormFieldContainer>
  )
}

export { LockPageSwitch }
