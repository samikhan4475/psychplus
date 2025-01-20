'use client'

import { useEffect, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { FormFieldContainer, FormFieldLabel, SelectInput } from '@/components'
import {
  ClaimServiceLine,
  ServiceMasterFeeScheduleResponse,
  StaffResource,
} from '@/types'
import { ConfirmationDialog } from '../../dialogs/confirmation-dialog'
import { useRevCycleDataProvider } from '../../revCycleContext'
import { getServiceMasterFeeSchedule, getStaffById } from '../actions'

const getAmountBasedOnHonors = (
  staffData: StaffResource,
  apiResponse: ServiceMasterFeeScheduleResponse,
): number => {
  if (!staffData) return 0
  switch (staffData.legalName.honors) {
    case 'NP':
      return apiResponse.npAmount
    case 'PA':
      return apiResponse.paAmount
    case 'MD':
      return apiResponse.mdDoAmount
    case 'PsyD':
      return apiResponse.psyDAmount
    default:
      return apiResponse.mastersAmount
  }
}
const RenderingProvider = () => {
  const form = useFormContext()
  const [open, setOpen] = useState(false)

  const { staffData } = useRevCycleDataProvider()

  const handleValueChange = (value: string) => {
    if (!value) return
    form.setValue('renderingProviderId', value)
    setOpen(true)
  }
  const handleConfirmation = async () => {
    const renderingProviderId = form.getValues('renderingProviderId')
    const staffResponse = await getStaffById(renderingProviderId)
    if (staffResponse.state === 'success') {
      const staffData = staffResponse.data
      const cptCodes = form
        .getValues('claimServiceLines')
        .filter((line: ClaimServiceLine) => line.recordStatus !== 'Deleted')
        .map((line: ClaimServiceLine) => line.cptCode)

      const feeScheduleData = await getServiceMasterFeeSchedule({
        cptCode: cptCodes,
      })

      if (feeScheduleData.state === 'success') {
        const serviceLines = form.getValues(
          'claimServiceLines',
        ) as ClaimServiceLine[]
        const updatedServiceLines = serviceLines.map((serviceLine) => {
          const matchingFeeSchedule = feeScheduleData.data.find(
            (feeScheduleItem: ServiceMasterFeeScheduleResponse) =>
              feeScheduleItem.cptCode === serviceLine.cptCode,
          )

          if (matchingFeeSchedule) {
            const amount = getAmountBasedOnHonors(
              staffData,
              matchingFeeSchedule,
            )
            return {
              ...serviceLine,
              unitAmount: amount,
              totalAmount:
                serviceLine.units && (serviceLine.units * amount).toFixed(2),
            }
          }
          return serviceLine
        })
        form.setValue(`claimServiceLines`, updatedServiceLines)
      }
    }

    setOpen(false)
  }
  const handleClose = () => {
    setOpen(false)
  }
  return (
    <FormFieldContainer>
      <ConfirmationDialog
        isOpen={open}
        closeDialog={handleClose}
        onConfirmation={handleConfirmation}
        heading={'Are you sure?'}
        content={
          'Service Line Amount will be auto adjust as per new Rendering provider. '
        }
      />
      <FormFieldLabel required={true}>Rendering Provider</FormFieldLabel>
      <SelectInput
        defaultValue={form.getValues('renderingProviderId')}
        value={form.getValues('renderingProviderId')}
        field="renderingProviderId"
        placeholder="Select"
        options={staffData}
        buttonClassName="w-full h-6"
        className="h-full flex-1"
        onValueChange={handleValueChange}
        disabled={form.getValues('claimStatusCode') !== 'NewCharge'}
      />
    </FormFieldContainer>
  )
}

export { RenderingProvider }
