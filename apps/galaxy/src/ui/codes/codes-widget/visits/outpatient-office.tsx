import { useEffect } from 'react'
import { useFormContext } from 'react-hook-form'
import { CptCodeKeys } from '@/types'
import { AddonsTable, ModifierTable, PrimaryCodeTable } from '../blocks'
import { CodesWidgetSchemaType } from '../codes-widget-schema'
import { useFormValues } from '../hooks'
import { UpdatedCptCode, VisitProps } from '../types'
import {
  commonCptCodes,
  handleDefaultSubmission,
  isVirtualAppoinment,
  isVisitAfterWorkingHours,
  mergeCptCodes,
} from '../utils'

const OutpatientOffice = ({
  cptAddOnsCodes,
  cptPrimaryCodes,
  appointment,
  patientId,
}: VisitProps) => {
  const form = useFormContext<CodesWidgetSchemaType>()
  const { isCptCodeExist } = useFormValues()

  useEffect(() => {
    const updatedCodes: UpdatedCptCode[] = []
    if (
      !isCptCodeExist(CptCodeKeys.ADD_ONS_KEY, '99050') &&
      isVisitAfterWorkingHours(appointment)
    ) {
      updatedCodes.push(commonCptCodes['99050'])
    }
    if (
      isVirtualAppoinment(appointment) &&
      !isCptCodeExist(CptCodeKeys.MODIFIER_KEY, '95')
    ) {
      updatedCodes.push(commonCptCodes['95'])
    }
    if (!updatedCodes.length) {
      return
    }
    const mergedCptValues = mergeCptCodes(form.getValues(), updatedCodes)
    form.reset(mergedCptValues)
    handleDefaultSubmission(patientId, String(appointment.id), mergedCptValues)
  }, [appointment, patientId])
  return (
    <>
      <PrimaryCodeTable codes={cptPrimaryCodes} />
      <ModifierTable codes={cptmodifierCodes} isDisabled />
      <AddonsTable codes={cptAddOnsCodes} isDisabled />
    </>
  )
}
const cptmodifierCodes = [
  { label: '', value: '25' },
  { label: '', value: '59' },
  { label: '', value: '95' },
]
export { OutpatientOffice }
