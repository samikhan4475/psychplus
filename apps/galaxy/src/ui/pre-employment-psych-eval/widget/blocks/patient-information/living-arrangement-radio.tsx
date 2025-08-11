'use client'

import { Flex } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { RadioFieldWithError } from '@/ui/fit-for-duty-psych-eval/widget/components'
import { LIVING_ARRANGEMENT_OPTIONS } from '@/ui/fit-for-duty-psych-eval/widget/constant'
import { BlockProps } from '@/ui/fit-for-duty-psych-eval/widget/types'
import { SchemaType } from '../../schema'
import { PrePatientOtherInput } from './pre-patient-other-input'

const LivingArrangementRadio = ({ disabled = false }: BlockProps) => {
  const { watch } = useFormContext<SchemaType>()
  const livingArrangement = watch('livingArrangement')
  return (
    <Flex align="end" className="relative w-[750px]">
      <RadioFieldWithError
        field="livingArrangement"
        label="What is patient’s current living arrangement?"
        options={LIVING_ARRANGEMENT_OPTIONS}
        disabled={disabled}
        required
        radioGroupClassName="!flex-wrap"
        errorFieldClassName="absolute top-14 right-[170px]"
      />
      {livingArrangement === 'other' && (
        <PrePatientOtherInput disabled={disabled} />
      )}
    </Flex>
  )
}
export { LivingArrangementRadio }
