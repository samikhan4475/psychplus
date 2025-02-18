import { useEffect, useRef } from 'react'
import { Flex, Grid, Text } from '@radix-ui/themes'
import { useFormContext, useWatch } from 'react-hook-form'
import { CODESETS } from '@/constants'
import { useCodesetCodes } from '@/hooks'
import { ClaimServiceLine } from '@/types'
import { cn } from '@/utils'
import { getClaimStatusDisplay } from '../../utils'
import { ClaimUpdateSchemaType } from '../schema'

const formatDateOfBirth = (dob: string | undefined): string => {
  if (!dob) return ''

  const date = new Date(dob)
  const day = String(date.getDate()).padStart(2, '0')
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const year = String(date.getFullYear())

  return `${month}/${day}/${year}`
}
const calculateBilledAmount = (
  claimServiceLines: ClaimServiceLine[],
): number => {
  if (!Array.isArray(claimServiceLines)) {
    return 0
  }
  const activeClaimServiceLines = claimServiceLines.filter(
    (charge: ClaimServiceLine) => charge.recordStatus !== 'Deleted',
  )
  return activeClaimServiceLines.reduce((sum, serviceLine) => {
    return sum + Number(serviceLine.totalAmount)
  }, 0)
}
const PatientClaimDetails = () => {
  const form = useFormContext<ClaimUpdateSchemaType>()
  const { watch, setValue } = form

  const isInitialRender = useRef(true)

  const patientName = watch('patientName')
  const gender = watch('patientGender')
  const dob = watch('patientDateOfBirth')
  const accountNumber = watch('patientAccountNumber')
  const claimStatusCode = watch('claimStatusCode')
  const billedAmt = watch('totalAmount') ?? 0.0
  const amountDue = form.watch('amountDue')
  const claimServiceLines = useWatch({
    control: form.control,
    name: 'claimServiceLines',
  })
  const updatedByName = form.watch('updatedByName')
  const primaryPaid = form.watch('primaryPaid') ?? 0.0
  const secondaryPaid = form.watch('secondaryPaid') ?? 0.0
  const totalWriteOff = form.watch('totalWriteOff') ?? 0.0
  const patientPaid = form.watch('patientPaid') ?? 0.0

  useEffect(() => {
    const billedAmount = calculateBilledAmount(claimServiceLines)
    setValue('totalAmount', billedAmount)
  }, [claimServiceLines])

  useEffect(() => {
    if (isInitialRender.current) {
      isInitialRender.current = false
      return
    }
    const claimBalance =
      billedAmt - (primaryPaid + secondaryPaid + patientPaid + totalWriteOff)
    setValue('amountDue', claimBalance)
  }, [billedAmt])

  const claimStatuses = useCodesetCodes(CODESETS.ClaimStatus)

  const claimStatus = claimStatusCode
    ? getClaimStatusDisplay(claimStatuses, claimStatusCode)
    : claimStatusCode

  return (
    <Flex className="bg-pp-header-bg rounded-[5px] p-2">
      <Grid
        columns="2"
        gap="3"
        rows="repeat(2)"
        className=" border-pp-border mr-2 w-2/5 border-r border-solid"
      >
        <LabelAndValue label="Patient Name" value={patientName} />
        <LabelAndValue label="Gender" value={gender} />
        <LabelAndValue label="DOB" value={formatDateOfBirth(dob)} />
        <LabelAndValue label="Account Number" value={accountNumber} />
      </Grid>
      <Grid columns="4" gap="3" rows="repeat(2)" className="w-3/5">
        <LabelAndValue label="Billed" value={`$${billedAmt.toFixed(2)}`} />
        <LabelAndValue
          label="Secondary Paid"
          value={`$${secondaryPaid.toFixed(2)}`}
        />
        <LabelAndValue
          label="Write Off"
          value={`$${totalWriteOff.toFixed(2)}`}
        />
        <LabelAndValue label="Last Modified By" value={updatedByName} />
        <LabelAndValue
          label="Primary Paid"
          value={`$${primaryPaid.toFixed(2)}`}
        />
        <LabelAndValue
          label="Patient Paid"
          value={`$${patientPaid.toFixed(2)}`}
        />
        <LabelAndValue label="Balance" value={`$${amountDue?.toFixed(2)}`} />
        <LabelAndValue label="Claim Status" value={claimStatus} />
      </Grid>
    </Flex>
  )
}

interface LabelAndValueProps {
  label: string
  value?: string
}

const LabelAndValue = ({ label, value }: LabelAndValueProps) => (
  <Flex gap="1" className="whitespace-nowrap">
    <Text className="text-[11.5px] font-[600]">{label}</Text>
    <Text
      className={cn('text-[11.5px]', {
        'italic text-gray-9': !value,
      })}
    >
      {value ?? 'N/A'}
    </Text>
  </Flex>
)

export { PatientClaimDetails }
