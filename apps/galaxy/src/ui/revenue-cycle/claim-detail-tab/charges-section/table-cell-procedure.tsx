'use client'

import { useFormContext } from 'react-hook-form'
import toast from 'react-hot-toast'
import { getServiceMasterFeeSchedule } from '../actions'
import { SearchProcedureCodes } from './procedure-code-search'
import { CodeItem } from '@/types'

interface TableCellProcedureProps {
  rowIndex: number
}

const TableCellProcedure: React.FC<TableCellProcedureProps> = ({
  rowIndex,
}) => {
  const { setValue } = useFormContext()

  const handleProcedureCodeSelected = async (selectedItem: CodeItem) => {
    const { code } = selectedItem
    const result = await fetchAndProcessCPTData(code)
    if (result) {
      const { medicareAmount, category } = result
      if (category === 'Anesthesia') {
        setValue(`claimServiceLines.${rowIndex}.isAnesthesia`, true)
      }
      setValue(`claimServiceLines.${rowIndex}.totalAmount`, medicareAmount)
      setValue(`claimServiceLines.${rowIndex}.unitAmount`, medicareAmount)
    }
    setValue(`claimServiceLines.${rowIndex}.cptCode`, code)
  }

  const fetchAndProcessCPTData = async (
    code: string,
  ): Promise<{ medicareAmount: number; category: string } | null> => {
    const data = await getServiceMasterFeeSchedule({ cptCode: code })
    if (data.state === 'success') {
      const response = data.data.serviceMasterFeeSchedule
      if (response.length > 0) {
        const apiResponse = response[0]
        const medicareAmount =
          apiResponse.medicareAmount !== undefined &&
          apiResponse.medicareAmount !== null
            ? parseFloat(apiResponse.medicareAmount)
            : 0
        const category = apiResponse.category ?? ''
        return { medicareAmount, category }
      } else {
        return null
      }
    } else {
      toast('Error fetching data')
      return null
    }
  }

  return (
    <SearchProcedureCodes
      fieldName={`claimServiceLines.${rowIndex}.cptCode`}
      onChange={handleProcedureCodeSelected}
    />
  )
}

export { TableCellProcedure }
