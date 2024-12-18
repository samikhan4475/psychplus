import { useEffect, useMemo, useState } from 'react'
import { Path, useFormContext } from 'react-hook-form'
import { Appointment, CreditCard } from '@/types'
import { formatDateTime } from '@/utils'
import { PaymentMap } from '../types'
import { getPatientUnpaidAppointmentsAction } from './actions'
import { PaymentDetailSchemaType } from './payment-schema'
import { useStore } from './store'
import {
  AppointmentOptionType,
  PaymentMethod,
  UseAppointmentOptionParams,
} from './types'
import { maskCardNumber } from './utils'

function usePaymentTypeField<T extends object>(fieldName: Path<T>) {
  const form = useFormContext<T>()

  const values = form.watch(fieldName) as string[]

  const isChecked = (value: string) => {
    if (!values || !Array.isArray(values)) return false
    return values.includes(value)
  }

  const shouldDisable = (value: string) => !isChecked(value)

  return { isChecked, shouldDisable, form, paymentTypeValues: values }
}

const useAppointmentOptions = ({
  patientId,
  paymentType,
}: UseAppointmentOptionParams) => {
  const [appointments, setAppointments] = useState<Appointment[]>([])

  const { setCoPayMap, setCoInsuranceMap } = useStore((state) => ({
    setCoPayMap: state.setCoPayMap,
    setCoInsuranceMap: state.setCoInsuranceMap,
  }))

  useEffect(() => {
    if (!patientId) return

    getPatientUnpaidAppointmentsAction(patientId, paymentType).then(
      (result) => {
        if (result.state === 'success') {
          setAppointments(result.data)
        }
      },
    )
  }, [patientId, paymentType])

  const setMap =
    paymentType === AppointmentOptionType.CoPay
      ? setCoPayMap
      : setCoInsuranceMap

  const { options, paymentMap } = useMemo(() => {
    const paymentMap: PaymentMap = {}
    const options = appointments.map((data) => {
      const appointmentId = String(data.app_id)
      const amount =
        paymentType === AppointmentOptionType.CoPay
          ? parseFloat(data.coPayAmount ?? '0')
          : parseFloat(data.coInsuranceAmount ?? '0')
      paymentMap[appointmentId] = amount

      return {
        value: appointmentId,
        label: `${formatDateTime(data.appointmentDateTime)} | ${
          data.visitType
        } | ${data.providerName} | ${data.app_id}`,
      }
    })
    return { options, paymentMap }
  }, [appointments, paymentType])

  useEffect(() => {
    setMap(paymentMap)
  }, [paymentMap, setMap])

  return options
}

const usePrimaryCardDetails = () => {
  const { patientCards } = useStore((state) => ({
    patientCards: state.patientCards,
  }))
  const { setValue, getValues } = useFormContext<PaymentDetailSchemaType>()

  const [primaryCardDetails, setPrimaryCardDetails] = useState<
    CreditCard | undefined
  >(undefined)

  useEffect(() => {
    const primaryCard = patientCards?.find((card) => card.isPrimary)
    if (!primaryCard) return
    const paymentMethod = getValues('paymentMethod')
    const { cardKey, id, numberLastFour } = primaryCard

    setValue('card_Key', cardKey, { shouldValidate: true })
    setValue('card_id', String(id))

    if (paymentMethod === PaymentMethod.CreditCard) {
      setValue('paymentDescription', maskCardNumber(numberLastFour))
    }

    setPrimaryCardDetails(primaryCard)
  }, [patientCards, setValue, getValues])

  return { primaryCardDetails }
}

export { usePaymentTypeField, usePrimaryCardDetails, useAppointmentOptions }
