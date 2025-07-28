'use client'

import { useEffect } from 'react'
import { useParams } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import { MagnifyingGlassIcon } from '@radix-ui/react-icons'
import { Button } from '@radix-ui/themes'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useShallow } from 'zustand/react/shallow'
import { FormContainer } from '@/components'
import { sanitizeFormData } from '@/utils'
import { getDateString } from '../schedule/utils'
import { TCM } from './constants'
import {
  AdmitDateField,
  AdmitTimeField,
  AdmittingProviderSelect,
  BalanceDue,
  BalancePaid,
  CoInsDue,
  CoInsPaid,
  CosignerSelect,
  DateOfServiceField,
  DcDateField,
  DcHospitalField,
  DischargeDateField,
  FacilityAdmissionIdField,
  FromDateField,
  LocationSelect,
  PrimaryInsuranceSelect,
  ProviderSelect,
  ProviderTypeSelect,
  SecondaryInsuranceSelect,
  ServiceSelect,
  ToDateField,
  VisitNumberField,
  VisitStatusSelect,
  VisitTypeSelect,
} from './filter-form-fields'
import { CoPayDue } from './filter-form-fields/copay-due'
import { CopayPaid } from './filter-form-fields/copay-paid'
import { ResetButton } from './reset-button'
import { SchedulingHistorySchemaType, schema } from './schema'
import { useStore } from './store'
import { TCMVisitTypes } from './types'

const FilterForm = () => {
  const { id } = useParams<{ id: string }>()
  const { fetchSchedulingHistory, visitTypes, setIsTCMVisitType } = useStore(
    useShallow((state) => ({
      fetchSchedulingHistory: state.fetchSchedulingHistory,
      visitTypes: state.visitTypes,
      setIsTCMVisitType: state.setIsTCMVisitType,
    })),
  )

  const form = useForm<SchedulingHistorySchemaType>({
    resolver: zodResolver(schema),
    defaultValues: {
      patientId: undefined,
      fromDate: undefined,
      toDate: undefined,
      visitId: '',
      facilityAdmissionId: '',
      visitTypeCode: '',
      locationId: '',
      visitStatuses: '',
      admittingProviderName: '',
      admittingProviderStaffId:'',
      admissionDateTime: undefined,
      admitTime: undefined,
      dischargeVisitSequenceDate: undefined,
      dateOfService: undefined,
      serviceId: '',
      providerType: '',
      providerUserId: '',
      cosignerUserId: '',
      dischargeHospitalName: '',
      dischargeHospitalDate: undefined,
      residingStateCode: '',
      primaryInsurancePolicyId: '',
      secondaryInsurancePolicyId: '',
      coPayDue: '',
      coPayPaid: '',
      coInsDue: '',
      coInsPaid: '',
      balanceDue: '',
      balancePaid: '',
    },
    mode: 'onBlur',
  })

  const onSubmit: SubmitHandler<SchedulingHistorySchemaType> = (data) => {
    const { dateOfService, ...rest } = data
    const formattedData = {
      ...rest,
      fromDate: getDateString(data.fromDate),
      admitTime: data.admitTime ? data.admitTime.toString() : undefined,
      toDate: getDateString(data.toDate),
      admissionDateTime: getDateString(data.admissionDateTime),
      dischargeVisitSequenceDate: getDateString(
        data.dischargeVisitSequenceDate,
      ),
      appointmentDateTime: getDateString(dateOfService),
      dischargeHospitalDate: getDateString(data.dischargeHospitalDate),
      visitStatuses: data.visitStatuses ? [data.visitStatuses] : undefined,
      patientIds: data?.patientId ? [Number(data?.patientId)] : undefined,
    }
    const sanitizedData = sanitizeFormData(formattedData)
    fetchSchedulingHistory(id, sanitizedData)
  }
  const selectedVisitTypeCode = form.watch('visitTypeCode')
  const selectedVisitType = visitTypes?.find(
    (item) => item?.value === selectedVisitTypeCode,
  )

  const isTCMVisitType = selectedVisitType
    ? TCM.includes(selectedVisitType.label as TCMVisitTypes)
    : false

  useEffect(() => {
    setIsTCMVisitType(isTCMVisitType)
  }, [isTCMVisitType])

  return (
    <FormContainer
      className="bg-white flex-row flex-wrap gap-2 rounded-b-2 rounded-t-1 px-2 py-1 shadow-2"
      form={form}
      onSubmit={onSubmit}
    >
      <FromDateField />
      <ToDateField />
      <VisitNumberField />
      <FacilityAdmissionIdField />
      <AdmittingProviderSelect />
      <AdmitDateField />
      <AdmitTimeField />
      <DischargeDateField />
      <DateOfServiceField />
      <VisitTypeSelect />
      <LocationSelect />
      <ServiceSelect />
      <ProviderTypeSelect />
      <ProviderSelect />
      <CosignerSelect />
      {isTCMVisitType && (
        <>
          <DcHospitalField />
          <DcDateField />
        </>
      )}
      <VisitStatusSelect />
      <PrimaryInsuranceSelect />
      <SecondaryInsuranceSelect />
      <CoPayDue />
      <CopayPaid />
      <CoInsDue />
      <CoInsPaid />
      <BalanceDue />
      <BalancePaid />
      <ResetButton />
      <Button highContrast size="1" type="submit">
        <MagnifyingGlassIcon strokeWidth={2} />
      </Button>
    </FormContainer>
  )
}

export { FilterForm, type SchedulingHistorySchemaType }
