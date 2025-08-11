'use client'

import { DetailsField } from '@/ui/fit-for-duty-psych-eval/widget/components'
import { BlockProps } from '@/ui/fit-for-duty-psych-eval/widget/types'

const PreEmploymentInput = ({ disabled = false }: BlockProps) => {
  return (
    <>
      <DetailsField
        field="previousEmployer"
        label="Patient’s previous employer is:"
        maxLength={30}
        disabled={disabled}
        className={DetailFielsdClassName}
        containerClassName="!flex-row"
      />

      <DetailsField
        field="durationAtPreviousEmployer"
        label="How long has patient been with previously named employer?"
        maxLength={20}
        disabled={disabled}
        className={DetailFielsdClassName}
        containerClassName="!flex-row"
      />
      <DetailsField
        field="priorEmployment"
        label="Prior to that, patient did:"
        maxLength={50}
        disabled={disabled}
        className={DetailFielsdClassName}
        containerClassName="!flex-row"
      />
    </>
  )
}
export { PreEmploymentInput }
const DetailFielsdClassName = 'min-h-5  !max-w-[300px]'
