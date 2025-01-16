import React, { useMemo, useState } from 'react'
import { Flex } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import toast from 'react-hot-toast'
import { PropsWithRow } from '@/components'
import { getAdjustmentCodesAction } from '@/ui/revenue-cycle/actions/get-adjustment-codes'
import { ClaimServiceLinePayment, InsurancePayment } from '../../../types'
import {
  adjustmentMapping,
  PROCESSED_AS_REVERSAL,
  WRITE_OFF_ADJUSTMENT,
} from '../constants'
import { SchemaType } from '../schema'
import { AdjustmentAddButton } from './adj-add-button'
import { AdjustmentAmountField } from './adjustment-amount-field'
import { AdjustmentCodeField } from './adjustment-code-field'
import { AdjustmentPill } from './adjustment-pill'
import { ReasonCodeField } from './reason-code-field'
import { RemarkCodeField } from './remark-code-field'
import {
  getAdjustmentStatus,
  getOtherWriteOff,
  updateOrAddAdjustment,
} from './utils'

interface AdjustmentReasonRemarkCellProps
  extends PropsWithRow<ClaimServiceLinePayment> {
  paymentDetail: InsurancePayment
}

const AdjustmentReasonRemarkCell = ({
  row,
  paymentDetail,
}: AdjustmentReasonRemarkCellProps) => {
  const form = useFormContext<SchemaType>()
  const processedAsCode = form.watch('processedAsCode')
  const [adjustment, setAdjustment] = useState({
    adjustmentCode: '',
    adjustmentAmount: '',
    remarkCode: '',
    reasonCode: '',
  })
  const [isLoading, setIsLoading] = useState(false)

  const onChange = (e: React.SyntheticEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget
    setAdjustment((prev) => ({ ...prev, [name]: value }))
  }

  const onChangeSelect = (value: string) =>
    setAdjustment((prev) => ({ ...prev, adjustmentCode: value }))

  const serviceLinePaymentAdjustments = useMemo(() => {
    return (
      form
        .watch(
          `claimServiceLinePayments.${row.index}.serviceLinePaymentAdjustments`,
        )
        ?.filter((adj) => adj.recordStatus === 'Active') ?? []
    )
  }, [form, row.index])

  const addAdjustment = () => {
    const { adjustmentCode, reasonCode, adjustmentAmount, remarkCode } =
      adjustment
    const { billedAmount } = row.original
    if (!adjustmentCode || !reasonCode || !adjustmentAmount) {
      toast.error('Adjustment GroupCode - ReasonCode - Amount must be filled')
    } else if (adjustmentAmount === '0') {
      toast.error('Adjustment amount must be greater than 0')
    } else if (+adjustmentAmount > +billedAmount) {
      toast.error(
        `Adjustment amount can't be greater than billed amount $${billedAmount}`,
      )
    } else {
      const finalAdjustmentAmount =
        processedAsCode === PROCESSED_AS_REVERSAL
          ? -+adjustmentAmount
          : +adjustmentAmount

      const updatedServiceLineAdjustments = updateOrAddAdjustment({
        adjustmentAmount: finalAdjustmentAmount,
        adjustmentReasonCode: reasonCode,
        adjustmentGroupCode: adjustmentCode,
        remarkCode: remarkCode,
        serviceLinePaymentAdjustments,
      })

      form.setValue(
        `claimServiceLinePayments.${row.index}.serviceLinePaymentAdjustments`,
        updatedServiceLineAdjustments,
      )

      if (
        adjustmentCode === WRITE_OFF_ADJUSTMENT.adjustmentGroupCode &&
        reasonCode === WRITE_OFF_ADJUSTMENT.adjustmentReasonCode
      ) {
        const allowedAmount = String(+billedAmount - +adjustmentAmount)

        const finalAllowedAmount =
          processedAsCode === PROCESSED_AS_REVERSAL
            ? -+allowedAmount
            : +adjustmentAmount
        const otherAdjustments = getOtherWriteOff(serviceLinePaymentAdjustments)
        form.setValue(
          `claimServiceLinePayments.${row.index}.writeOffAmount`,
          `${+finalAdjustmentAmount + +otherAdjustments}`,
        )
        form.setValue(
          `claimServiceLinePayments.${row.index}.allowedAmount`,
          `${finalAllowedAmount}`,
        )
      }

      setAdjustment({
        adjustmentCode: '',
        adjustmentAmount: '',
        reasonCode: '',
        remarkCode: '',
      })
    }
  }

  const onBlur = async () => {
    const { writeOffAmount } = row.original
    const { adjustmentCode, adjustmentAmount, reasonCode, remarkCode } =
      adjustment
    if (
      !adjustmentCode ||
      !reasonCode ||
      !adjustmentAmount ||
      adjustmentMapping[`${adjustmentCode}_${reasonCode}`]
    )
      return
    setIsLoading(true)
    const result = await getAdjustmentCodesAction({
      practiceIds: [paymentDetail?.practiceId],
      recordStatuses: ['Active'],
    })

    if (result.state === 'success') {
      const adjustmentStatus = getAdjustmentStatus({
        adjustmentCodes: result.data,
        adjustmentGroupCode: adjustmentCode,
        adjustmentReasonCode: reasonCode,
      })
      const finalAdjustmentAmount =
        processedAsCode === PROCESSED_AS_REVERSAL
          ? -+adjustmentAmount
          : +adjustmentAmount
      const updatedServiceLineAdjustments = updateOrAddAdjustment({
        adjustmentAmount: finalAdjustmentAmount,
        adjustmentReasonCode: reasonCode,
        adjustmentGroupCode: adjustmentCode,
        remarkCode,
        adjustmentStatus,
        serviceLinePaymentAdjustments,
      })

      form.setValue(
        `claimServiceLinePayments.${row.index}.serviceLinePaymentAdjustments`,
        updatedServiceLineAdjustments,
      )

      const otherAdjustments = getOtherWriteOff(serviceLinePaymentAdjustments)

      if (adjustmentStatus === 'WriteOff')
        form.setValue(
          `claimServiceLinePayments.${row.index}.writeOffAmount`,
          `${+finalAdjustmentAmount + +writeOffAmount + +otherAdjustments}`,
        )

      setIsLoading(false)
    } else if (result.state === 'error') {
      toast.error(result.error)
      setIsLoading(false)
    }
  }

  return (
    <Flex gapX="2" align="center" className="min-w-max">
      <Flex
        gapX="2"
        align="center"
        className={isLoading ? 'pointer-events-none opacity-70' : ''}
      >
        <AdjustmentCodeField
          value={adjustment.adjustmentCode}
          onChange={onChangeSelect}
        />
        <ReasonCodeField value={adjustment.reasonCode} onChange={onChange} />
        <RemarkCodeField value={adjustment.remarkCode} onChange={onChange} />
        <AdjustmentAmountField
          onBlur={onBlur}
          rowIndex={row.index}
          value={adjustment.adjustmentAmount}
          onChange={onChange}
        />
        <AdjustmentAddButton onClick={addAdjustment} />
      </Flex>
      {serviceLinePaymentAdjustments?.map((adjustment, index) => (
        <AdjustmentPill
          adjustments={serviceLinePaymentAdjustments}
          serviceLineIndex={row.index}
          adjustmentIndex={index}
          key={`${adjustment.adjustmentReasonCode}-${adjustment.adjustmentGroupCode}-${index}`}
          paymentAdjustment={adjustment}
        />
      ))}
    </Flex>
  )
}

export { AdjustmentReasonRemarkCell }
