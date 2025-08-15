import { useState } from 'react'
import { useParams, useSearchParams } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import { DateValue } from 'react-aria-components'
import { SubmitHandler, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { genericEventBus } from '@/lib/generic-event-bus'
import { LabOrders } from '@/types'
import { getCalendarDateLabel } from '@/utils'
import { useStore } from '../lab-orders-widget/store'
import {
  addDiagnosis,
  addLabOrderApi,
  addSpecimenApi,
  addTestLabsApi,
  editLabOrderApi,
  editSpecimenApi,
  getLabOrderRequisition,
  placeLabOrderApi,
} from './api'
import { LabOrderStatusEnum, SpecimenData } from './blocks/types'
import { labOrderSchema, LabOrderSchemaType } from './lab-order-schema'

const getDateString = (date?: DateValue): string | undefined =>
  date ? getCalendarDateLabel(date) : undefined
const useLabOrderForm = (
  labOrderData: LabOrderSchemaType,
  setOpen: (value: boolean) => void,
) => {
  const { id } = useParams<{ id: string }>()
  const appointmentId = useSearchParams().get('id') ?? ''
  const { updateLabOrdersList, isQuickNoteView } = useStore()
  const [loadingSubmit, setLoadingSubmit] = useState(false)
  const [loadingPlaceOrder, setLoadingPlaceOrder] = useState(false)

  const isFormDisabled =
    labOrderData?.labLocationData?.name === 'Quest' &&
    labOrderData.labOrderStatus !== LabOrderStatusEnum.Unsigned &&
    labOrderData.labOrderStatus !== LabOrderStatusEnum.SignedNotSent

  const form = useForm<LabOrderSchemaType>({
    resolver: zodResolver(labOrderSchema),
    disabled: isFormDisabled,
    reValidateMode: 'onChange',
    defaultValues: labOrderData,
  })

  const createPayload = (
    data: LabOrderSchemaType,
    orderSentDateTime: string,
  ) => ({
    patientId: id,
    appointmentId,
    orderStatus: data.labOrderStatus,
    billType: data.labBillingType,
    labOrderNumber: data?.labOrderNumber,
    labOrderDate: orderSentDateTime,
    OrderingStaffId: data?.providerDetail?.providerStaffId,
    labId: form.getValues('labLocationData')?.id ?? '',
    isFasting: data.isFasting === 'yes',
    IsTest: true,
    locationId: 0,
    orderingLab: {
      name: form.getValues('labLocationData')?.name ?? '',
      locationId: form.getValues('labLocationData')?.id ?? '',
    },
    isRecurrentOrder: data.isRecurrentOrder === 'yes',
    repeatStartDate: getDateString(data.repeatStartDate),
    repeatEndDate: getDateString(data.repeatEndDate),
    recurrenceType: data.recurrenceType,
  })

  const labTestAction = async (orderId: string, isEdit: boolean) => {
    const labQuestions = form.getValues('labQuestions')

    const updatedTests = form.getValues('testLabs')?.map((item) => {
      const { id, isNewTestLab, ...rest } = item

      const extraParam = isEdit && !isNewTestLab ? { id } : {}

      const newLabTestAnswers = item.askAtOrderEntries?.map((question: any) => {
        const entryAnswer =
          labQuestions[`${item.labTestCode}_${question.questionCode}`].answer
        delete question.id
        return {
          ...question,
          entryAnswer,
        }
      })

      const existingLabTestAnswers = item?.labTestAnswers?.map(
        (question: any) => {
          return {
            ...question,
            entryAnswer:
              labQuestions[`${item.labTestCode}_${question.questionCode}`]
                .answer,
          }
        },
      )

      return {
        ...rest,
        ...extraParam,
        orderId,
        labTestAnswers: existingLabTestAnswers || newLabTestAnswers,
      }
    })

    const result = await addTestLabsApi(updatedTests)
    return result
  }

  const diagnosisAction = async (orderId: string) => {
    const activeDiagnostics = form
      .getValues('diagnosis')
      .filter(
        (item) =>
          (item?.activeStatus === 'Active' || item?.isActive === true) &&
          item?.newDignoses === true,
      )
      .map((item) => {
        delete item.id
        delete item.metadata
        return {
          ...item,
          symptomCode: item?.code,
          diagnosisCode: item?.code,
          orderId,
          recordStatus: 'Active',
          symptomCodeDescription: item?.description,
          DiagnosisDescription: item?.description,
        }
      })

    if (activeDiagnostics.length > 0) {
      await addDiagnosis(activeDiagnostics)
    }
  }

  const labOrderAction = async (data: LabOrderSchemaType) => {
    const orderId = form.getValues('labOrderId')
    const orderSentDateTime = `${data.orderDate}T${data.orderTime}:00Z`
    const payload = createPayload(data, orderSentDateTime)
    if (orderId) {
      const result = await editLabOrderApi(orderId, { ...payload, id: orderId })
      return { ...result, isEdit: true }
    } else {
      const result = await addLabOrderApi(payload)
      return { ...result, isEdit: false }
    }
  }

  const addSpecimen = async (item: SpecimenData) => {
    delete item.id
    const startDate = `${item.StartDate}T${item.StartTime}:00Z`
    const endDate = `${item.EndDate}T${item.EndTime}:00Z`
    const volume =
      typeof item.volume === 'string' ? parseFloat(item.volume) : item.volume
    await addSpecimenApi({
      ...item,
      collectedOn: startDate,
      collectionReceivedDateTime: endDate,
      volume,
      labSpecimen: item?.TestId,
      orderId: form.getValues('labOrderId'),
    })
  }

  const editSpecimen = async (item: SpecimenData) => {
    const startDate = `${item.StartDate}T${item.StartTime}:00Z`
    const endDate = `${item.EndDate}T${item.EndTime}:00Z`
    const volume =
      typeof item.volume === 'string' ? parseFloat(item.volume) : item.volume
    await editSpecimenApi(appointmentId, {
      ...item,
      collectedOn: startDate,
      collectionReceivedDateTime: endDate,
      volume,
    })
  }

  const specimenActions = async () => {
    const specimenList = form.getValues('specimenList')

    const createdSpecimens = specimenList.filter((item) => item.newSpecimen)
    const editSpecimens = specimenList.filter(
      (item) => !item.newSpecimen && item.id,
    )

    if (createdSpecimens.length > 0) {
      await Promise.all(createdSpecimens.map(addSpecimen))
    }

    if (editSpecimens.length > 0) {
      await Promise.all(editSpecimens.map(editSpecimen))
    }
  }

  const onSaveOrder = async (
    data: LabOrderSchemaType,
    isPlaceOrder?: boolean,
  ) => {
    const result = await labOrderAction(data)
    if (result.state === 'success') {
      const specimenList = form.getValues('specimenList')
      const labTestResult = await labTestAction(
        result.data.id ?? '',
        result.isEdit,
      )
      await diagnosisAction(result.data.id ?? '')
      if (result.isEdit && specimenList.length > 0) {
        await specimenActions()
      }
      let updatedLabOrder
      if (labTestResult.state === 'success') {
        updatedLabOrder = {
          ...result.data,
          labTests: [...labTestResult.data],
        }
        if (isQuickNoteView) {
          genericEventBus.emit(`${appointmentId}`, {
            type: 'lab-order',
            message: 'Lab order added/updated',
            timestamp: new Date().toISOString(),
          })
        }
      } else {
        updatedLabOrder = {
          ...result.data,
          labTests: [],
        }
      }

      if (isPlaceOrder && data.labLocationData?.name === 'Quest') {
        const requisitionResponse = await getLabOrderRequisition(
          result.data?.id ?? '',
        )
        if (requisitionResponse.state === 'success') {
          const placeOrderResponse = await placeLabOrderApi(
            result.data?.id ?? '',
          )
          if (placeOrderResponse.state === 'success') {
            toast.success('Order Placed!')
          } else {
            toast.error(
              placeOrderResponse?.error ?? 'Error while placing order',
            )
          }
        } else {
          toast.error(requisitionResponse?.error ?? 'Error while placing order')
        }
      } else {
        toast.success('Saved!')
      }
      updateLabOrdersList(updatedLabOrder as LabOrders) //local
      setOpen(false)
    } else {
      toast.error(result?.error ?? 'Error while saving!')
    }
    setLoadingSubmit(false)
    setLoadingPlaceOrder(false)
  }

  const onClickPlaceOrder = (e: React.MouseEvent<HTMLButtonElement>) => {
    const labOrderStatus = form.getValues('labOrderStatus')
    if (labOrderStatus === LabOrderStatusEnum.Unsigned) {
      form.setValue('labOrderStatus', 'Signed')
    }
    form.handleSubmit((data) => {
      setLoadingPlaceOrder(true)
      onSaveOrder(data, true)
    })(e)
  }

  const onSubmit: SubmitHandler<LabOrderSchemaType> = async (data) => {
    setLoadingSubmit(true)
    onSaveOrder(data)
  }

  return {
    form,
    onSubmit,
    onClickPlaceOrder,
    loadingPlaceOrder,
    loadingSubmit,
    isFormDisabled,
  }
}

export { useLabOrderForm }
