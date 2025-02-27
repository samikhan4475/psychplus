'use client'

import { useEffect } from 'react'
import { Flex, ScrollArea } from '@radix-ui/themes'
import { DataTable, LoadingPlaceholder } from '@/components'
import { useStore } from '../store'
import { columns } from './table-columns'
import { useCodesetCodes } from '@/hooks'
import { CODESETS } from '@/constants'

interface PayerPlanAddressProps {
  payerId: string | undefined
}

const PayerPlanAddressTable = ({ payerId }: PayerPlanAddressProps) => {
  const { searchAddress, addressData, addressLoading } = useStore((state) => ({
    searchAddress: state.searchAddress,
    addressData: state.addressData,
    addressLoading: state.addressLoading,
  }))
  const stateCodes = useCodesetCodes(CODESETS.UsStates)
  useEffect(() => {
    if (payerId) searchAddress(payerId,stateCodes)
  }, [payerId])

  if (addressLoading) {
    return (
      <Flex height="100%" align="center" justify="center">
        <LoadingPlaceholder />
      </Flex>
    )
  }

  return (
    <ScrollArea>
      <DataTable
        data={addressData ?? []}
        columns={columns(payerId ?? '')}
        disablePagination
        sticky
      />
    </ScrollArea>
  )
}

export { PayerPlanAddressTable }
