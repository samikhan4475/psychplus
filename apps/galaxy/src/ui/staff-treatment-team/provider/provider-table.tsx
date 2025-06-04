'use client'

import { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { Flex } from '@radix-ui/themes'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { DataTable, FormContainer } from '@/components'
import { AllSelected } from './all-selected'
import { transferPatientsToPrimaryProvider } from './client-actions/transfer-primary-providers'
import { transferPatientsToSecondaryProvider } from './client-actions/transfer-secondary-providers'
import { columns } from './columns'
import { providerSchema, ProviderSchemaType } from './schema'
import { SearchAddPatientSelect } from './search-add-patient'
import { useStore } from './store'
import { TransferPatientsPopup } from './transfer-patients-popup/transfer-patients-popup'

type ProviderTableProps = {
  isPrimary: boolean
  providerType: string
  staffId: string
}

const ProviderTable = ({
  isPrimary = true,
  providerType,
  staffId,
}: ProviderTableProps) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false)
  const { fetchPatientsOfProvider, primaryPatients, secondaryPatients } =
    useStore((state) => ({
      fetchPatientsOfProvider: state.fetchPatientsOfProvider,
      primaryPatients: state.primaryPatients,
      secondaryPatients: state.secondaryPatients,
    }))

  const form = useForm<ProviderSchemaType>({
    resolver: zodResolver(providerSchema),
    reValidateMode: 'onChange',
    defaultValues: {
      isPrimary,
      selectedRows: [],
      isPopupOpen: false,
      providerId: '',
      providerType,
    },
  })
  const selectedRows = form.watch('selectedRows')

  const onSubmit = async (data: ProviderSchemaType) => {
    if (selectedRows.length > 0 && providerType) {
      let response
      if (isPrimary) {
        const payload = {
          staffId: data.providerId,
          patientIds: selectedRows.map((item) => +item),
          providerType,
        }
        response = await transferPatientsToPrimaryProvider(payload)
      } else {
        const payload = {
          sourceStaffId: staffId,
          targetStaffId: data.providerId,
          patientIds: selectedRows.map((item) => +item),
          providerType,
        }
        response = await transferPatientsToSecondaryProvider(payload)
      }
      if (response.state === 'error') {
        toast.error(response.error ?? 'Error while making primary')
        return
      }
      form.setValue('providerId', '')
      setIsPopupOpen(false)
      fetchPatientsOfProvider(+staffId, isPrimary, providerType)
      toast.success('Patients transferred successfully')
    }
  }

  const onOpen = (patientId: number) => {
    setIsPopupOpen(true)

    if (patientId && !selectedRows.includes(`${patientId}`)) {
      form.setValue('selectedRows', [...selectedRows, `${patientId}`])
    }
  }

  const onTransferPopupClose = () => {
    setIsPopupOpen(false)
    form.reset()
  }

  const data = isPrimary ? primaryPatients : secondaryPatients

  return (
    <FormContainer form={form} onSubmit={onSubmit}>
      <TransferPatientsPopup
        providerType={providerType}
        isPopupOpen={isPopupOpen}
        onClose={onTransferPopupClose}
        staffId={staffId}
        onSubmit={onSubmit}
      />
      <Flex
        className="bg-white min-h-[150px] max-w-[calc(100vw_-_198px)] overflow-visible px-4 py-2"
        direction="column"
        gap="2"
      >
        <SearchAddPatientSelect
          isPrimary={isPrimary}
          staffId={+staffId}
          providerType={providerType}
        />
        <AllSelected onOpen={onOpen} />
        <DataTable
          columns={columns(selectedRows, onOpen)}
          data={data}
          tdClass="!p-0"
          isRowSpan
          sticky
          disablePagination
          tableRowClass="border-b bg-white border-red-200"
          tableClass="max-w-[555px]"
          theadClass="z-10"
          defaultSorting={[{ id: 'addedOn', desc: false }]}
        />
      </Flex>
    </FormContainer>
  )
}

export { ProviderTable }
