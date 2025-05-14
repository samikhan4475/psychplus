import React, { useEffect } from 'react'
import { useFormContext } from 'react-hook-form'
import toast from 'react-hot-toast'
import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
  SelectInput,
} from '@/components'
import { StaffResource } from '@/types'
import { getStaffByVisitTypeAction } from '../../actions/get-staff-by-visitType-action'
import { useStore } from '../../store'

const VisitTypeSelectField = () => {
  const form = useFormContext()

  const { visitTypes, setProviders, setProviderLoading } = useStore()

  const getStaffOptions = async (visitType: string) => {
    setProviderLoading(true)
    const servicesOffered = visitTypes.find((item) => item.value === visitType)

    const res = await getStaffByVisitTypeAction({
      servicesOffered: servicesOffered?.servicesOffered ?? '',
      isIncludeTestProviders: false,
    })

    if (res.state === 'error') {
      toast.error(res.error)
      setProviderLoading(false)
      return
    }

    const staffOptions = res.data.map((item: StaffResource) => ({
      label: `${item.legalName?.firstName} ${item.legalName?.lastName}, ${item.legalName?.honors}`,
      value: String(item.id),
    }))

    setProviders(staffOptions)
    setProviderLoading(false)
  }

  useEffect(() => {
    const visitType = form.watch('visitTypeCode')
    if (visitType) {
      getStaffOptions(visitType)
    }
  }, [form.watch('visitTypeCode')])

  return (
    <FormFieldContainer className="w-full flex-col">
      <FormFieldLabel required>Visit Type</FormFieldLabel>
      <SelectInput
        field="visitTypeCode"
        buttonClassName={buttonClassName}
        options={visitTypes}
      />
      <FormFieldError name="visitTypeCode" />
    </FormFieldContainer>
  )
}

const buttonClassName =
  'border-pp-gray-2 h-6 border border-solid !outline-none [box-shadow:none] w-full'

export default VisitTypeSelectField
