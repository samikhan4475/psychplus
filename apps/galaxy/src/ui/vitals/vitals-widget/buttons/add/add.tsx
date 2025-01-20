'use client'

import { Button } from '@radix-ui/themes'
import { PlusIcon } from 'lucide-react'
import { useHasPermission } from '@/hooks'
import { useStore } from '../../store'

const AddButton = ({ onAdd }: { onAdd: (state: boolean) => void }) => {
  const { setIsErrorAlertOpen, setAlertErrorMessage } = useStore((state) => ({
    setIsErrorAlertOpen: state.setIsErrorAlertOpen,
    setAlertErrorMessage: state.setAlertErrorMessage,
  }))

  const addVitalsPopupPermission = useHasPermission('addVitalsPopup')

  const addVital = () => {
    if (!addVitalsPopupPermission) {
      setIsErrorAlertOpen(true)
      setAlertErrorMessage(
        'You do not have permission to to click on “+Add” button to add multiple vitals. Please contact your supervisor if you need any further assistance.',
      )

      return
    }

    onAdd(true)
  }

  return (
    <Button variant="outline" color="gray" size="1" onClick={addVital}>
      <PlusIcon height={16} width={16} />
      Add
    </Button>
  )
}

export { AddButton }
