'use client'

import { useState } from 'react'
import { Button, Flex } from '@radix-ui/themes'
import { Plus } from 'lucide-react'
import { PatientInsuranceInfo } from '@/types'
import { PermissionAlert } from '@/ui/schedule/shared'
import { TabContentHeading } from '../shared'
import { InsurancePermissionMessages } from './constants'
import { PatientBillingRadio } from './patient-billing-radio'
import { useInsurancePermissions } from './hooks/use-insurance-permissions'
import { ShowCheckbox } from './show-checkbox'
import { useStore } from './store'

const InsuranceHeader = ({
  insuranceInfo,
}: {
  insuranceInfo: PatientInsuranceInfo
}) => {
  const { setAddFormOpen, isAddFormOpen } = useStore((state) => ({
    setAddFormOpen: state.setAddFormOpen,
    isAddFormOpen: state.isAddFormOpen,
  }))
  const { canAddInsuranceInfo } = useInsurancePermissions()
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const handleAddInsurance = () => {
    if (!canAddInsuranceInfo) {
      setIsOpen(true)
      return
    }
    if (isAddFormOpen) return
    setAddFormOpen(true)
  }

  return (
    <Flex direction="column" className="bg-white sticky -top-[1px] z-[1]">
      <TabContentHeading title="Patient Insurance Information">
        <Flex justify="between" flexGrow="1" align="center" ml="4" gap="2">
          <Flex align="center" flexGrow="1" gap="4">
            <ShowCheckbox />
            <PatientBillingRadio insuranceInfo={insuranceInfo} />
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
        <PermissionAlert
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          message={InsurancePermissionMessages.addInsurance}
        />
      </TabContentHeading>
    </Flex>
  )
}

export { InsuranceHeader }
