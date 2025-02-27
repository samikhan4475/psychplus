'use client'

import { useState } from 'react'
import { Flex, Text } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { FormFieldError } from '@/components'
import {
  ClaimServiceLine,
  ServiceMasterFeeScheduleResponse,
  StaffResource,
} from '@/types'
import { cn } from '@/utils'
import { ConfirmationDialog } from '../../dialogs/confirmation-dialog'
import { useRevCycleDataProvider } from '../../revCycleContext'
import { getServiceMasterFeeSchedule, getStaffById } from '../actions'
import { ClaimUpdateSchemaType } from '../schema'
import { SearchClaimProviders } from './search-billing-provider'

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
  const form = useFormContext<ClaimUpdateSchemaType>()
  const { setSelectedStaffData } = useRevCycleDataProvider()

  const [open, setOpen] = useState(false)
  const handleValueChange = (value: string) => {
    if (!value) return
    setOpen(true)
  }
  const handleConfirmation = async () => {
    const renderingProviderId = form.getValues('renderingProviderId')
    const staffResponse = await getStaffById(Number(renderingProviderId))
    if (staffResponse.state === 'success') {
      const staffData = staffResponse.data
      setSelectedStaffData(staffData)
      const cptCodes = form
        .getValues('claimServiceLines')
        .filter(
          (line: ClaimServiceLine) =>
            line.recordStatus !== 'Deleted' && line.cptCode !== undefined,
        )
        .map((line: ClaimServiceLine) => line.cptCode as string)
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
              unitAmount: Number(amount),
              totalAmount: serviceLine.units
                ? Number((serviceLine.units * amount).toFixed(2))
                : undefined,
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
  const handleSelect = (
    selectedItem: { value: string; label: string } | null,
  ) => {
    if (selectedItem) {
      form.setValue('renderingProviderId', selectedItem.value, {
        shouldValidate: true,
        shouldDirty: true,
      })
      handleValueChange(selectedItem.value)
    } else {
      form.setValue('renderingProviderId', '', { shouldValidate: true })
    }
  }
  const renderingProvider = form.getValues('renderingProviderName')
  const defaultRenderingProvider: string | undefined = renderingProvider
    ? `${renderingProvider.firstName} ${renderingProvider.lastName}`
    : undefined

  return (
    <Flex direction={'column'}>
      <ConfirmationDialog
        isOpen={open}
        closeDialog={handleClose}
        onConfirmation={handleConfirmation}
        heading={'Are you sure?'}
        content={
          'Service Line Amount will be auto adjust as per new Rendering provider. '
        }
      />
      <Flex align="center" className={cn('text-[11px]')}>
        <Text as="label" wrap="nowrap" weight="medium">
          Rendering Provider
        </Text>
        <Text className="ml-[2px] text-[11px] text-red-9">*</Text>
      </Flex>
      <SearchClaimProviders
        placeholder="Search Rendering Provider"
        onSelectItem={handleSelect}
        defaultValue={defaultRenderingProvider}
        disabled={false}
      />
      <FormFieldError name={`renderingProviderId`} />
    </Flex>
  )
}

export { RenderingProvider }
