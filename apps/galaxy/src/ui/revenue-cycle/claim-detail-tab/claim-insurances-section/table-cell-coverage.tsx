'use client'

import { Flex } from '@radix-ui/themes'
import { CellContext } from '@tanstack/react-table'
import { useFormContext } from 'react-hook-form'
import { CodesetSelect, SelectInput, TextCell } from '@/components'
import { CODESETS } from '@/constants'
import { InsuranceClaimPolicy } from '@/types'
import { ClaimUpdateSchemaType } from '../schema'

const insuranceTypeOptions = [
  { value: 'Primary', label: 'Primary' },
  { value: 'Secondary', label: 'Secondary' },
  { value: 'Tertiary', label: 'Tertiary' },
]

interface TableCellCOVERAGEProps {
  editRowId?: number | null
  row: CellContext<InsuranceClaimPolicy, unknown>['row']
}

const TableCellCoverage = ({ editRowId, row }: TableCellCOVERAGEProps) => {
  const { getValues, setValue } = useFormContext<ClaimUpdateSchemaType>()
  const isValidPriority = (
    value: string,
  ): value is 'Primary' | 'Secondary' | 'Tertiary' =>
    ['Primary', 'Secondary', 'Tertiary'].includes(value)

  const handlePriorityChange = (
    newPriority: 'Primary' | 'Secondary' | 'Tertiary',
    editRowId: number,
  ) => {
    const claimPolicies = getValues('claimInsurancePolicies')
    const primaryPolicyId = getValues('primaryPatientInsurancePolicyId')
    const secondaryPolicyId = getValues('secondaryPatientInsurancePolicyId')
    const tertiaryPolicyId = getValues('tertiaryPatientInsurancePolicyId')

    const selectedPolicy = claimPolicies[editRowId]
    const selectedPolicyId = selectedPolicy?.id

    let currentPriority: 'Primary' | 'Secondary' | 'Tertiary' | null = null
    if (primaryPolicyId === selectedPolicyId) currentPriority = 'Primary'
    else if (secondaryPolicyId === selectedPolicyId)
      currentPriority = 'Secondary'
    else if (tertiaryPolicyId === selectedPolicyId) currentPriority = 'Tertiary'

    const priorityFields = {
      Primary: 'primaryPatientInsurancePolicyId' as const,
      Secondary: 'secondaryPatientInsurancePolicyId' as const,
      Tertiary: 'tertiaryPatientInsurancePolicyId' as const,
    }

    if (newPriority !== currentPriority) {
      const previousPriorityId = getValues(priorityFields[newPriority])
      setValue(priorityFields[newPriority], selectedPolicyId, {
        shouldDirty: true,
      })
      if (currentPriority && previousPriorityId !== undefined) {
        setValue(priorityFields[currentPriority], previousPriorityId, {
          shouldDirty: true,
        })
      } else if (currentPriority) {
        setValue(priorityFields[currentPriority], '', {
          shouldDirty: true,
        })
      }
    }

    const updatedClaimPolicies = claimPolicies.map((policy) => {
      if (policy.id === selectedPolicyId) {
        return { ...policy, insurancePolicyPriority: newPriority }
      } else if (policy.insurancePolicyPriority === newPriority) {
        return { ...policy, insurancePolicyPriority: currentPriority ?? '' }
      }
      return policy
    })

    setValue('claimInsurancePolicies', updatedClaimPolicies, {
      shouldDirty: true,
    })
  }

  if (editRowId === row.index) {
    return (
      <Flex direction={'column'}>
        <CodesetSelect
          name={`claimInsurancePolicies.${editRowId}.insurancePolicyPriority`}
          codeset={CODESETS.InsurancePolicyPriority}
          exclude={['Other']}
          size="1"
          className="h-full flex-1"
          onValueChange={(e) => {
            if (isValidPriority(e)) {
              handlePriorityChange(e, editRowId)
            }
          }}
        />
      </Flex>
    )
  }

  return <TextCell>{row.original.insurancePolicyPriority}</TextCell>
}

export { TableCellCoverage }
