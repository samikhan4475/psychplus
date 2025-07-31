'use client'

import { useEffect, useState } from 'react'
import { Dialog, Flex } from '@radix-ui/themes'
import toast from 'react-hot-toast'
import { CloseDialogTrigger, LoadingPlaceholder } from '@/components'
import { Appointment } from '@/types'
import { getAppointmentsAction } from '../actions/get-appointments'
import { MergedRecord } from '../types'
import { ChartTable } from './view-chart-table'

interface ChartTablePopupDialogProps {
  isOpen: boolean
  closeDialog: () => void
  selectedAppointment?: MergedRecord
}

const defaultParams = {
  includeCptCodes: false,
  includeEncounterTypes: true,
  includeFinancialData: false,
  includeLocation: false,
  includePatientData: true,
  includePatientNotes: true,
  includePatientTransactions: false,
  includeServiceGroup: false,
  includeServiceUnit: false,
  includeSpecialist: true,
  includeStaff: true,
  isServiceTimeDependant: false,
  startingDate: undefined,
}

const ChartTablePopup = ({
  isOpen,
  closeDialog,
  selectedAppointment,
}: ChartTablePopupDialogProps) => {
  const [data, setData] = useState<Appointment[]>([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (!isOpen) return
    const fetchData = async () => {
      setIsLoading(true)
      const payload = {
        ...defaultParams,
        facilityAdmissionIds: selectedAppointment?.facilityAdmissionDetailId
          .length
          ? [selectedAppointment?.facilityAdmissionDetailId]
          : undefined,
      }
      const result = await getAppointmentsAction(payload)
      setIsLoading(false)
      if (result.state === 'error') {
        toast.error(result.error || 'Error while fetching Provider coding view')
      } else {
        return setData(result.data || [])
      }
    }
    fetchData()
  }, [selectedAppointment?.facilityAdmissionDetailId, isOpen])

  return (
    <Dialog.Root open={isOpen}>
      <Dialog.Content className="max-w-[80%]" onInteractOutside={closeDialog}>
        <Flex justify="between">
          <Dialog.Title>
            Select {`${selectedAppointment?.name}'s`} chart to view
          </Dialog.Title>
          <CloseDialogTrigger onClick={closeDialog} />
        </Flex>
        {isLoading ? (
          <LoadingPlaceholder />
        ) : (
          <ChartTable data={data} closeDialog={closeDialog} />
        )}
      </Dialog.Content>
    </Dialog.Root>
  )
}

export { ChartTablePopup }
