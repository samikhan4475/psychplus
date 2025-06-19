import React, { useEffect } from 'react'
import { Box } from '@radix-ui/themes'
import { TitleSection } from '../../common'
import { useStore } from '../../store'
import LabOrdersTable from './lab-orders-table'

const LabOrdersSection = () => {
  const { labOrders, loading, fetchLabOrders } = useStore((state) => ({
    labOrders: state.labOrders,
    loading: state.loading,
    fetchLabOrders: state.fetchLabOrders,
  }))

  useEffect(() => {
    fetchLabOrders()
  }, [])

  return (
    <Box>
      <TitleSection title="Lab Orders" />
      <LabOrdersTable labOrders={labOrders} loading={loading} />
    </Box>
  )
}

export { LabOrdersSection }
