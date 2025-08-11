'use client'

import { useFormContext } from 'react-hook-form'
import { DetailsField, RadioFieldWithError } from '../../components'
import { REMARKABLE_OPTIONS } from '../../constant'
import { BlockProps } from '../../types'

const MotorVehicleRecordRadio = ({ disabled = false }: BlockProps) => {
  const { watch, setValue } = useFormContext()
  const motorVehicleRecord = watch('motorVehicleRecord')
  return (
    <>
      <RadioFieldWithError
        field="motorVehicleRecord"
        label="Patient motor vehicle record is"
        options={REMARKABLE_OPTIONS}
        disabled={disabled}
        onChange={(val) => {
          if (val !== 'remarkable') {
            setValue('motorVehicleRecordDetails', '')
          }
        }}
        required
      />
      {motorVehicleRecord === 'remarkable' && (
        <DetailsField
          label="Describe what makes it remarkable:"
          field="motorVehicleRecordDetails"
          disabled={disabled}
          className="min-h-11"
          maxLength={200}
        />
      )}
    </>
  )
}
export { MotorVehicleRecordRadio }
