'use client'

import { Flex } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import toast from 'react-hot-toast'
import { FormFieldError } from '@/components'
import {
  CodeItem,
  ServiceMasterFeeScheduleResponse,
  StaffResource,
} from '@/types'
import { getServiceMasterFeeSchedule } from '../actions'
import { ClaimUpdateSchemaType } from '../schema'
import { SearchProcedureCodes } from './procedure-code-search'

interface TableCellProcedureProps {
  rowIndex: number
  selectedStaff: StaffResource | undefined
}

const TableCellProcedure: React.FC<TableCellProcedureProps> = ({
  rowIndex,
  selectedStaff,
}) => {
  const form = useFormContext<ClaimUpdateSchemaType>()
  const handleProcedureCodeSelected = async (selectedItem: CodeItem) => {
    const { code } = selectedItem
    const result = await fetchAndProcessCPTData(code)
    form.setValue(`claimServiceLines.${rowIndex}.cptCode`, code, {
      shouldDirty: true,
    })
    if (result) {
      const { medicareAmount, category } = result
      form.setValue(
        `claimServiceLines.${rowIndex}.totalAmount`,
        medicareAmount,
        {
          shouldDirty: true,
        },
      )
      form.setValue(
        `claimServiceLines.${rowIndex}.unitAmount`,
        medicareAmount,
        {
          shouldDirty: true,
        },
      )
      form.setValue(
        `claimServiceLines.${rowIndex}.isAnesthesia`,
        category === 'Anesthesia',
        {
          shouldDirty: true,
        },
      )
    }
  }
  const fetchAndProcessCPTData = async (
    code: string,
  ): Promise<{ medicareAmount: number; category: string } | null> => {
    const data = await getServiceMasterFeeSchedule({ cptCode: [code] })
    if (data.state === 'success') {
      const response = data.data
      if (response.length > 0) {
        const apiResponse = response[0]
        const category = apiResponse.category ?? ''
        const medicareAmount = getAmountBasedOnHonors(
          selectedStaff,
          apiResponse,
        )
        return { medicareAmount, category }
      } else {
        return null
      }
    } else {
      toast('Error fetching data')
      return null
    }
  }

  const getAmountBasedOnHonors = (
    staffData: StaffResource | undefined,
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

  return (
    <Flex direction={'column'}>
      <SearchProcedureCodes
        fieldName={`claimServiceLines.${rowIndex}.cptCode`}
        onChange={handleProcedureCodeSelected}
        disabled={form.formState.disabled}
      />
      <FormFieldError name={`claimServiceLines.${rowIndex}.cptCode`} />
    </Flex>
  )
}

export { TableCellProcedure }
