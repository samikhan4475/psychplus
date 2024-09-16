'use client'

import { Button, Flex } from '@radix-ui/themes'
import { Plus } from 'lucide-react'
import { TabContentHeading } from '../shared'
import { PatientBillingRadio } from './patient-billing-radio'
import { ShowCheckbox } from './show-checkbox'
import { useStore } from './store'

const InsuranceHeader = () => {
  const { setAddFormOpen, isAddFormOpen } = useStore((state) => ({
    setAddFormOpen: state.setAddFormOpen,
    isAddFormOpen: state.isAddFormOpen,
  }))

  const handleAddInsurance = () => {
    if (isAddFormOpen) return
    setAddFormOpen(true)
  }

  return (
    <Flex direction="column" className="bg-white sticky -top-[1px] z-[1]">
      <TabContentHeading title="Patient Insurance Information">
        <Flex justify="between" flexGrow="1" align="center" ml="4" gap="2">
          <Flex align="center" flexGrow="1" gap="4">
            <ShowCheckbox />
            <PatientBillingRadio />
          </Flex>
          <Flex align="center" gap="4">
            <Button
              variant="outline"
              color="gray"
              className="text-black"
              type="button"
              size="1"
              onClick={handleAddInsurance}
            >
              <Plus size={14} /> Add
            </Button>
          </Flex>
        </Flex>
      </TabContentHeading>
    </Flex>
  )
}

export { InsuranceHeader }
