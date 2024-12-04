import React, { useEffect, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { FormError, FormFieldContainer, FormFieldError, RadioSelectSection } from '@/components'
import { TcmWidgetSchemaType } from '../tcm-widget-schema'
import { getDateDifference } from '@/utils'
import { RESULT_OPTIONS } from '../constants'

const BLOCK_ID = 'tcmResults'
const BLOCK_LABEL = 'Results'

const ResultBlock = () => {
  const { watch ,setValue, clearErrors } = useFormContext<TcmWidgetSchemaType>()
  const dcDate = watch('dcDate')
  const tcmDate = watch('tcmDate')
  const [disableOptions, setDisableOptions] = useState(false)

  useEffect(() => {
    if (dcDate && tcmDate) {
      const isBeyondTwoDays = getDateDifference(tcmDate, dcDate) > 2;
      setDisableOptions(isBeyondTwoDays);
      isBeyondTwoDays && setValue(BLOCK_ID, 'Unable to contact pt within 2 days of DC');
      clearErrors();
    }
  }, [dcDate, tcmDate])

  return (
    <FormFieldContainer >
      <RadioSelectSection
        label={BLOCK_LABEL}
        field={BLOCK_ID}
        options={RESULT_OPTIONS}
        required
        disableOtherOptions={disableOptions}
        optionEnableTag= {disableOptions ? "Unable to contact pt within 2 days of DC" :""}
        onChange={()=> clearErrors()}
      />
      <FormFieldError name={BLOCK_ID}
      />
    </FormFieldContainer>
  )
}

export { ResultBlock }
