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
  const dcServiceType = watch('dcHospitalServiceType') 
  const [disableOptions, setDisableOptions] = useState(false)
  const [excludeTag, setExcludeTag] = useState("")

  const updatePatientDischargeState = () => {
    setDisableOptions(true);
    setValue(BLOCK_ID, 'Patient was discharged from ED')
    setExcludeTag("Patient was discharged from ED")
  }
  
  useEffect(() => {
    if (dcDate && tcmDate) { // Preference is DC and TCM Date Difference if they are true we need to check Unable to contact condition
      const isBeyondTwoDays = getDateDifference(tcmDate, dcDate) > 2;
      setDisableOptions(isBeyondTwoDays);
      if(isBeyondTwoDays){
        setValue(BLOCK_ID, 'Unable to contact pt within 2 days of DC');
        setExcludeTag("Unable to contact pt within 2 days of DC")
      } else if(dcServiceType === 'EmergencyRoomHospital'){ // Else we need to check if The Service Type has EmergencyRoomHospital selected?
        updatePatientDischargeState()
      }
      clearErrors();
    } else if(dcServiceType === 'EmergencyRoomHospital'){  // Condition if both are null | undefined but user have selected EmergencyRoomHospital
      updatePatientDischargeState()
    } else {
      setDisableOptions(false)
    }
  }, [dcDate, tcmDate, dcServiceType])

  return (
    <FormFieldContainer >
      <RadioSelectSection
        label={BLOCK_LABEL}
        field={BLOCK_ID}
        options={RESULT_OPTIONS}
        required
        disableOtherOptions={disableOptions}
        optionEnableTag= {disableOptions ? excludeTag :""}
        onChange={()=> clearErrors()}
      />
      <FormFieldError name={BLOCK_ID}
      />
    </FormFieldContainer>
  )
}

export { ResultBlock }
